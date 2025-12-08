import * as React from 'react';
import { Link } from 'react-router-dom';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Case Study</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/users"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Users
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-6 max-w-screen-2xl">
        {children}
      </main>
    </div>
  );
};

