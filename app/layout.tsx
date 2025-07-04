import { Container, Theme } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import AuthProvider from './auth/AuthProvider';
import './globals.css';
import QueryClientProvider from "./QueryClientProvider";
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme 
            appearance='light'
            accentColor='violet'
            style={{
              '--default-font-family': 'var(--font-inter)',
            } as React.CSSProperties}
            >
            <Navbar/>
            <Container>
              <main>{children}</main>
            </Container>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
