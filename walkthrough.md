# HireHub — Project Modification Report

> **Project**: MERN Stack Job Portal  
> **Original Name**: CareerConnect  
> **New Name**: HireHub  
> **Date**: 21 June 2026  

---

## Part 1 — What the Original Project Had

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (cookie-based) |
| File Uploads | Cloudinary + express-fileupload |
| Styling | Vanilla CSS (single `App.css`) |
| Icons | react-icons |
| HTTP Client | Axios |
| Notifications | react-hot-toast |

### Original Features

#### Authentication & Authorization
- JWT-based auth with cookie storage
- Two roles: **Job Seeker** and **Employer**
- Login & Register pages with role selection
- Password hashing with bcrypt
- Protected routes via `isAuthenticated` middleware

#### Job Management (Employer Side)
- **Post Job** — Create listings with title, description, category, location, salary (fixed or ranged)
- **My Jobs** — View, edit, and delete own job postings
- Toggle between editing and viewing mode per job card

#### Job Discovery (Job Seeker Side)
- **Browse All Jobs** — View all non-expired job listings as cards
- **Job Details** — Full detail view for any job
- **Apply for Job** — Submit application with name, email, phone, cover letter, and resume upload

#### Application Tracking
- **Job Seeker**: View own applications, delete applications
- **Employer**: View all applications received, view resumes in a modal

#### UI & Layout
- Responsive navbar with hamburger menu on mobile
- Hero section with stats (live jobs, companies, seekers, employers)
- "How It Works" section (3-step guide)
- Popular Categories section (8 categories)
- Top Companies section (Microsoft, Tesla, Apple)
- Footer with social links
- 404 Not Found page
- Primary color: **dark green** (`#2d5649`)

### Original File Structure

```
react-job-portal-main/
├── backend/
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── database/
│   │   └── dbConnection.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── catchAsyncError.js
│   │   └── error.js
│   ├── models/
│   │   ├── applicationSchema.js
│   │   ├── jobSchema.js
│   │   └── userSchema.js
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── careerconnect-white.png
│   │   ├── careerconnect-black.png
│   │   ├── heroS.jpg, login.png, register.png, etc.
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Application/
│   │   │   │   ├── Application.jsx
│   │   │   │   ├── MyApplications.jsx
│   │   │   │   └── ResumeModal.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   ├── PopularCategories.jsx
│   │   │   │   └── PopularCompanies.jsx
│   │   │   ├── Job/
│   │   │   │   ├── JobDetails.jsx
│   │   │   │   ├── Jobs.jsx
│   │   │   │   ├── MyJobs.jsx
│   │   │   │   └── PostJob.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   └── NotFound/
│   │   │       └── NotFound.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

### Original API Endpoints

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| POST | `/api/v1/user/register` | ❌ | Any | Register user |
| POST | `/api/v1/user/login` | ❌ | Any | Login user |
| GET | `/api/v1/user/logout` | ✅ | Any | Logout user |
| GET | `/api/v1/user/getuser` | ✅ | Any | Get current user |
| GET | `/api/v1/job/getall` | ❌ | Any | Get all active jobs |
| POST | `/api/v1/job/post` | ✅ | Employer | Post a new job |
| GET | `/api/v1/job/getmyjobs` | ✅ | Employer | Get employer's jobs |
| PUT | `/api/v1/job/update/:id` | ✅ | Employer | Update a job |
| DELETE | `/api/v1/job/delete/:id` | ✅ | Employer | Delete a job |
| GET | `/api/v1/job/:id` | ✅ | Any | Get single job details |
| POST | `/api/v1/application/post` | ✅ | Job Seeker | Submit application |
| GET | `/api/v1/application/employer/getall` | ✅ | Employer | Get received applications |
| GET | `/api/v1/application/jobseeker/getall` | ✅ | Job Seeker | Get own applications |
| DELETE | `/api/v1/application/delete/:id` | ✅ | Job Seeker | Delete application |

---

## Part 2 — Changes Made

Two major modifications were performed:

1. **Save Job Feature** (Backend + Frontend)
2. **Global Rebranding** (CareerConnect → HireHub + Color Scheme)

---

### Change 1: Save Job Feature — Backend

#### [MODIFY] [userSchema.js](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/backend/models/userSchema.js)

Added a `savedJobs` array field to the User model:

```diff
+  savedJobs: [
+    {
+      type: mongoose.Schema.Types.ObjectId,
+      ref: "Job",
+    },
+  ],
   createdAt: {
     type: Date,
     default: Date.now,
   },
