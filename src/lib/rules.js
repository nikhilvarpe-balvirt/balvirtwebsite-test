// Browser-side limits that mirror the server rules in public/php/security.php.
// The browser only helps honest visitors; the server enforces everything again.
export const nameProps = {
  minLength: 2,
  maxLength: 100,
  pattern: "[\\p{L}\\p{M}][\\p{L}\\p{M}\\s'’.\\-]{1,99}",
  title: "Use letters, spaces and . ' - only (2 to 100 characters).",
}
export const emailProps = { maxLength: 254 }
export const phoneProps = {
  inputMode: 'tel',
  maxLength: 20,
  pattern: '[0-9+\\-\\s\\(\\)]{7,20}',
  title: 'Enter a valid phone number, for example +91 98765 43210.',
}
export const messageProps = { minLength: 10, maxLength: 2000 }
export const MAX_RESUME_MB = 5
