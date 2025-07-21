import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Culinary Canvas - Your Ultimate Cooking Companion',
  description: 'Discover, plan, and create delicious meals with ease. Your personal recipe collection and meal planning assistant.',
  keywords: 'recipes, cooking, meal planning, food, culinary, kitchen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className="min-h-screen antialiased">
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#10b981',
                color: '#fff',
                borderRadius: '12px',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}