import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import './globals.css';
import Provider from './Provider';

export const metadata: Metadata = {
  title: 'Media Scrapper',
  description: 'Scrape media from the internet',
};

const global_font = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={global_font.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
