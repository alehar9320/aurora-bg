# Next Steps

## Before pushing to GitHub

### 1. Replace placeholders

| File | Placeholder | Replace with |
|---|---|---|
| `README.md` | `<YOUR_GITHUB_USERNAME>` | Your GitHub username |
| `README.md` | `<YOUR_NAME>` | Your name |
| `LICENSE` | `<YOUR_NAME>` | Your name |
| `SECURITY.md` | `<YOUR_EMAIL>` | Your email |
| `.github/FUNDING.yml` | `<YOUR_GITHUB_USERNAME>` | Your GitHub username |

**One-liner** (replace `<USER>` and `<NAME>` and `<EMAIL>` with your values):

```bash
sed -i 's/<YOUR_GITHUB_USERNAME>/<USER>/g' README.md .github/FUNDING.yml
sed -i 's/<YOUR_NAME>/<NAME>/g' README.md LICENSE
sed -i 's/<YOUR_EMAIL>/<EMAIL>/g' SECURITY.md
```

---

### 2. Rename repo on GitHub

The repo is currently named `aurora-borealis-animation`. Rename it to `aurora-bg`:

1. Go to `https://github.com/<USER>/aurora-borealis-animation/settings`
2. Under "Repository Name", change to `aurora-bg`
3. Click "Rename"

This aligns the GitHub repo with the npm package name and the Web Component tag.

---

### 3. Push to GitHub

```bash
git remote add origin git@github.com:<USER>/aurora-bg.git
git push -u origin main
```

---

## After pushing

### 4. Verify CI runs

1. Go to `https://github.com/<USER>/aurora-bg/actions`
2. The `CI` workflow should trigger automatically on push
3. Wait for it to go green (`npm ci` → `npm run lint` → `npm test` → `npm run build`)

---

### 5. Enable GitHub Pages

1. Go to `https://github.com/<USER>/aurora-bg/settings/pages`
2. Under "Build and deployment" → "Source", select **"Deploy from a branch"**
3. Branch: `main`, folder: `/docs`
4. Click "Save"
5. Wait ~2 minutes
6. Visit `https://<USER>.github.io/aurora-bg/`
7. You should see the aurora background with "Aurora BG" overlaid

---

### 6. Add NPM_TOKEN secret

1. Go to `https://github.com/<USER>/aurora-bg/settings/secrets/actions`
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: (your npm publish token — generate one at `https://www.npmjs.com/settings/<USER>/tokens`)
5. Click "Add secret"

---

### 7. Publish to npm

**Option A — Automated (tag push triggers workflow):**

```bash
npm run build
git tag v0.1.0
git push origin v0.1.0
```

The `publish.yml` workflow will run and publish to npm automatically.

**Option B — Manual:**

```bash
npm login
npm run build
npm publish
```

---

### 8. Verify everything is live

| What | How |
|---|---|
| npm package | `npm view aurora-bg` should show package info |
| CDN | `https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js` should load |
| GitHub Pages | `https://<USER>.github.io/aurora-bg/` shows the demo |
| Badges in README | `https://github.com/<USER>/aurora-bg` — badges show version, CI status, license |

---

### 9. Write the animation implementation

The skeleton is ready. The next engineering task is to fill in the aurora particle system in `src/engine.ts`. Key areas:

| File | What to implement |
|---|---|
| `src/engine.ts` | `loop()` method — particle system, gradient aurora bands, mouse interaction |
| `src/aurora-element.ts` | Any additional attribute mappings needed |
| `tests/engine.test.ts` | Unit tests for particle math, rendering, lifecycle |
| `examples/basic.html` | More palette presets, framework integration demos |
