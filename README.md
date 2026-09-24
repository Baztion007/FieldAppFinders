# ContractorStack

ContractorStack is an authoritative, affiliate-ready software discovery, ROI calculation, and review platform tailored specifically for trade contractors (HVAC, Plumbing, Electrical, Roofing, General Contracting, Landscaping, and Field Services).

## Tech Stack
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Persistence & Moderation**: Firebase Firestore
- **Deployment**: Vercel (or any static host)

---

## Deploying to Vercel via GitHub

### Step 1: Export to GitHub from AI Studio
1. In the Google AI Studio project interface, open the **Project Menu** (top-right three dots or Settings).
2. Select **Export to GitHub** (or **Download ZIP** and push to a new GitHub repository).
3. Connect your GitHub account and create the repository (e.g. `your-username/contractor-stack`).

### Step 2: Import into Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select your `contractor-stack` repository.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. The repository already includes `vercel.json` configured with SPA rewrites (`/(.*) -> /index.html`) so client-side routes like `/reviews/:slug`, `/roi-calculator`, and `/go/:slug` resolve cleanly without 404s.
5. Click **Deploy**.

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Typecheck & Lint
npm run lint
```
