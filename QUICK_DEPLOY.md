# Quick Deploy to Vercel

## Option 1: Direct Import Link (Easiest)

Click this link to import your project directly:
👉 **https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnextgrid-digital%2FService-now**

This will:
1. Open Vercel project creation
2. Pre-select your GitHub repository
3. Let you configure and deploy

## Option 2: Manual Steps

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Search for `nextgrid-digital/Service-now`
4. Click "Import"

## After Importing

1. **Configure Project Settings:**
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `.`

2. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_ZGVjaWRpbmctZmFsY29uLTM4LmNsZXJrLmFjY291bnRzLmRldiQ
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
   GOOGLE_SERVICE_ACCOUNT_KEY=base64-encoded-json-key
   VITE_ADMIN_EMAILS=your-email@example.com
   ```

3. **Deploy:**
   Click "Deploy" button

## Getting Google Service Account Key (Base64)

If you have the JSON file:
```bash
cat service-account-key.json | base64 | pbcopy
```

Then paste it as `GOOGLE_SERVICE_ACCOUNT_KEY` in Vercel.

## That's It! 🚀

Once deployed, Vercel will:
- Build your frontend
- Deploy API routes as serverless functions
- Give you a production URL
- Auto-deploy on every GitHub push

