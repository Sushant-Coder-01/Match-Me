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

Here are the `npm` scripts for building and running the app:

- **`npm run dev`**: Starts the Next.js development server.
- **`npm run build`**: Builds the app for production.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lint the code using Next.js linting.

## DB Commands

- **`npx prisma migrate reset --skip-seed`** : This command resets your database by rolling back all migrations and applying them again from scratch.
  The --skip-seed flag skips running any seed scripts.

- **`npx prisma db seed`**: This command runs your seed script, which adds initial data to your database after setting it up.

- **`npx prisma generate`**: This command generates the Prisma client, which allows you to interact with your database using Prisma's API.

- **`npx prisma db push`**: This command pushes your Prisma schema changes to your database without creating a migration (for development environments).

- **`npx prisma studio`**: This command opens Prisma Studio, a web interface for browsing and editing your database content visually.

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

![login & register](public/daigrams/loginAndRegister.png)

### Step - 3 : Add User Authentication

- [x] Install NextAuth(`Auth.js`) & Prisma
- [x] Setup PostgreSQL DB
- [x] Configure Prisma
- [x] Add NextJS server action to register new user
- [x] Add Error Handling for Register Form using Zod
- [x] Add Sign In user features
- [x] Add `React-toastify` Alert
- [x] Get user session data using auth
- [x] Add dropdown menu to the top Navbar using NextUI
- [x] Use NextJS Middleware to add protected routes

### Step - 4 : Add Member List & Member Details

- [x] Update Prisma Schema by add Member & Photo Tables
- [x] Seed data into DB
- [x] Fetch members data & Display members list
- [x] Use dynamic route in NextJS
- [x] Add server Action to get member details
- [x] Use NextJS Layout Page to add member sidebar
- [x] Add Member Details to Profile Page
- [x] Add Member Photos to profile page
- [x] Add member Chat page
- [x] Add loading indicators in member details page
- [x] Add custom error page

### Step - 5 : Add Like Feature

- [x] Update Prisma Schema for a `many to many relationships`
- [x] Server Action - Add `likeAction.ts`
- [x] Add `Like` toggle feature.
- [x] Add View `likes` feature.
- [x] Use useTransition hook for tabs manual loading

### Step - 6 : Add Upload Image Feature

- [x] Add `edit member details` feature
- [x] Add `edit photos` feature
- [x] Set up `Cloudinary` on Next.js app
- [x] Add an image upload feature using `cloudinary`
- [x] Add `set main image + delete image` feature

### Step - 7 : Add Messaging Feature

- [x] Set up Prisma for messages
- [x] Create a chat form
- [x] Create the send message action
- [x] Get the message thread
- [x] Create a message DTO
- [x] Display the messages with message box
- [x] Add inbox/outbox message table

### Step - 8 : Pusher Realtime Communication + `Zustand` State Management

![Pusher Realtime Communication](\public\daigrams\pusherRealtimeCommunication.png)

- [x] Set up Pusher
- [x] Use pusher public channel to add live chat in server action
- [x] Subscribe live messages in public channel
- [x] Add messages dateRead subscriptions in public channels
- [x] Set up presence channel in pusher
- [x] Set up `Zustand` for state management
- [x] Add member presence store using `Zustand`
- [x] Add presence channel hook to subscribe members presence
- [x] Add member presence indicator
- [x] Set up private channel in pusher to notify `realtime` messages
- [x] Refactor Messages Table
- [x] Get real time unread message count
- [x] Add custom toast for notifications for new likes and messages

### Step - 9 : Add Sorting + Filtering + Paging

- [x] Add Sorting + Filters Component
- [x] Add Pagination Component
- [x] Add Member Filter Functionality
- [x] Member Filter Refactoring
- [x] Add Members offset paging functionality
- [x] Members offset paging refactoring + Clean ups
- [ ] Cursor paging vs Offset paging
- [ ] Add messages cursor paging functionality

### Step - 10 : Add Registration Wizard, Account Verification, Password Reset

- [x] Add a Register Wizard Form
- [x] Set up token table & reset the database
- [x] Add token generation function
- [x] Set up resend email provider
- [x] Add the verify email function
- [x] Add the forgot password functionality

### Step - 11 : Add OAuth Google

- [x] Add OAuth social login provider in `nextjs`
- [x] Add GitHub social login
- [x] Get profile complete from JWT callback
- [x] Use Typescript Module Augmentation to fix type error
- [x] Add complete profile from for social login
- [x] Add google provider

### Step - 12 : Add Role Access Feature

- [x] Add user role in database
- [x] Add user role to the session data
- [x] Render admin content
- [x] Add the photo moderation functionality
- [ ] Add real-time update in photo moderation functionality
