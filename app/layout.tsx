import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CursorGlow } from '@/components/cursor-glow';
import { FloatingShapes } from '@/components/floating-shapes';
import { ContentProvider } from '@/lib/content-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vaibhav Narula — Engineer Who Ships Product',
  description: 'Senior .NET/React engineer who ships product, not just code. Four solo AI tools, documented as case studies, with the playbooks behind them.',
  authors: [{ name: 'Vaibhav Narula' }],
  openGraph: {
    title: 'Vaibhav Narula — Engineer Who Ships Product',
    description: 'Senior .NET/React engineer who ships product, not just code. Four solo AI tools, documented as case studies.',
    type: 'website',
  },
  twitter: {
    title: 'Vaibhav Narula — Engineer Who Ships Product',
    description: 'Senior .NET/React engineer who ships product, not just code. Four solo AI tools, documented as case studies.',
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Instrument+Serif&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
          <ContentProvider>
            <CursorGlow />
            <FloatingShapes />
            <div className='min-h-screen'>
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </ContentProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
