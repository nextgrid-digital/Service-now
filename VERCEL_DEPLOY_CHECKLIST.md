# Vercel Deployment Checklist

## ✅ Step 1: Authenticate with GitHub
- Click "Continue with GitHub" (already done)
- Complete GitHub OAuth authentication in your browser
- Authorize Vercel to access your repositories

## ⏳ Step 2: Configure Project (After Authentication)

### Project Settings:
- **Framework Preset**: Vite (should auto-detect)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `.` (root)

### Environment Variables to Add:

Click "Environment Variables" and add these:

1. **VITE_CLERK_PUBLISHABLE_KEY**
   ```
   pk_test_ZGVjaWRpbmctZmFsY29uLTM4LmNsZXJrLmFjY291bnRzLmRldiQ
   ```

2. **GOOGLE_SPREADSHEET_ID**
   ```
   (your Google Sheets spreadsheet ID)
   ```
   *You can add this later if you don't have it yet*

3. **GOOGLE_SERVICE_ACCOUNT_KEY**
   ```
   (base64-encoded service account JSON key)
   ```
   *You can add this later if you don't have it yet*

4. **VITE_ADMIN_EMAILS** (Optional)
   ```
   your-email@example.com
   ```
   *Comma-separated list of admin emails*

## ⏳ Step 3: Deploy
- Click "Deploy" button
- Wait for build to complete (~2-3 minutes)
- Get your production URL!

## 📝 Notes:
- You can deploy now and add Google Sheets credentials later
- The app will work with mock data until Google Sheets is configured
- After deployment, you can update environment variables anytime in Vercel dashboard

## 🔄 After Deployment:
- Every push to `main` branch will auto-deploy
- Preview deployments for pull requests
- Check deployment logs in Vercel dashboard if issues occur

