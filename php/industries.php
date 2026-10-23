<?php
// Industry inquiries.
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/sendgrid_helper.php';
bv_boot();
bv_bot_checks();

$ip = bv_client_ip();
if (bv_rate(bv_rate_rules('industries', $ip, null), false)) bv_json(false, bv_rate_block_message(), 429);

$name    = bv_post('name', 200);
$email   = bv_post('email', 300);
$phone   = bv_post('phone', 40);
$message = bv_post('message', 5000);
[$industries, $listError] = bv_list('industries', 'industry');

$errors = array_filter([
    bv_check_name($name),
    bv_check_email($email),
    bv_check_phone($phone, false),
    $listError,
    bv_check_message($message, 10, 2000, 'project requirements'),
]);
if ($errors) bv_json(false, implode(' ', $errors), 422);

if (bv_rate(bv_rate_rules('industries', $ip, $email), true)) bv_json(false, bv_rate_block_message(), 429);

$industriesText = implode(', ', $industries);
bv_csv_append(__DIR__ . '/industries.csv', ['Timestamp', 'Full Name', 'Email', 'Phone', 'Industries', 'Message'],
    [date('Y-m-d H:i:s'), $name, $email, $phone, $industriesText, $message]);

sendEmail(
    CONTACT_EMAIL, 'Contact',
    'New Industry Inquiry from ' . $name,
    bv_admin_html('New Industry Inquiry',
        ['Name' => $name, 'Email' => $email, 'Phone' => $phone ?: 'Not provided', 'Industries' => $industriesText, 'Message' => $message],
        'IP: ' . $ip . ' | Received: ' . date('Y-m-d H:i:s')),
    "New Industry Inquiry\nName: $name\nEmail: $email\nPhone: $phone\nIndustries: $industriesText\nMessage: $message",
    $email, $name
);

sendEmail(
    $email, $name,
    'We have received your inquiry | Balvirt',
    bv_confirm_html($name, 'Thank you for reaching out to Balvirt. We have received your inquiry about: ' . $industriesText . '. Our team will get back to you within 24 hours.'),
    "Hello $name,\n\nThank you for reaching out to Balvirt. We have received your inquiry about: $industriesText.\nOur team will get back to you within 24 hours.\n\nIf you did not send this request, you can safely ignore this email.\n\nBest Regards,\nBalvirt Team"
);

bv_json(true, 'Your inquiry has been submitted successfully! We will contact you within 24 hours.');
