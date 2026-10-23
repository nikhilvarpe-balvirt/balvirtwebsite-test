<?php
// Contact form. Also receives Balvirttechhub enquiries (topic=institute), which go to the careers inbox.
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/sendgrid_helper.php';
bv_boot();
bv_bot_checks();

$ip = bv_client_ip();
if (bv_rate(bv_rate_rules('contact', $ip, null), false)) bv_json(false, bv_rate_block_message(), 429);

$name    = bv_post('name', 200);
$email   = bv_post('email', 300);
$phone   = bv_post('phone', 40);
$message = bv_post('message', 5000);
$topic   = (($_POST['topic'] ?? '') === 'institute') ? 'institute' : '';

$errors = array_filter([
    bv_check_name($name),
    bv_check_email($email),
    bv_check_phone($phone, true),
    bv_check_message($message, 10, 2000),
]);
if ($errors) bv_json(false, implode(' ', $errors), 422);

// one address can only be used a few times a day, so nobody can aim our emails at someone else
if (bv_rate(bv_rate_rules('contact', $ip, $email), true)) bv_json(false, bv_rate_block_message(), 429);

$institute = $topic === 'institute';
sendEmail(
    $institute ? CAREERS_EMAIL : CONTACT_EMAIL, $institute ? 'Careers' : 'Contact',
    ($institute ? 'New Balvirttechhub Enquiry from ' : 'New Contact from ') . $name,
    bv_admin_html($institute ? 'New Balvirttechhub Enquiry' : 'New Message Received',
        ['Name' => $name, 'Email' => $email, 'Phone' => $phone, 'Message' => $message],
        'IP: ' . $ip . ' | Received: ' . date('Y-m-d H:i:s')),
    "New Contact\nName: $name\nEmail: $email\nPhone: $phone\nMessage: $message",
    $email, $name
);

sendEmail(
    $email, $name,
    'We have received your message | Balvirt',
    bv_confirm_html($name, 'Thank you for contacting Balvirt. We have received your message and will reply within 24 hours.'),
    "Hello $name,\n\nThank you for contacting Balvirt. We have received your message and will reply within 24 hours.\n\nIf you did not send this request, you can safely ignore this email.\n\nBest Regards,\nBalvirt Team"
);

bv_json(true, 'Thank you! We have received your message and will reply within 24 hours.');
