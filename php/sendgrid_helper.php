<?php
require_once __DIR__ . '/sendgrid_config.php';

//  Send email via SendGrid Web API 
 
function sendEmail($toEmail, $toName, $subject, $htmlBody, $textBody = '', $replyToEmail = '', $replyToName = '', $attachmentPath = '', $attachmentName = '') {
    $data = [
        'personalizations' => [[
            'to' => [['email' => $toEmail, 'name' => $toName]]
        ]],
        'from'    => ['email' => FROM_EMAIL, 'name' => FROM_NAME],
        'subject' => $subject,
        'content' => []
    ];

    if (!empty($textBody)) {
        $data['content'][] = ['type' => 'text/plain', 'value' => $textBody];
    }
    $data['content'][] = ['type' => 'text/html', 'value' => $htmlBody];

    if (!empty($replyToEmail)) {
        $data['reply_to'] = ['email' => $replyToEmail, 'name' => $replyToName ?: $replyToEmail];
    }

    if (!empty($attachmentPath) && file_exists($attachmentPath)) {
        $data['attachments'] = [[
            'content'     => base64_encode(file_get_contents($attachmentPath)),
            'filename'    => $attachmentName !== '' ? $attachmentName : basename($attachmentPath),
            'type'        => 'application/octet-stream',
            'disposition' => 'attachment'
        ]];
    }

    $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . SENDGRID_API_KEY,
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode < 200 || $httpCode >= 300) {
        error_log("SendGrid Error [$httpCode]: $response");
        return false;
    }
    return true;
}
