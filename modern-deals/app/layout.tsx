import Link from 'next/link';
import './styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <h1>Modern Deals</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/listings">Listings</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
