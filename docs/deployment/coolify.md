# Coolify deployment guide

This project is configured to deploy on Coolify with a custom Dockerfile and Next.js standalone output.

## 1) Service setup in Coolify

- Create a new **Application** from this repository.
- Build Pack: **Dockerfile** (do not use Nixpacks for this setup).
- Dockerfile path: `./Dockerfile`
- Exposed port: `3000`
- Deployment type: **Rolling Update**
- Health check path: `/api/health`
- Health check port: `3000`

## 2) Build and runtime commands

Commands are already embedded in Docker stages:

- Build: `yarn build`
- Runtime: `node server.js` (from `.next/standalone`)

No custom override command is required in Coolify.

## 3) Required environment variables

Set these in Coolify before first production deployment:

- `SITE_URL` (required, use your real production URL)
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (if analytics enabled)
- `NEXT_PUBLIC_POSTHOG_KEY` (if PostHog enabled)
- `NEXT_PUBLIC_POSTHOG_HOST` (if PostHog enabled)
- `NEXT_PUBLIC_POSTHOG_FORCE_ENABLE` (optional)
- `NEXT_PUBLIC_POSTHOG_REVERSE_PROXY` (if proxy mode is used)
- `NEXT_PUBLIC_POSTHOG_DISABLE_SESSION_RECORDING` (optional)
- `NEXT_PUBLIC_GISCUS_REPO` (if Giscus enabled)
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

Newsletter provider keys (only for the provider you use):

- Mailchimp: `MAILCHIMP_API_KEY`, `MAILCHIMP_API_SERVER`, `MAILCHIMP_AUDIENCE_ID`
- Buttondown: `BUTTONDOWN_API_KEY`
- ConvertKit: `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`
- Klaviyo: `KLAVIYO_API_KEY`, `KLAVIYO_LIST_ID`
- Revue: `REVUE_API_KEY`
- EmailOctopus: `EMAILOCTOPUS_API_KEY`, `EMAILOCTOPUS_LIST_ID`
- Beehive: `BEEHIVE_API_KEY`, `BEEHIVE_PUBLICATION_ID`

## 4) Domain and TLS

- Attach your production domain to the Coolify app.
- Enable automatic TLS certificates in Coolify/Traefik.
- Ensure DNS points to your Coolify server before final cutover.

## 5) Validation checklist

After each deployment, verify:

- `/api/health` returns HTTP 200
- homepage and blog listing load
- blog post route (`/blog/...`) loads
- pagination route (`/blog/page/1`) loads
- tags route loads
- `/sitemap.xml` and `/robots.txt` are correct
- `/search.json` returns generated search index
- RSS endpoints/files are present and valid
- `next/image` rendered images load correctly

## 6) Cutover steps

1. Lower DNS TTL at least a few hours before migration.
2. Deploy and validate on Coolify using temporary domain.
3. Set production `SITE_URL` in Coolify.
4. Switch DNS records to Coolify.
5. Monitor logs, error rates, and response time for 24-48 hours.

## 7) Rollback plan

1. Keep Vercel deployment active during migration window.
2. If critical issues appear, point DNS back to Vercel.
3. Revert to previous stable Coolify release after root-cause analysis.
4. Repeat cutover only after smoke tests pass.
