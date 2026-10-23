<?php
// Job and internship applications (with resume upload). Always answers in JSON.
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/sendgrid_helper.php';
bv_boot();
bv_bot_checks();

$ip = bv_client_ip();
if (bv_rate(bv_rate_rules('hire', $ip, null, true), false)) bv_json(false, 'You have submitted several applications recently. Please try again later.', 429);

$firstName   = bv_post('firstName', 100);
$lastName    = bv_post('lastName', 100);
$email       = bv_post('email', 300);
$phone       = bv_post('phone', 40);
$position    = bv_post('position', 200);
$experience  = bv_post('experience', 100);
$skills      = bv_post('skills', 1000);
$coverLetter = bv_post('coverLetter', 5000);

$errors = array_filter([
    bv_check_name($firstName, 'First name'),
    bv_check_name($lastName, 'Last name'),
    bv_check_email($email),
    bv_check_phone($phone, true, 10),
    bv_check_short($position, 80, 'a position', true),
    bv_check_short($experience, 40, 'experience', false),
    $skills === '' ? null : (mb_strlen($skills) > 300 ? 'Key skills must be under 300 characters.' : (bv_link_count($skills) ? 'Key skills cannot contain links.' : null)),
    bv_check_message($coverLetter, 10, 2000, 'cover letter', false),
]);

// ---- resume: type, real content and size
$resume = $_FILES['resume'] ?? null;
$ext = '';
if (!$resume || !isset($resume['error']) || is_array($resume['error']) || $resume['error'] === UPLOAD_ERR_NO_FILE) {
    $errors[] = 'Please upload your resume.';
} elseif ($resume['error'] === UPLOAD_ERR_INI_SIZE || $resume['error'] === UPLOAD_ERR_FORM_SIZE || $resume['size'] > 5 * 1024 * 1024) {
    $errors[] = 'Resume file size must be under 5 MB.';
} elseif ($resume['error'] !== UPLOAD_ERR_OK) {
    $errors[] = 'The resume could not be uploaded. Please try again.';
} else {
    $ext  = strtolower(pathinfo((string)$resume['name'], PATHINFO_EXTENSION));
    $head = (string)file_get_contents($resume['tmp_name'], false, null, 0, 8);
    $mime = function_exists('mime_content_type') ? (string)mime_content_type($resume['tmp_name']) : '';
    $looksRight =
        ($ext === 'pdf'  && strncmp($head, '%PDF-', 5) === 0) ||
        ($ext === 'docx' && strncmp($head, "PK\x03\x04", 4) === 0) ||
        ($ext === 'doc'  && strncmp($head, "\xD0\xCF\x11\xE0", 4) === 0);
    $mimeOk = $mime === '' || in_array($mime, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream', 'application/x-ole-storage', 'application/CDFV2'], true);
    if (!$looksRight || !$mimeOk) {
        $errors[] = 'Invalid resume. Only genuine PDF, DOC or DOCX files are accepted.';
    } elseif (stripos((string)file_get_contents($resume['tmp_name']), '<?php') !== false) {
        $errors[] = 'This file cannot be accepted.';
    }
}

// the same email can only apply once a day
$csvFile = __DIR__ . '/applications.csv';
if (!$errors && is_readable($csvFile) && ($fh = fopen($csvFile, 'r'))) {
    $first = true; $cutoff = time() - 86400;
    while (($row = fgetcsv($fh)) !== false) {
        if ($first) { $first = false; continue; }
        if (isset($row[2], $row[0]) && strtolower(trim($row[2])) === strtolower($email) && strtotime($row[0]) > $cutoff) {
            $errors[] = 'An application with this email was already submitted in the last 24 hours.';
            break;
        }
    }
    fclose($fh);
}
if ($errors) bv_json(false, implode(' ', $errors), 422);

if (bv_rate(bv_rate_rules('hire', $ip, $email, true), true)) bv_json(false, 'You have submitted several applications recently. Please try again later.', 429);

// ---- save the resume under a random name (the original name is only kept as a label)
$uploadDir = __DIR__ . '/uploads/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
$guard = $uploadDir . '.htaccess';
if (!file_exists($guard)) file_put_contents($guard, "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
$stored     = date('Ymd-His') . '-' . bin2hex(random_bytes(8)) . '.' . $ext;
$resumePath = $uploadDir . $stored;
if (!bv_move_upload($resume['tmp_name'], $resumePath)) bv_json(false, 'The resume could not be saved. Please try again.', 500);
$name         = $firstName . ' ' . $lastName;
$attachment   = preg_replace('/[^A-Za-z0-9._-]+/', '_', $firstName . '_' . $lastName) . '_Resume.' . $ext;
$cover        = $coverLetter !== '' ? $coverLetter : 'No cover letter provided.';

bv_csv_append($csvFile, ['Timestamp', 'Full Name', 'Email', 'Phone', 'Position', 'Experience', 'Skills', 'Cover Letter', 'Resume', 'IP'],
    [date('Y-m-d H:i:s'), $name, $email, $phone, $position, $experience, $skills, $cover, $stored, $ip]);

sendEmail(
    CAREERS_EMAIL, 'Careers',
    "New Job Application - $name ($position)",
    bv_admin_html('New Job Application',
        ['Name' => $name, 'Email' => $email, 'Phone' => $phone, 'Position' => $position, 'Experience' => $experience ?: 'Not provided', 'Skills' => $skills ?: 'Not provided', 'Cover letter' => $cover],
        'IP: ' . $ip . ' | Received: ' . date('Y-m-d H:i:s')),
    "New Job Application\nName: $name\nEmail: $email\nPhone: $phone\nPosition: $position\nMessage: $cover",
    $email, $name, $resumePath, $attachment
);

sendEmail(
    $email, $name,
    'Application received | Balvirt',
    bv_confirm_html($name, 'We have received your application for ' . $position . '. Our HR team will review it and contact you if you are shortlisted.', 'Balvirt HR Team'),
    "Dear $name,\n\nWe have received your application for $position.\nOur HR team will review it and contact you if you are shortlisted.\n\nIf you did not apply, you can safely ignore this email.\n\nBest Regards,\nBalvirt HR Team",
    CAREERS_EMAIL, 'Balvirt HR Team'
);

bv_json(true, 'Thank you, ' . $name . '! Your application has been received.');
