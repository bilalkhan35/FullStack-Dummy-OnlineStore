Frontend deployment (Netlify)

This document explains how to deploy the frontend (Vite/React) to Netlify and connect it to your backend.

1. Netlify site setup

   - Create a new site on Netlify and link your GitHub repository.
   - Build command: `npm run build`
   - Publish directory: `dist`

2. Environment variables (Netlify)

   - Add the following build-time environment variable in Site settings → Build & deploy → Environment:
     - `VITE_API_URL` = `https://your-backend.example.com` (replace with your backend URL)
   - Note: Vite will embed VITE\_\* variables at build time, so set the variable before deploying.

3. Local development

   - Copy `redux_online_store/.env.example` to `redux_online_store/.env` or set `VITE_API_URL=http://localhost:8000` for local testing.

4. Backend hosting

   - Host your Node backend (Server/) on a service like Render, Railway, Heroku, or similar.
   - Set backend environment variables on the backend host (e.g., `MONGO_URI`, `CLOUDINARY_*`) — do NOT put those secrets in Netlify (frontend) envs.

5. Security & best practices

   - Do not commit `.env` files to GitHub.
   - Keep database credentials and API secrets on server-side host only.
   - Test the frontend after deployment by verifying network requests to the backend succeed (browser DevTools → Network).

6. Troubleshooting
   - If the frontend loads but data is missing: verify `VITE_API_URL` is set correctly and that the backend url is reachable from the internet.
   - If CORS errors appear, ensure your backend allows the origin of the deployed frontend.

If you want, I can also add a short section to the repo README linking to this file.
