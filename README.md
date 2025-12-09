# SafeTrip Explorer PH v2 🗺️

A modern, responsive web application for exploring tourist spots in the Philippines. Built with Next.js 15, featuring beautiful animations, role-based authentication, and mobile-first design.

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: Framer Motion integration for page transitions and interactions
- **Modern Components**: Reusable UI components built with Radix UI and Tailwind CSS

### 🔐 Authentication & Authorization
- **Role-Based Access**: Support for User, Admin, and Super Admin roles
- **Secure Authentication**: NextAuth.js with MongoDB adapter
- **Password Security**: Bcrypt hashing with validation rules
- **Session Management**: JWT-based sessions with automatic refresh

### 🏖️ Tourist Spot Management
- **Interactive Cards**: Hover effects and responsive grid layouts
- **Rich Content**: Images, ratings, pricing, and amenities
- **Search Functionality**: Find destinations with real-time search
- **Detailed Views**: Comprehensive spot information and booking options

### 📱 Mobile Experience
- **Responsive Navigation**: Hamburger menu for mobile devices
- **Touch-Friendly**: Optimized interactions for mobile users
- **Performance**: Fast loading with image optimization and lazy loading

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Radix UI**: Accessible component primitives

### Backend & Database
- **NextAuth.js**: Authentication framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **API Routes**: Serverless functions for data operations

### Development Tools
- **ESLint**: Code linting and formatting
- **Turbopack**: Fast build tool for development
- **TypeScript**: Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd SafetripExplorerPH-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/safetrip
   MONGODB_DB=safetrip

   # Authentication
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # Optional: For production
   NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── layouts/          # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions and configurations
│   ├── models/           # Data models
│   ├── mongodb.ts        # Database connection
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
```

## 🎯 Key Components Explained

### 🧩 Reusable Component Architecture

#### UI Components (`src/components/ui/`)
- **Button**: Variants for different styles and sizes
- **Card**: Flexible content containers
- **Input**: Form input with consistent styling
- **Badge**: Status indicators and tags

#### Layout Components (`src/components/layouts/`)
- **Navigation**: Responsive header with role-based menus
- **MainLayout**: Page wrapper with navigation and footer
- **Footer**: Site footer with links and information
- **ThemeProvider**: Theme context provider

#### Feature Components (`src/components/features/`)
- **HeroSection**: Landing page hero with search
- **TouristSpotCard**: Spot display cards with animations

### 🔄 React Patterns Used

#### Custom Hooks
- State management for authentication
- Form handling with validation
- Theme switching logic

#### Component Composition
- Higher-order components for layouts
- Compound components for complex UI
- Render props for flexible APIs

#### Performance Optimizations
- Lazy loading for components
- Image optimization with Next.js
- Memoization for expensive computations

## 🎨 Styling & Design

### Responsive Design
- **Mobile-first**: Styles start from mobile and scale up
- **Breakpoint system**: Consistent responsive breakpoints
- **Flexible grids**: Auto-adjusting layouts

### Animation System
- **Page transitions**: Smooth navigation between routes
- **Micro-interactions**: Hover effects and loading states
- **Stagger animations**: Sequential element animations

### Theme System
- **CSS custom properties**: Dynamic theme variables
- **Dark mode support**: Automatic and manual theme switching
- **Consistent color palette**: Brand colors with variants

## 🔐 Authentication Flow

1. **Registration**: User creates account with validation
2. **Login**: Credentials verified against database
3. **Session**: JWT token stored for authentication
4. **Role-based access**: Different permissions per user role

## 📊 Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string, // hashed
  role: "user" | "admin" | "superadmin",
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Tourist Spots Collection
```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  location: string,
  category: string,
  price: number,
  images: string[],
  rating?: number,
  amenities?: string[],
  // ... other fields
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests if applicable
5. Submit a pull request

## 📝 Learnings & Best Practices

### React Patterns
- **Component composition** over inheritance
- **Custom hooks** for reusable logic
- **TypeScript interfaces** for prop validation
- **Error boundaries** for graceful error handling

### Performance
- **Code splitting** with dynamic imports
- **Image optimization** with Next.js Image component
- **Memoization** with React.memo and useMemo
- **Lazy loading** for route components

### Accessibility
- **Semantic HTML** for screen readers
- **Keyboard navigation** support
- **ARIA labels** for complex components
- **Color contrast** compliance

### Security
- **Input validation** on client and server
- **Password hashing** with bcrypt
- **JWT tokens** for session management
- **CORS configuration** for API security

## 📞 Team

- **Mark Wendell M. Aquino** - Lead Developer
- **Jello Moreno** - UI/UX Designer
- **Princess Nicole Mercado** - Project Manager
- **Prinze Muyo** - QA Tester

## 🙏 Acknowledgments

- Built for BSIT Mobile & Web Application course
- Inspired by real-world tourism platforms
- Uses modern web technologies and best practices

---

**Happy Exploring! 🌴🏝️**
# SafetripExplorerPHv2
