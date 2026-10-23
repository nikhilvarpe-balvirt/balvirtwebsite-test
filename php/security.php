<?php
// ============================================================================
//  Shared security + validation for every form handler (contact, services,
//  industries, hire). Keep ALL rules here so the four forms behave the same.
// ============================================================================

const BV_MAX_BODY       = 8 * 1024 * 1024; // refuse bigger requests outright
const BV_MIN_FILL_MS    = 1500;            // a human needs a few seconds to fill a form
const BV_CONTACT_PHONE  = '+91 9665521708';

// ---- response + setup ------------------------------------------------------

function bv_json(bool $ok, string $message, int $code = 200): void {
    if (!headers_sent()) http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

/** Call first in every handler: hides PHP errors from visitors, logs them, checks the request. */
function bv_boot(): void {
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    error_reporting(E_ALL);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');

    // any crash becomes a polite message; the details only go to the server log
    set_exception_handler(function (Throwable $e) {
        error_log('[balvirt-form] ' . get_class($e) . ': ' . $e->getMessage() . ' @ ' . basename($e->getFile()) . ':' . $e->getLine());
        bv_json(false, 'Something went wrong on our side. Please try again later or email us.', 500);
    });

    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') bv_json(false, 'Invalid request.', 405);
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > BV_MAX_BODY) bv_json(false, 'The request is too large.', 413);

    // same-site only: a form on another website cannot post here
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '') {
        $oHost = strtolower((string)parse_url($origin, PHP_URL_HOST));
        $host  = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
        $local = ['localhost', '127.0.0.1'];
        if ($oHost !== $host && !(in_array($oHost, $local, true) && in_array($host, $local, true))) {
            bv_json(false, 'This request is not allowed.', 403);
        }
    }
}

function bv_client_ip(): string {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (defined('BV_TRUST_CLOUDFLARE') && BV_TRUST_CLOUDFLARE && !empty($_SERVER['HTTP_CF_CONNECTING_IP'])
        && filter_var($_SERVER['HTTP_CF_CONNECTING_IP'], FILTER_VALIDATE_IP)) {
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    return $ip;
}

// ---- bots ------------------------------------------------------------------

/** Honeypot (hidden field bots fill in) and a minimum-fill-time check. */
function bv_bot_checks(): void {
    if (!empty($_POST['website'])) bv_json(true, 'Thank you! We will be in touch shortly.'); // pretend success
    $elapsed = (int)($_POST['elapsed'] ?? 0);
    if ($elapsed < BV_MIN_FILL_MS) bv_json(false, 'Please take a moment to check your details, then send again.', 400);
}

// ---- rate limiting (counts successful sends only) --------------------------

function bv_rate(array $rules, bool $record): ?string {
    // $rules: key => [limit, windowSeconds]. Returns the blocked key, or null if fine.
    $file = __DIR__ . '/bv_rate.json';
    $fp = fopen($file, 'c+');
    if (!$fp) return null; // never block visitors because of a disk problem
    flock($fp, LOCK_EX);
    $raw  = stream_get_contents($fp);
    $data = json_decode($raw ?: '[]', true);
    if (!is_array($data)) $data = [];
    $now = time();
    foreach ($data as $k => $stamps) {                       // forget anything older than a day
        $data[$k] = array_values(array_filter((array)$stamps, fn($t) => ($now - (int)$t) < 86400));
        if (!$data[$k]) unset($data[$k]);
    }
    $blocked = null;
    foreach ($rules as $key => [$limit, $window]) {
        $count = count(array_filter($data[$key] ?? [], fn($t) => ($now - $t) < $window));
        if ($count >= $limit) { $blocked = $key; break; }
    }
    if ($blocked === null && $record) {
        foreach (array_keys($rules) as $key) $data[$key][] = $now;
    }
    if ($record || $blocked === null) {
        ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data));
    }
    flock($fp, LOCK_UN); fclose($fp);
    return $blocked;
}

