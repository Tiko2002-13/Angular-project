# My Angular E-Commerce App

A modern e-commerce application built with Angular 20, featuring a beautiful UI, product catalog, shopping cart, and payment integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Code Quality](#code-quality)
- [Performance Optimizations](#performance-optimizations)
- [Contributing](#contributing)

## ✨ Features

- 🛍️ Product catalog with filtering and sorting
- 🛒 Shopping cart functionality
- 💳 Payment processing page
- 📱 Responsive design
- 🎨 Modern UI with SCSS styling
- ⚡ Optimized performance with OnPush change detection
- 🔍 Product search and filtering by brand, discount, rating, and price
- ⭐ Product ratings and reviews
- 📦 Multiple product categories

## 🛠 Tech Stack

- **Framework:** Angular 20
- **Language:** TypeScript 5.8
- **Styling:** SCSS
- **UI Components:** Angular Material
- **State Management:** RxJS BehaviorSubject
- **Routing:** Angular Router
- **Build Tool:** Angular CLI
- **Testing:** Jasmine & Karma

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd my-angular-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/`

### Environment Setup

The application supports multiple environments:

- **Development:** `ng serve` (uses `environment.development.ts`)
- **Production:** `ng build --configuration production` (uses `environment.production.ts`)

## 📁 Project Structure

```
src/
├── app/                    # Core application module
│   ├── models/            # TypeScript interfaces and types
│   ├── data/              # Static data and constants
│   └── app.routes.ts      # Application routing configuration
├── components/            # Reusable UI components
│   ├── header/
│   ├── footer/
│   ├── hero/
│   ├── featured/
│   └── ...
├── pages/                 # Page-level components
│   ├── home/
│   ├── products/
│   ├── product-info/
│   └── card-payment/
├── shared-components/     # Shared UI components
│   ├── btn/
│   ├── product-card/
│   └── custom-input/
├── assets/               # Static assets (images, icons, etc.)
├── environments/         # Environment configurations
└── styles.scss          # Global styles
```

## 📜 Available Scripts

### Development

```bash
npm start               # Start development server
npm run watch          # Build with watch mode
```

### Building

```bash
npm run build          # Production build
npm run build:dev      # Development build
```

### Testing

```bash
npm test              # Run unit tests
npm run test:headless # Run tests in headless mode
```

### Code Quality

```bash
npm run lint          # Run ESLint (after installing ESLint packages)
npm run format        # Format code with Prettier
```

## 🎯 Code Quality

This project uses:

- **ESLint** for code linting (configuration in `.eslintrc.json`)
- **Prettier** for code formatting
- **TypeScript strict mode** for type safety
- **OnPush Change Detection** for optimized performance

### Setting up ESLint

If you encounter npm cache issues, first run:
```bash
sudo chown -R $(whoami) ~/.npm
npm install --save-dev @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```

## ⚡ Performance Optimizations

- **OnPush Change Detection Strategy** - Reduces unnecessary change detection cycles
- **Lazy Loading** - Routes are lazy-loaded to improve initial load time
- **Environment-based Configuration** - Separate builds for development and production
- **Data Separation** - Product data separated into dedicated files for better maintainability
- **SCSS Modularization** - Organized styles with variables and mixins

## 🧪 Testing

The project includes unit tests for components and services. Run tests with:

```bash
npm test
```

Test files are located alongside their respective components with `.spec.ts` extension.

## 🏗️ Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build includes:
- Minification
- Tree-shaking
- AOT compilation
- Optimized bundle sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
