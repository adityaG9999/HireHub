# HireHub — MERN Stack Job Portal

A full-featured job portal application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. HireHub connects job seekers with employers — browse listings, save jobs, apply with a resume, and manage everything from a clean, responsive dashboard.

## Features

- **JWT Authentication** — Secure login/register with two roles: **Job Seeker** & **Employer**
- **Job Listings** — Browse, search, and view detailed job postings
- **Save Jobs** — Bookmark jobs and access them later from a dedicated Saved Jobs page
- **Apply for Jobs** — Submit applications with cover letter and resume upload (Cloudinary)
- **Employer Dashboard** — Post new jobs, edit/delete existing listings
- **Application Tracking** — Job seekers track their applications; employers view received applications with resume previews
- **Fully Responsive** — Optimized for desktop, tablet, and mobile screens

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, React Router v6, Vite, Axios, react-icons, react-hot-toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (cookie-based), Bcrypt |
| **File Uploads** | Cloudinary + express-fileupload |
| **Styling** | Vanilla CSS (custom responsive design) |

## API Endpoints

### User Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/user/register` | ❌ | Register a new user |
| POST | `/api/v1/user/login` | ❌ | Login user |
| GET | `/api/v1/user/logout` | ✅ | Logout user |
| GET | `/api/v1/user/getuser` | ✅ | Get current user profile |

### Job Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/job/getall` | ❌ | Get all active jobs |
| POST | `/api/v1/job/post` | ✅ | Post a new job (Employer) |
| GET | `/api/v1/job/getmyjobs` | ✅ | Get employer's own jobs |
| PUT | `/api/v1/job/update/:id` | ✅ | Update a job (Employer) |
| DELETE | `/api/v1/job/delete/:id` | ✅ | Delete a job (Employer) |
| GET | `/api/v1/job/:id` | ✅ | Get single job details |
| PUT | `/api/v1/job/toggle-save/:jobId` | ✅ | Toggle save/unsave a job |
| GET | `/api/v1/job/saved` | ✅ | Get all saved jobs |

### Application Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/application/post` | ✅ | Submit a job application |
| GET | `/api/v1/application/employer/getall` | ✅ | Get applications (Employer) |
| GET | `/api/v1/application/jobseeker/getall` | ✅ | Get own applications (Seeker) |
| DELETE | `/api/v1/application/delete/:id` | ✅ | Delete an application |

## Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB Atlas** account (or local MongoDB server)
- **Cloudinary** account for resume/image storage

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/adityaG9999/HireHub.git
   cd HireHub
   ```

2. **Install dependencies:**
   ```sh
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**

   Create a `config` folder inside `backend/`, then create a `config.env` file:

   ```env
   PORT=4000
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   FRONTEND_URL=http://localhost:5173
   DB_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   ```

4. **Run the backend** (from `/backend` directory):
   ```sh
   node server.js
   ```

5. **Run the frontend** (from `/frontend` directory):
   ```sh
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
HireHub/
├── backend/
│   ├── controllers/         # Route handler logic
│   ├── database/            # MongoDB connection
│   ├── middlewares/          # Auth, error handling
│   ├── models/              # Mongoose schemas (User, Job, Application)
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
│
├── frontend/
│   ├── public/              # Static assets (images, favicon)
│   └── src/
│       ├── components/
│       │   ├── Application/  # Apply, MyApplications, ResumeModal
│       │   ├── Auth/         # Login, Register
│       │   ├── Home/         # Hero, HowItWorks, Categories, Companies
│       │   ├── Job/          # Jobs, JobDetails, MyJobs, PostJob, SavedJobs
│       │   ├── Layout/       # Navbar, Footer
│       │   └── NotFound/     # 404 page
│       ├── App.jsx           # Routes & app shell
│       ├── App.css           # Global styles
│       └── main.jsx          # React entry point + Context Provider
│
└── README.md
```

## Author

**Aditya Gajare** — [GitHub](https://github.com/adityaG9999)

## License

This project is open source and available for educational purposes.