function bv_rate_rules(string $form, string $ip, ?string $email, bool $strict = false): array {
    $r = [
        "$form:iph:$ip" => [$strict ? 2 : 5, 3600],
        "$form:ipd:$ip" => [$strict ? 3 : 15, 86400],
        "$form:all"     => [$strict ? 100 : 300, 86400],   // emergency brake for the whole site
    ];
    if ($email) $r["$form:em:" . sha1(strtolower($email))] = [$strict ? 2 : 3, 86400];
    return $r;
}

function bv_rate_block_message(): string {
    return 'We have received several requests from your connection. Please try again later, or email ' . 'contact@balvirt.com.';
}

// ---- cleaning + validation (each check returns an error string, or null) ---

function bv_post(string $key, int $max = 5000): string {
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) return '';
    $v = preg_replace('/[^\P{C}\n\t]+/u', '', $v);          // strip control characters
    if ($v === null) return '';
    return mb_substr(trim($v), 0, $max);
}

function bv_link_count(string $s): int {
    return preg_match_all('~(?:https?://|ftp://|www\.)\S+~i', $s) + preg_match_all('~<\s*a\s|\[url[=\]]~i', $s);
}

function bv_check_name(string $n, string $label = 'Name'): ?string {
    $len = mb_strlen($n);
    if ($len < 2 || $len > 100) return "$label must be between 2 and 100 characters.";
    if (!preg_match('/^[\p{L}\p{M}][\p{L}\p{M}\s\'’.\-]*$/u', $n)) return "$label can only contain letters, spaces and . ' -";
    return null;
}

const BV_DISPOSABLE = ['mailinator.com','guerrillamail.com','guerrillamail.net','10minutemail.com','10minutemail.net','tempmail.com','temp-mail.org','temp-mail.io','throwawaymail.com','yopmail.com','yopmail.net','trashmail.com','getnada.com','nada.email','sharklasers.com','maildrop.cc','dispostable.com','fakeinbox.com','mailnesia.com','mintemail.com','mohmal.com','emailondeck.com','tempinbox.com','tempail.com','burnermail.io','spam4.me','mytemp.email','tmpmail.org','tmpmail.net','discard.email','minuteinbox.com','moakt.com','mailcatch.com','spamgourmet.com','getairmail.com','harakirimail.com','33mail.com'];

function bv_check_email(string $e): ?string {
    if ($e === '' || strlen($e) > 254 || !filter_var($e, FILTER_VALIDATE_EMAIL)) return 'Please enter a valid email address.';
    $domain = strtolower(substr(strrchr($e, '@'), 1));
    if (in_array($domain, BV_DISPOSABLE, true)) return 'Please use a permanent email address, not a temporary one.';
    if (function_exists('checkdnsrr') && !defined('BV_SKIP_DNS') && !(checkdnsrr($domain . '.', 'MX') || checkdnsrr($domain . '.', 'A'))) {
        return 'That email domain does not seem to exist. Please check the spelling.';
    }
    return null;
}

function bv_check_phone(string $p, bool $required, int $minDigits = 7): ?string {
    if ($p === '') return $required ? 'Please enter your phone number.' : null;
    $digits = strlen(preg_replace('/\D/', '', $p));
    if (!preg_match('/^[0-9+\-\s()]{7,20}$/', $p) || $digits < $minDigits || $digits > 15) {
        return "Please enter a valid phone number ($minDigits to 15 digits).";
    }
    return null;
}

function bv_check_message(string $m, int $min = 10, int $max = 2000, string $label = 'Message', bool $required = true): ?string {
    $len = mb_strlen($m);
    if ($len === 0) return $required ? "Please enter your $label." : null;
    if ($len < $min) return "$label must be at least $min characters.";
    if ($len > $max) return "$label must be under $max characters.";
    if (bv_link_count($m) > 1) return "Please include at most one link in your $label.";
    return null;
}

