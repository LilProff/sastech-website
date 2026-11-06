---
name: ship-and-verify
description: Build, check, commit, push and deploy the Sastech website to Vercel, then verify the live site end to end. Use before every push and whenever the owner says "ship it", "deploy", "make it live" or reports the site is broken.
---

# Ship and verify

## 1. Build and local checks
```bash
npm run build                      # must pass (includes TypeScript)
npm run start                      # then spot-check http://localhost:3000
```
Check: the pages you changed at 1440px and 375px, dark and light theme, no horizontal scroll, one H1.

## 2. Pre-push safety scan (the repo is PUBLIC)
```bash
git status --short                                   # nothing from docs/, .shots/, .claude/, .env*
git grep -n -i -E "re_[A-Za-z0-9_]{10,}|sk_live|BEGIN (RSA|PRIVATE)|password=" -- . ':!package-lock.json'
git grep -n -E "—|–" -- app components lib            # em/en dashes in copy (must be empty)
git grep -n "\[FILL" -- app components                # must be empty (comments in lib/ are OK)
```
Also grep for any confidential client or staff names listed in `docs/HANDOFF_PRIVATE.md`.
If anything matches, fix it before committing.

## 3. Commit and push
- Commit author must be `Lilproff <ayomidesholarin13@gmail.com>`:
  `git config user.name "Lilproff"; git config user.email "ayomidesholarin13@gmail.com"` (repo-local).
- Clear message: what changed and why. Push the branch; merging to `main` deploys production.

## 4. Watch the Vercel build
```bash
gh api repos/LilProff/sastech-website/commits/<sha>/statuses --jq '.[0] | "\(.state) | \(.description)"'
```
Poll every 15 s until `success` or `failure`.
- **"Deployment was blocked"**: the repo was made private, or the commit author isn't the owner's account.
  Keep the repo public and use the owner's git identity.
- **"Deployment has failed"**: build logs need a Vercel login (`npx vercel inspect <id> --logs`). Usual
  causes: Node version (keep `engines.node` 22.x), `vercel.json` removed (keep framework nextjs +
  outputDirectory .next), a filename case mismatch (Linux is case-sensitive), or a build error you can
  reproduce with `npm run build`.

## 5. Verify live (https://www.sastech.com.ng)
```bash
B=https://www.sastech.com.ng
for p in / /services /portfolio /insights /events /process /about /contact /privacy /terms /sitemap.xml; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code}' $B$p)"; done
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://sastech.com.ng/      # 308 -> www
curl -s -X POST $B/api/contact -H 'Content-Type: application/json' -d '{"name":"x","email":"bad","message":"hi"}'
```
Expect 200s, the apex redirect, and a 422 validation JSON from the form. A reply of "Our form is not
connected yet" means `RESEND_API_KEY` is missing in Vercel (owner adds it in Project > Settings >
Environment Variables, then redeploys). Do not paste API keys into dashboards or commit them yourself.

## 6. Report to the owner
Plain English: what changed, the live link, what you checked, anything not verified, any question for him.
Update `AGENTS.md` section 10 (status) and `docs/HANDOFF_PRIVATE.md` if anything changed.
