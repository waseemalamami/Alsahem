# Saham Real Estate Design

A modern, responsive real estate investment platform built with React and TypeScript. This application provides a comprehensive solution for property investment management, featuring user authentication, property browsing, investment tracking, and financial tools.

## 🚀 Features

- **User Authentication**: Secure login/registration system with role-based access
- **Property Management**: Browse and filter properties with detailed information
- **Investment Tracking**: Monitor investment portfolios and performance
- **Financial Tools**: Installment calculator and investment analysis
- **Responsive Design**: Mobile-first approach with modern UI components
- **Dashboard**: Personalized user dashboard with notifications
- **Real-time Updates**: Dynamic property listings and investment updates

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd saham-real-estate-design
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## 🎯 Key Components

- **Navigation**: Responsive navigation with mobile menu
- **PropertyCard**: Property listing display component
- **InvestmentCard**: Investment portfolio item
- **InstallmentCalculator**: Financial calculation tool
- **UserDashboard**: Personalized user interface
- **ProtectedRoute**: Route protection component

## 🔐 Authentication

The application includes a complete authentication system with:
- User registration and login
- Protected routes
- Role-based access control
- User profile management

## 📱 Responsive Design

Built with mobile-first approach:
- Responsive grid layouts
- Mobile-optimized navigation
- Touch-friendly interfaces
- Adaptive component sizing

## 🚀 Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on every push

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Originally developed with [Lovable](https://lovable.dev/)
