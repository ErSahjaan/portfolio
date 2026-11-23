# Er, Md Sahjaan Portfolio

Run `npm ci`, then `npm start` and open `http://localhost:3000/portfolio`.

Run `npm run build` to create a production bundle. The root URL redirects to `/portfolio`, and `vercel.json` serves `index.html` for direct visits to that route.

**View my resume** opens the public, read-only resume. **Request a copy** opens an email draft for the owner to review. Keep any private resume file outside the public build and share it directly after approval.

**Build your own resume** opens a fictional sample. Choose **Start blank** to enter your own details and download them as PDF or TXT. Downloads made in sample mode carry a fictional-sample label. Draft edits stay in the current dialog.

**Get Portfolio Link** opens the editor at `/portfolio/build`. Choose **Start blank** to create your own portfolio. Upload JPG, PNG, or WebP files up to 8 MB or use public HTTPS image URLs. The editor compresses local images and previews the selected colors. Older fragment-based share links still render.

### Temporary portfolio links

Add these server-side environment variables to the Vercel deployment:

- `PORTFOLIO_PUBLIC_ORIGIN` is the canonical HTTPS origin of the site, such as `https://portfolio.example.com`.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are the Redis REST credentials.
- `RESEND_API_KEY` and `PORTFOLIO_EMAIL_FROM` are the email credentials and a sender address on a verified sending domain.

Deploy the Vercel function with the site. Submitting publishes the portfolio for 60 minutes and opens a dialog with the share link. An email address is only needed to send a copy from that dialog. Resend configuration is optional for publishing and required for visitor email delivery.

The result dialog uses the verified [FormSubmit Email Link](https://formsubmit.co/el/xekeri). **Send details to owner** opens a prefilled form for the visitor to review and send. If FormSubmit provides a separate activated AJAX endpoint, the optional server-only `PORTFOLIO_SUBMISSION_ENDPOINT` can forward submissions automatically. Uploaded image files are available through the temporary portfolio link.

After restarting `npm start`, localhost can generate 60-minute previews in memory and open the same FormSubmit email form. The localhost preview expires on restart and only works on the machine running the development server. Public share links and optional email copies to visitors require a configured Vercel deployment.
