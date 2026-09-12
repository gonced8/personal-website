# Publishing and redirects

The canonical origin is `https://www.goncaloraposo.com`, matching `public/CNAME`.
GitHub Pages serves the `gh-pages` branch root. Production preserves `pr-preview`.

Cloudflare must redirect the **entire apex hostname** before contacting its origin:

- Expression: `(http.host eq "goncaloraposo.com")`
- Dynamic target: `concat("https://www.goncaloraposo.com", http.request.uri.path)`
- Status: 301; preserve query string: enabled.

A rule matching only `/` leaves other paths exposed to HTTP 526. Do not lower
the TLS security mode. This account-level rule is not deployed by this repository.

After merging, verify homepage, `/pt/projects/`, and every published article on
both hostnames. Apex requests should redirect once, retaining path and query.
Inspect the Pages build as well as the branch deployment: a file in `gh-pages`
does not prove that Pages is serving it yet. Compare deployed commit and cache
headers before retrying a build.

Previews are noindex and use a build-time base path. A build verifier checks
local references for both production and preview. Fork PRs run Quality without
receiving a write token or an automatically hosted preview.