```

#### [MODIFY] [jobController.js](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/backend/controllers/jobController.js)

- Added `import { User }` from the User model
- Added two new controller functions:

| Function | Logic |
|----------|-------|
| `toggleSaveJob` | Validates job exists → checks if already in `savedJobs` → uses `$pull` to remove (unsave) or `$addToSet` to add (save) → returns `saved: true/false` |
| `getSavedJobs` | Finds the user and uses `.populate("savedJobs")` to return full job documents |

#### [MODIFY] [jobRoutes.js](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/backend/routes/jobRoutes.js)

Added two new protected routes **before** the `/:id` catch-all:

```diff
+router.put("/toggle-save/:jobId", isAuthenticated, toggleSaveJob);
+router.get("/saved", isAuthenticated, getSavedJobs);
 router.get("/:id", isAuthenticated, getSingleJob);
```

> [!IMPORTANT]
> Routes are placed before `/:id` to prevent Express from matching `saved` or `toggle-save` as an `:id` parameter.

---

### Change 2: Save Job Feature — Frontend

#### [MODIFY] [Jobs.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Job/Jobs.jsx)

- Fetches saved job IDs on mount via `GET /api/v1/job/saved`
- Renders a **bookmark icon button** (top-right) on each card — visible to **Job Seekers only**
- `BsBookmark` (outlined) = not saved, `BsBookmarkFill` (filled) = saved
- Clicking toggles via `PUT /api/v1/job/toggle-save/:jobId`
- **Instant UI update** — local state updates without page refresh
- Toast notification on save/unsave

#### [NEW] [SavedJobs.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Job/SavedJobs.jsx)

New page at route `/jobs/saved`:
- Fetches saved jobs via `GET /api/v1/job/saved`
- Renders cards with title, category, country, and salary info
- Each card has a filled bookmark button to unsave (removes card instantly)
- **Empty state** with bookmark icon, descriptive text, and "Browse Jobs" CTA
- Loading state while fetching
- Redirects Employers to home page

#### [MODIFY] [Navbar.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Layout/Navbar.jsx)

Added **"SAVED JOBS"** navigation link, visible only to Job Seeker role users.

#### [MODIFY] [App.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/App.jsx)

- Imported `SavedJobs` component
- Added route: `<Route path="/jobs/saved" element={<SavedJobs />} />`

#### [MODIFY] [App.css](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/App.css) — Save Job Styles

- `.bookmark-btn` — Absolute positioned top-right, round hover effect, scale animation
- `.bookmark-btn.saved` — Filled state with primary color
- `.bookmark-btn.saved:hover` — Red color hint for unsave action
- `.savedJobs` — Full page layout matching existing job listing design
- `.savedJobs .empty-state` — Centered empty state with icon, text, and CTA button
- Responsive breakpoints at `1520px`, `1060px`, and `795px`

---

### Change 3: Global Rebranding — CareerConnect → HireHub

#### Name Changes

| File | What Changed |
|------|-------------|
| [index.html](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/index.html) | `<title>` → "HireHub: Find Top Talent and Hire the Best" |
| [frontend/package.json](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/package.json) | `"name"` → `"hirehub-frontend"` |
| [backend/package.json](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/backend/package.json) | `"name"` → `"hirehub-backend"` |
| [Footer.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Layout/Footer.jsx) | Copyright → "© 2026 HireHub. All Rights Reserved." |
| [HowItWorks.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Home/HowItWorks.jsx) | "How Career Connect Works" → "How HireHub Works" |

#### Logo Changes

The old **image-based logo** (`careerconnect-white.png` / `careerconnect-black.png`) was replaced with a **text-based logo** across 3 files:

| File | Old | New |
|------|-----|-----|
| [Navbar.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Layout/Navbar.jsx) | `<img src="/careerconnect-white.png">` | `<Link className="logo-text">Hire<span>Hub</span></Link>` |
| [Login.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Auth/Login.jsx) | `<img src="/careerconnect-black.png">` | `<div className="logo-text auth-logo">Hire<span>Hub</span></div>` |
| [Register.jsx](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/components/Auth/Register.jsx) | `<img src="/careerconnect-black.png">` | `<div className="logo-text auth-logo">Hire<span>Hub</span></div>` |

**Logo styling** (added to `App.css`):
- **Navbar variant**: White "Hire" + teal (#007F73) "Hub" on dark background
- **Auth variant**: Dark "Hire" + blue (#0A66C2) "Hub" on white background
- Bold 900 weight, tight letter-spacing, hover opacity effect

#### Color Scheme Overhaul

Every color in [App.css](file:///c:/Users/ATHARV/Desktop/react-job-portal-main/frontend/src/App.css) was globally replaced:

| Purpose | Old Color (Green) | New Color (Blue/Teal) |
|---------|-------------------|----------------------|
| Primary (buttons, links, icons, accents) | `#2d5649` | `#0A66C2` |
| Primary hover (darker shade) | `#1e3d32` | `#084e96` |
| Secondary (nav hover, mobile menu text) | `#184235` | `#007F73` |
| Light accent background | `rgb(233, 249, 255)` | `rgb(230, 244, 255)` |
| Box shadow color | `rgba(45, 86, 73, ...)` | `rgba(10, 102, 194, ...)` |

