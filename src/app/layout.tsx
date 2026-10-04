import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/scroll';

const interTight = localFont({
  src: '../fonts/InterTight-Variable.woff2',
  variable: '--font-inter-tight',
  display: 'swap',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shakti Pad Mahato — Data Science and Analyst',
  description:
    '2nd-year B.Tech student at ITER, SOA University specializing in Data Science. Proficient in Python, MySQL, Power BI, and statistical data modeling.',
  metadataBase: new URL('https://shaktimahato.dev'),
  openGraph: {
    title: 'Shakti Pad Mahato — Data Science and Analyst',
    description:
      'Personal portfolio of Shakti Pad Mahato, Data Science & Analyst specializing in Python, MySQL, Power BI, and academic 5G research.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Shakti Pad Mahato — Data Science and Analyst',
      },
    ],
  },
  icons: {
    icon: '/portrait-bust.webp',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased selection:bg-neutral-900 selection:text-neutral-50 bg-[#f4f2ee] text-[#0d0d0d]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
