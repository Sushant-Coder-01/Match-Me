# MatchMe - Dating App

A dating app where users can create profiles, match with others, and chat. This project is built using Next.js and integrates various features to create a seamless experience for users.

## Project Info

- **Name**: MatchMe
- **Description**: A dating app for connecting people.
- **Tech Stack**:
  - **Next.js**: React framework for building fast web apps.
  - **Prisma ORM**: Object-Relational Mapping for database interaction.
  - **TailwindCSS**: Utility-first CSS framework for custom designs.
  - **NextUI**: Component library for modern, responsive UI components.
  - **NextAuth**: Authentication for Next.js applications.
  - **TypeScript**: A superset of JavaScript for static typing.
  - **React**: JavaScript library for building user interfaces.

## Scripts

Here are the npm scripts for building and running the app:

- **`npm run dev`**: Starts the Next.js development server.
- **`npm run build`**: Builds the app for production.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lint the code using Next.js linting.

## Steps Taken

Here's a checklist of what I've done so far:

### Step - 1 : Set Up

- [x] Create NextJS Project from scratch.
  - [x] NextJS Setup
  - [x] TailwindCSS Setup
- [x] Install NextUI Library & React Icons Library
- [x] NextJS Routing Created
- [x] Add a Navbar

### Step - 2 : Add Login & Register

- [x] Add a Login Form
- [x] Add a React Hook Form
- [x] Add Zod Form Validation
- [x] Add Register Form

### Step - 3 : Add User Authentication

- [x] Install NextAuth(Auth.js) & Prisma
- [x] Setup PostgreSQL DB
- [x] Configure Prisma
- [x] Add NextJS server action to register new user
- [x] Add Error Handling for Register Form using Zod
- [x] Add Sign In user features
- [x] Add React-toastify Alert
- [x] Get user session data using auth
- [x] Add dropdown menu to the top Navbar using NextUI
- [x] Use NextJS Middleware to add protected routes

### Step - 4 : Add Member List & Member Details

- [x] Update Prisma Schema by add Member & Photo Tables
- [x] Seed data into DB
- [x] Fetch members data & Display members list
- [ ] Use dynamic route in NextJS
- [ ] Add server Action to get member details
- [ ] Use NextJS Layout Page to add member sidebar
- [ ] Add Member Details Profile Page
- [ ] Add Member details profile page
- [ ] Add member details chat page
- [ ] Add loading indicators in member details page
- [ ] Add custom error page
