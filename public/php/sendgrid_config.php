<?php
// SendGrid configuration. The API key is NOT stored in code.
// Set SENDGRID_API_KEY as a server environment variable, or create
// config.local.php (git-ignored) that calls: putenv('SENDGRID_API_KEY=SG.xxx');
if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
}
define('SENDGRID_API_KEY', getenv('SENDGRID_API_KEY') ?: '');
define('FROM_EMAIL',       'noreply@balvirt.com');
define('FROM_NAME',        'Balvirt');
// Where notifications go:
define('CONTACT_EMAIL',    'contact@balvirt.com');  // contact form, service / industry / product requests
define('CAREERS_EMAIL',    'career@balvirt.com');   // job + internship applications, training institute enquiries
define('ADMIN_EMAIL',      CONTACT_EMAIL);          // kept for backwards compatibility

// Set to true ONLY if the site sits behind Cloudflare, so visitor IPs (used for rate limits) are read correctly.
define('BV_TRUST_CLOUDFLARE', false);
