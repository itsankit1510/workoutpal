# WorkoutPal

WorkoutPal is an AI-powered fitness application that helps users create personalized workout plans, track their progress, and stay consistent with their fitness goals.

## Project Structure

The project is organized into two main directories:

- **`client/`**: Frontend application built with Next.js and React
- **`server/`**: Backend API built with Node.js and Express

## Features

### Implemented Features

#### Authentication & User Management
- [x] User registration and login system
- [x] JWT-based authentication with access and refresh tokens
- [x] User profile management
- [x] Role-based access control (admin and regular users)
- [x] Secure password handling

#### Admin Dashboard
- [x] User management interface for administrators
- [x] User listing and search functionality
- [x] User creation, editing, and deletion

#### UI Components
- [x] Responsive design with Tailwind CSS
- [x] Custom UI components (buttons, cards, dialogs, inputs, etc.)
- [x] Calendar integration UI

#### API Integration
- [x] RESTful API endpoints for users and authentication
- [x] Error handling and logging
- [x] Database migrations system

### To-Do Features

#### Workout Planning
- [ ] AI-powered workout plan generation
- [ ] Customizable workout templates
- [ ] Exercise library with descriptions and animations
- [ ] Intensity and difficulty adjustment

#### Progress Tracking
- [ ] Workout logging system
- [ ] Progress visualization with charts and graphs
- [ ] Achievement and milestone tracking
- [ ] Body measurements and weight tracking

#### Calendar & Scheduling
- [ ] Full integration with Google Calendar, Apple Calendar, and Microsoft Outlook
- [ ] Smart reminders for upcoming workouts
- [ ] Schedule adjustment based on availability

#### Social Features
- [ ] Workout sharing capabilities
- [ ] Community challenges
- [ ] Friend system and activity feeds
- [ ] Trainer-client communication tools

#### Mobile Experience
- [ ] Progressive Web App (PWA) implementation
- [ ] Offline workout access
- [ ] Push notifications

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/workoutpal.git
   cd workoutpal
   ```

2. Install dependencies for both client and server
   ```
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory
   - Create a `.env.local` file in the client directory

4. Start development servers
   ```
   # Start server (from server directory)
   npm run dev

   # Start client (from client directory)
   npm run dev
   ```

5. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api

## Technologies Used

### Frontend
- Next.js 15.3
- React 18
- Tailwind CSS
- Radix UI Components
- TypeScript

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Winston Logger

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or suggestions, please contact the project maintainers.