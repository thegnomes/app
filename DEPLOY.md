# Deploy to Vercel

## Option 1: PowerShell Script (Easiest - Windows)

1. Run the deployment script:
```powershell
.\deploy.ps1
```

2. If not logged in, login first:
```powershell
.\vercel-cli.exe login
```

3. Then deploy:
```powershell
.\vercel-cli.exe --prod
```

## Option 2: Manual with Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

## Option 3: GitHub Integration (Recommended)

1. Push code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Import your GitHub repository

4. Vercel will auto-detect Vite settings and deploy

5. Add these environment variables in Vercel Dashboard (optional):
   - `VERCEL_TOKEN` - For automatic deployments

## Project Structure for Vercel

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

## Important Files

- `vercel.json` - Vercel configuration
- `vite.config.ts` - Vite build configuration
- `brain.mp4` - Background video (served from public/)

## Troubleshooting

### Video not playing?
Make sure `brain.mp4` is in the `public/` folder or root directory and properly referenced.

### Build fails?
Check Node.js version (should be 18+):
```bash
node --version
```

### Large video file?
The `brain.mp4` file is large. Consider:
1. Using Vercel Large File Storage
2. Compressing the video
3. Using an external CDN URL

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