**Elements affected by the color change:**
- All form buttons (login, register, post job, apply)
- Form input focus borders & box shadows
- Navigation link hover states & underline animations
- Mobile hamburger menu link/button colors
- Hero section stat card icons
- Category card icons
- Company card icons & buttons
- Job listing card "Job Details" links
- Job detail page "Apply Now" button
- Not Found page "Return Home" link
- Bookmark save/unsave button states
- Saved Jobs empty state CTA button

#### Responsive Design Verification

All existing `@media` breakpoints remain **untouched** — only color values inside them were swapped:

| Breakpoint | Components Affected |
|------------|-------------------|
| `1520px` | Container max-widths across all pages |
| `1130px` | Fixed navbar, hamburger menu, page top-padding |
| `1060px` | Job card widths |
| `1000px` | Hero section stack |
| `950px` | Hero details flex-wrap |
| `850px` | How It Works cards, Job seeker card layout |
| `830px` | Auth page single column, MyJobs cards |
| `795px` | Job cards full width |
| `768px` | Global heading sizes |
| `670px` / `490px` / `400px` | Various card widths |

---

## Summary of New API Endpoints Added

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| PUT | `/api/v1/job/toggle-save/:jobId` | ✅ | Toggle save/unsave a job |
| GET | `/api/v1/job/saved` | ✅ | Get all saved jobs (populated) |

## Summary of New Frontend Routes Added

| Path | Component | Role |
|------|-----------|------|
| `/jobs/saved` | `SavedJobs.jsx` | Job Seeker only |

## Total Files Modified: 13

| # | File | Action |
|---|------|--------|
| 1 | `backend/models/userSchema.js` | Modified — added `savedJobs` field |
| 2 | `backend/controllers/jobController.js` | Modified — added 2 controller functions + User import |
| 3 | `backend/routes/jobRoutes.js` | Modified — added 2 routes |
| 4 | `backend/package.json` | Modified — name → `hirehub-backend` |
| 5 | `frontend/src/components/Job/Jobs.jsx` | Modified — added bookmark toggle |
| 6 | `frontend/src/components/Job/SavedJobs.jsx` | **New file** — Saved Jobs page |
| 7 | `frontend/src/components/Layout/Navbar.jsx` | Modified — text logo + SAVED JOBS link |
| 8 | `frontend/src/components/Layout/Footer.jsx` | Modified — HireHub copyright |
| 9 | `frontend/src/components/Auth/Login.jsx` | Modified — text logo |
| 10 | `frontend/src/components/Auth/Register.jsx` | Modified — text logo |
| 11 | `frontend/src/components/Home/HowItWorks.jsx` | Modified — heading text |
| 12 | `frontend/src/App.jsx` | Modified — added SavedJobs route |
| 13 | `frontend/src/App.css` | Modified — full color rebrand + new styles |
| 14 | `frontend/index.html` | Modified — page title |
| 15 | `frontend/package.json` | Modified — name → `hirehub-frontend` |
