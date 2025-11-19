# Shadcn Admin Dashboard

Admin Dashboard UI crafted with Shadcn and Vite. Built with responsiveness and accessibility in mind.

![alt text](public/images/shadcn-admin.png)

I've been creating dashboard UIs at work and for my personal projects. I always wanted to make a reusable collection of dashboard UI for future projects; and here it is now. While I've created a few custom components, some of the code is directly adapted from ShadcnUI examples.

> This is not a starter project (template) though. I'll probably make one in the future.

## Features

- Light/dark mode with theming tokens
- Responsive layouts for grid + feed views
- Accessible components (Radix + shadcn/ui base)
- Global search command
- 10+ application pages (jobs, apps, chats, tasks, etc.)
- Extra custom components and RTL support
- **Clerk-powered authentication** (modal sign-in/sign-up)
- **Admin dashboard** at `/admin` for moderating jobs, spotlight slots, posting requests, and supporters

<details>
<summary>Customized Components (click to expand)</summary>

This project uses Shadcn UI components, but some have been slightly modified for better RTL (Right-to-Left) support and other improvements. These customized components differ from the original Shadcn UI versions.

If you want to update components using the Shadcn CLI (e.g., `npx shadcn@latest add <component>`), it's generally safe for non-customized components. For the listed customized ones, you may need to manually merge changes to preserve the project's modifications and avoid overwriting RTL support or other updates.

> If you don't require RTL support, you can safely update the 'RTL Updated Components' via the Shadcn CLI, as these changes are primarily for RTL compatibility. The 'Modified Components' may have other customizations to consider.

### Modified Components

- scroll-area
- sonner
- separator

### RTL Updated Components

- alert-dialog
- calendar
- command
- dialog
- dropdown-menu
- select
- table
- sheet
- sidebar
- switch

**Notes:**

- **Modified Components**: These have general updates, potentially including RTL adjustments.
- **RTL Updated Components**: These have specific changes for RTL language support (e.g., layout, positioning).
- For implementation details, check the source files in `src/components/ui/`.
- All other Shadcn UI components in the project are standard and can be safely updated via the CLI.

</details>

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons) (Brand icons only)

**Auth:** [Clerk](https://clerk.com/) React SDK (modal sign-in/sign-up)

## Environment variables

Create `.env.local` (or `.env`) with the following values. `.env*` files are ignored by git.

```bash
VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
# Optional backend bridge for CSV/Sheets driven data
VITE_DATA_API_URL=https://your-api.example.com
# Optional comma-separated list of admin emails allowed to access /admin
VITE_ADMIN_EMAILS=admin@example.com,owner@example.com
```

- `VITE_CLERK_PUBLISHABLE_KEY` is required for Clerk to render auth modals. Generate it from your Clerk dashboard (React quickstart).
- `VITE_DATA_API_URL` is optional. When provided, the new API client reads/writes jobs, spotlight entries, posting requests, and supporters from your backend or Google Sheets adapter. If omitted, the UI falls back to local mock data.
- `VITE_ADMIN_EMAILS` lets you specify who can access `/admin`. When omitted, any signed-in user will see the admin tooling (useful for local testing).

## Run Locally

### Frontend Setup

```bash
git clone https://github.com/nextgrid-digital/Service-now.git
cd Service-now
npm install   # or pnpm install
cp .env.example .env.local  # add the Clerk key + optional API URL/admin emails
npm run dev
```

### Backend Setup (Google Sheets Adapter)

The project includes a backend adapter that connects to Google Sheets. To use it:

1. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Google Sheets API:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API
   - Create a Service Account
   - Download the service account key JSON file
   - Save it as `service-account-key.json` in the `backend/` directory
   - Share your Google Sheet with the service account email (found in the JSON file)

3. **Configure backend environment:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and add:
   - `GOOGLE_SPREADSHEET_ID`: The ID from your Google Sheets URL (found in the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`)
   - `GOOGLE_SERVICE_ACCOUNT_KEY_FILE`: Path to your service account key (default: `./service-account-key.json`)

4. **Set up your Google Sheet:**
   Create a Google Sheet with the following tabs (sheets):
   - **Jobs** - Columns: `id`, `title`, `company`, `location`, `type`, `salary`, `description`, `requirements`, `postedBy`, `createdAt`, `updatedAt`
   - **Spotlight** - Columns: `jobId`, `priority`, `paid`
   - **PostingRequests** - Columns: `id`, `company`, `jobTitle`, `amountPaid`, `status`, `createdAt`
   - **Supporters** - Columns: `userId`, `name`, `email`, `amount`, `supportedAt`, `isSupporter`

5. **Start the backend server:**
   ```bash
   cd backend
   npm run dev  # Runs on http://localhost:3001
   ```

6. **Update frontend `.env.local`:**
   Add the backend URL:
   ```bash
   VITE_DATA_API_URL=http://localhost:3001
   ```

## Admin & data overview

- `/admin` now surfaces a guarded dashboard that requires a signed-in Clerk user whose email appears in `VITE_ADMIN_EMAILS` (or whose public metadata contains `role: "admin"`).
- Jobs, supporters, and future spotlight/posting request data flow through the new API client (`src/lib/api.ts`). When a `VITE_DATA_API_URL` is set, the client calls your backend/Sheets adapter; otherwise it falls back to the bundled sample data so the UI still works offline.
- Public pages (`/`, spotlight carousel, supporter components, etc.) read from the same stores/API so you see live changes immediately after moderators take action.

---

Original template by [@satnaing](https://github.com/satnaing). Released under the [MIT License](https://choosealicense.com/licenses/mit/).
