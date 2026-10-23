# Balvirt website (React)

Vite + React 19 + React Router + Tailwind CSS 4 + Framer Motion.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # outputs dist/ (includes public/php)

## Forms (PHP backend)
The forms post to `/php/*.php` (SendGrid). In dev, `vite.config.js` proxies `/php` to
`http://localhost:8000`, so run: `php -S localhost:8000 -t public` from this folder.
The SendGrid key is no longer in code: set the `SENDGRID_API_KEY` environment variable
or create `public/php/config.local.php` containing `putenv('SENDGRID_API_KEY=SG.xxx');`.

## Structure
- `src/pages/*`      one file per page (Home, About, Services, Industries, Technology, WhyUs, Careers, Insights, Gallery, Contact)
- `src/components/*` Navbar, Footer, Chatbot, forms, shared UI/animation helpers, SEO
- `src/data/*`       site content, chatbot Q&A, job descriptions, gallery albums
