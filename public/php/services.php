<?php
// Service bookings and product demo requests (the Products page sends source=product).
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/sendgrid_helper.php';
bv_boot();
bv_bot_checks();

$ip = bv_client_ip();
if (bv_rate(bv_rate_rules('services', $ip, null), false)) bv_json(false, bv_rate_block_message(), 429);

$name    = bv_post('name', 200);
$email   = bv_post('email', 300);
$phone   = bv_post('phone', 40);
$message = bv_post('message', 5000);
[$services, $listError] = bv_list('services', 'service');
$isProduct = (($_POST['source'] ?? '') === 'product');

$errors = array_filter([
    bv_check_name($name),
    bv_check_email($email),
    bv_check_phone($phone, false),
    $listError,
    bv_check_message($message, 10, 2000, 'project requirements'),
]);
if ($errors) bv_json(false, implode(' ', $errors), 422);

if (bv_rate(bv_rate_rules('services', $ip, $email), true)) bv_json(false, bv_rate_block_message(), 429);

$servicesText = implode(', ', $services);
bv_csv_append(__DIR__ . '/services.csv', ['Timestamp', 'Full Name', 'Email', 'Phone', 'Services', 'Message'],
    [date('Y-m-d H:i:s'), $name, $email, $phone, $servicesText, $message]);

sendEmail(
    CONTACT_EMAIL, 'Contact',
    ($isProduct ? 'New Product Demo Request from ' : 'New Service Request from ') . $name,
    bv_admin_html($isProduct ? 'New Product Demo Request' : 'New Service Request',
        ['Name' => $name, 'Email' => $email, 'Phone' => $phone ?: 'Not provided', ($isProduct ? 'Products' : 'Services') => $servicesText, 'Message' => $message],
        'IP: ' . $ip . ' | Received: ' . date('Y-m-d H:i:s')),
    "New Request\nName: $name\nEmail: $email\nPhone: $phone\nServices: $servicesText\nMessage: $message",
    $email, $name
);

sendEmail(
    $email, $name,
    'We have received your request | Balvirt',
    bv_confirm_html($name, 'Thank you for reaching out to Balvirt. We have received your request for: ' . $servicesText . '. Our team will get back to you within 24 hours.'),
    "Hello $name,\n\nThank you for reaching out to Balvirt. We have received your request for: $servicesText.\nOur team will get back to you within 24 hours.\n\nIf you did not send this request, you can safely ignore this email.\n\nBest Regards,\nBalvirt Team"
);

bv_json(true, 'Your request has been submitted successfully! We will contact you within 24 hours.');