/** Short free-text values such as a position, experience or a selected service. */
function bv_check_short(string $v, int $max, string $label, bool $required): ?string {
    if ($v === '') return $required ? "Please choose $label." : null;
    if (mb_strlen($v) > $max) return "$label is too long.";
    if (!preg_match('/^[\p{L}\p{N}\s&()\/.,+#\'’:\-]+$/u', $v) || bv_link_count($v) > 0) return "$label contains characters that are not allowed.";
    return null;
}

/** A list of checkboxes (services / industries). Returns [cleanList, errorOrNull]. */
function bv_list(string $key, string $label): array {
    $raw = $_POST[$key] ?? [];
    if (!is_array($raw)) return [[], "Please choose at least one $label."];
    $out = [];
    foreach ($raw as $item) {
        if (!is_string($item)) continue;
        $item = trim(preg_replace('/[^\P{C}]+/u', '', $item) ?? '');
        if ($item === '') continue;
        if (bv_check_short($item, 80, $label, true) !== null) return [[], "One of the selected {$label}s is not valid."];
        $out[$item] = true;
    }
    $out = array_keys($out);
    if (!$out) return [[], "Please choose at least one $label."];
    if (count($out) > 12) return [[], "Please choose no more than 12 {$label}s."];
    return [$out, null];
}

// ---- files (spreadsheets, resumes) -----------------------------------------

/** Neutralise spreadsheet formulas: a value starting with = + - @ would run in Excel. */
function bv_csv_safe($v): string {
    $v = (string)$v;
    return ($v !== '' && strpos("=+-@\t\r", $v[0]) !== false) ? "'" . $v : $v;
}

function bv_csv_append(string $file, array $header, array $row): void {
    $isNew = !file_exists($file);
    $fp = fopen($file, 'a');
    if (!$fp) return;
    flock($fp, LOCK_EX);
    if ($isNew) fputcsv($fp, $header);
    fputcsv($fp, array_map('bv_csv_safe', $row));
    flock($fp, LOCK_UN); fclose($fp);
}

function bv_move_upload(string $tmp, string $dest): bool {
    if (defined('BV_TESTING')) return copy($tmp, $dest);   // command-line tests only
    return is_uploaded_file($tmp) && move_uploaded_file($tmp, $dest);
}

// ---- emails ----------------------------------------------------------------

function bv_h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

/** Admin notification: a simple table of label => value (everything escaped). */
function bv_admin_html(string $heading, array $fields, string $meta = ''): string {
    $rows = '';
    foreach ($fields as $label => $value) {
        $rows .= '<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top"><b>' . bv_h($label) . '</b></td><td style="padding:6px 0">' . nl2br(bv_h($value)) . '</td></tr>';
    }
    return '<div style="font-family:Arial,sans-serif"><h2 style="color:#1a1b3a">' . bv_h($heading) . '</h2><table>' . $rows . '</table><p><small>' . bv_h($meta) . '</small></p></div>';
}

/** Visitor confirmation. It never repeats the visitor's own text, so it cannot be used to send messages to others. */
function bv_confirm_html(string $name, string $line, string $signature = 'Balvirt Team'): string {
    return '<div style="font-family:Arial,sans-serif;max-width:560px"><h3 style="color:#1a1b3a">Hello ' . bv_h($name) . ',</h3>'
        . '<p>' . bv_h($line) . '</p>'
        . '<p style="color:#555">This is an automatic confirmation. If you did not send this request, you can safely ignore this email.</p>'
        . '<p>Best Regards,<br><strong>' . bv_h($signature) . '</strong><br><small>AI, Software &amp; NetSuite Consulting</small></p>'
        . '<p style="border-top:1px solid #ddd;padding-top:8px;font-size:12px;color:#888">' . bv_h(BV_CONTACT_PHONE) . ' | contact@balvirt.com</p></div>';
}
