# Culinary Canvas - Recipe Web App

A modern, full-stack recipe application built with Next.js 14, Clerk authentication, and Neon PostgreSQL database.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication**: Secure user authentication with Clerk
- **Database**: PostgreSQL database hosted on Neon
- **Recipe Management**: Browse, search, and filter recipes
- **Favorites**: Save your favorite recipes
- **Meal Planning**: Plan your weekly meals
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Neon database account
- Clerk account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd culinary-canvas
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Neon Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Optional: Clerk URLs (customize if needed)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 4. Set up Clerk

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your publishable key and secret key to `.env.local`
4. Configure your sign-in/sign-up settings in the Clerk dashboard

### 5. Set up Neon Database

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new database
3. Copy the connection string to your `.env.local` file
4. Make sure to include `?sslmode=require` at the end of the connection string

### 6. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to your database
npx prisma db push

# Seed the database with sample data
npx tsx lib/seed.ts
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── favorites/         # Favorites page
│   ├── meal-planner/      # Meal planner page
│   ├── recipes/           # Recipes page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── FeaturedRecipes.tsx # Featured recipes
│   ├── RecipeCard.tsx     # Recipe card component
│   ├── RecipeOfTheDay.tsx # Daily featured recipe
│   ├── StatsSection.tsx   # Statistics section
│   └── Footer.tsx         # Footer
├── lib/                   # Utilities and database
│   ├── db.ts             # Prisma client
│   └── seed.ts           # Database seeding
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## 🗄️ Database Schema

The app uses the following main models:

- **Recipe**: Store recipe information (title, description, ingredients, instructions, etc.)
- **User**: User profiles (synced with Clerk)
- **UserFavorite**: User's favorite recipes
- **MealPlan**: Weekly meal planning data

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Component styles are in individual component files

### Database

- Modify `prisma/schema.prisma` to change the database schema
- Run `npx prisma db push` after making changes
- Update the seed file in `lib/seed.ts` for sample data

## 📱 API Endpoints

- `GET /api/recipes` - Fetch recipes with filtering
- `POST /api/recipes` - Create a new recipe
- `GET /api/favorites` - Get user's favorite recipes
- `POST /api/favorites` - Add recipe to favorites
- `DELETE /api/favorites` - Remove recipe from favorites

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Heroku
- AWS
- Google Cloud

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Neon](https://neon.tech/) for the database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Unsplash](https://unsplash.com/) for recipe images

## 📞 Support

If you have any questions or need help, please open an issue or contact us at support@culinarycanvas.com

## Manual Test Checklist

Use this checklist to verify that all features and components of the app are working as expected:

### 1. Authentication

- [ ] Sign up with Clerk (new user).
- [ ] Sign in and out.
- [ ] Check user context in header (welcome message, avatar, etc.).

### 2. Home Page & Hero

- [ ] Hero section loads with search bar and popular searches.
- [ ] Typing in the search bar shows suggestions.
- [ ] Clicking a popular search navigates to filtered recipes.

### 3. Recipe Browsing

- [ ] Visit `/recipes` page.
- [ ] Use search, category, and dietary filters.
- [ ] Recipes update according to filters.
- [ ] Loading skeletons appear while fetching.

### 4. Recipe Card

- [ ] Each card displays image, title, description, tags, and stats.
- [ ] "View Recipe" button navigates to the recipe detail page.
- [ ] Favorite button works (prompts sign-in if not signed in).

### 5. Recipe of the Day

- [ ] Loads a random recipe.
- [ ] "View Full Recipe" navigates to the detail page.
- [ ] "Save Recipe" works (prompts sign-in if not signed in).

### 6. Featured Recipes

- [ ] Loads and displays featured recipes.
- [ ] "View Recipe" navigates to the detail page.
- [ ] Favorite button works (local state).

### 7. Recipe Detail Page

- [ ] Displays all recipe info, ingredients, instructions, tags.
- [ ] "Add to Meal Plan" button is present.
- [ ] "Start Cooking" button:
  - [ ] If **not premium**: shows lock icon and opens pricing modal.
  - [ ] If **premium**: opens Cooking Mode modal.
- [ ] Pricing modal displays upgrade info and can be closed.

### 8. Cooking Mode

- [ ] Modal opens for premium users.
- [ ] Step navigation, timer, and completion work.
- [ ] Modal can be closed.

### 9. Meal Planner

- [ ] Visit `/meal-planner`.
- [ ] If not signed in, prompts to sign in.
- [ ] If signed in, can interact with meal planner UI.

### 10. Favorites

- [ ] Visit `/favorites`.
- [ ] If not signed in, prompts to sign in.
- [ ] If signed in, shows saved recipes.

### 11. Footer & Header

- [ ] Navigation links work.
- [ ] Contact and category links work.
- [ ] Responsive on mobile and desktop.

### 12. Stats Section

- [ ] Stats display correctly on the home page.

### 13. Error Handling

- [ ] Try to access a non-existent recipe: should show "Recipe Not Found."
- [ ] API/network errors show appropriate messages.

### 14. Premium Flow

- [ ] As a non-premium user, clicking "Start Cooking" shows pricing modal.
- [ ] As a premium user, "Start Cooking" works.
- [ ] (If payment is set up) "Upgrade Now" triggers payment flow.
