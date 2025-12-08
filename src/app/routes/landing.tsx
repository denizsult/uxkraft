import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const LandingRoute = () => {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Case Study
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Built with React + Vite + TypeScript using Bulletproof React architecture
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/users">
            <Button size="lg">View Users</Button>
          </Link>
          <Button variant="outline" size="lg">
            Documentation
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">TanStack Query</CardTitle>
              <CardDescription>
                Powerful data fetching and caching
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">TanStack Table</CardTitle>
              <CardDescription>
                Headless UI for building tables
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tailwind CSS</CardTitle>
              <CardDescription>
                Utility-first CSS framework
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

