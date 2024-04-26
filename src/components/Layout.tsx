// components/Layout.tsx
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my Next.js app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 py-4">
        <nav className="container mx-auto flex items-center justify-between">
          <div>
            <a href="#" className="text-white text-xl font-bold">My Next.js App</a>
          </div>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white">Home</a></li>
            <li><a href="#" className="text-white">About</a></li>
            <li><a href="#" className="text-white">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        {children}
      </main>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-white">&copy; 2024 My Next.js App</p>
      </footer>
    </div>
  );
};

export default Layout;
