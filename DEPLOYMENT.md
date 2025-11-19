# Deployment Guide

This guide covers deploying both the frontend and backend to Vercel.

## Architecture

- **Frontend**: React + Vite SPA deployed to Vercel
- **Backend**: Vercel Serverless Functions (API routes in `/api` folder)
- **Database**: Google Sheets (via Google Sheets API)

## Prerequisites

1. Vercel account ([vercel.com](https://vercel.com))
2. Google Cloud project with Google Sheets API enabled
3. Google Service Account with credentials
4. Google Sheet set up with required tabs (see below)

## Step 1: Set Up Google Sheets

1. Create a Google Sheet with the following tabs:

   **Jobs Tab** - Headers: `id`, `title`, `company`, `location`, `type`, `salary`, `description`, `requirements`, `postedBy`, `createdAt`, `updatedAt`

   **Spotlight Tab** - Headers: `jobId`, `priority`, `paid`

   **PostingRequests Tab** - Headers: `id`, `company`, `jobTitle`, `amountPaid`, `status`, `createdAt`

   **Supporters Tab** - Headers: `userId`, `name`, `email`, `amount`, `supportedAt`, `isSupporter`

2. Get your Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   ```

3. Create a Google Service Account:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select a project
   - Enable "Google Sheets API"
   - Go to "APIs & Services" > "Credentials"
   - Create a Service Account
   - Create a JSON key for the service account
   - Download the JSON file

4. Share your Google Sheet with the service account email (found in the JSON file)

5. Convert the JSON key to base64 (for Vercel environment variable):
   ```bash
   cat service-account-key.json | base64
   ```
   Or use an online base64 encoder.

## Step 2: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub (already done ✅)

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your GitHub repository: `nextgrid-digital/Service-now`

5. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Root Directory**: `.` (root)

6. Add Environment Variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_ZGVjaWRpbmctZmFsY29uLTM4LmNsZXJrLmFjY291bnRzLmRldiQ
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
   GOOGLE_SERVICE_ACCOUNT_KEY=<base64-encoded-json-key>
   VITE_ADMIN_EMAILS=admin@example.com,owner@example.com
   ```

   **Note**: 
   - `GOOGLE_SERVICE_ACCOUNT_KEY` should be the base64-encoded JSON key file
   - `VITE_DATA_API_URL` is optional - if not set, the app will use `/api` (Vercel serverless functions)
   - `VITE_ADMIN_EMAILS` is optional - comma-separated list of admin emails

7. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
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

4. Set environment variables in Vercel dashboard or via CLI:
   ```bash
   vercel env add VITE_CLERK_PUBLISHABLE_KEY
   vercel env add GOOGLE_SPREADSHEET_ID
   vercel env add GOOGLE_SERVICE_ACCOUNT_KEY
   vercel env add VITE_ADMIN_EMAILS
   ```

## Step 3: Verify Deployment

1. Visit your Vercel deployment URL

2. Test the API:
   - Visit `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

3. Test the frontend:
   - Visit `https://your-app.vercel.app`
   - Sign in with Clerk
   - Access `/admin` (if your email is in `VITE_ADMIN_EMAILS`)

## API Endpoints

All API endpoints are available at `/api/*`:

- `GET /api/jobs` - Fetch all jobs
- `POST /api/jobs` - Create a new job
- `PATCH /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job
- `GET /api/spotlight` - Fetch spotlight jobs
- `GET /api/posting-requests` - Fetch posting requests
- `GET /api/supporters` - Fetch supporters
- `POST /api/supporters` - Create/update supporter
- `DELETE /api/supporters/:userId` - Remove supporter
- `GET /api/health` - Health check

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key for authentication |
| `GOOGLE_SPREADSHEET_ID` | ✅ | Your Google Sheets spreadsheet ID |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | ✅ | Base64-encoded Google Service Account JSON key |
| `VITE_ADMIN_EMAILS` | ❌ | Comma-separated admin emails (optional) |
| `VITE_DATA_API_URL` | ❌ | Custom API URL (defaults to `/api` for Vercel) |

## Troubleshooting

### API returns empty data
- Check that `GOOGLE_SPREADSHEET_ID` is correct
- Verify the service account email has access to the Google Sheet
- Check Vercel function logs for errors

### Authentication not working
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Check Clerk dashboard for any errors

### Admin access denied
- Verify your email is in `VITE_ADMIN_EMAILS`
- Or set `role: "admin"` in Clerk user metadata

### Build fails
- Check that all dependencies are in `package.json`
- Verify `googleapis` is installed (required for API routes)

## Local Development

For local development, you can either:

1. **Use the standalone backend** (in `backend/` folder):
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Then set `VITE_DATA_API_URL=http://localhost:3001` in `.env.local`

2. **Use Vercel dev** (runs API routes locally):
   ```bash
   npx vercel dev
   ```
   This will run both frontend and API routes locally.

## Updating Environment Variables

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add or update variables
3. Redeploy the project (or wait for automatic redeploy on next push)

## Continuous Deployment

Once connected to GitHub, Vercel will automatically deploy:
- Every push to `main` branch → Production deployment
- Every push to other branches → Preview deployment

No manual deployment needed! 🚀

