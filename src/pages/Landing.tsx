
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">LeadFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Manage your leads visually with
                  <span className="text-primary"> LeadFlow</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  A streamlined CRM where you can track, organize, and prioritize your leads with an intuitive drag-and-drop interface.
                </p>
                <div className="flex gap-4">
                  <Link to={user ? "/dashboard" : "/register"}>
                    <Button size="lg">
                      {user ? 'Go to Dashboard' : 'Get Started'}
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="bg-primary/10 rounded-lg p-8 border border-primary/20">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-card rounded shadow-sm p-3 border">
                        <div className="h-4 w-2/3 bg-primary/20 rounded mb-2"></div>
                        <div className="h-3 w-full bg-muted rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-muted rounded"></div>
                      </div>
                      <div className="bg-card rounded shadow-sm p-3 border">
                        <div className="h-4 w-2/3 bg-secondary/20 rounded mb-2"></div>
                        <div className="h-3 w-full bg-muted rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-muted rounded"></div>
                      </div>
                      <div className="bg-card rounded shadow-sm p-3 border">
                        <div className="h-4 w-2/3 bg-accent/20 rounded mb-2"></div>
                        <div className="h-3 w-full bg-muted rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 text-primary p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                      <line x1="6" x2="6" y1="2" y2="4" />
                      <line x1="10" x2="10" y1="2" y2="4" />
                      <line x1="14" x2="14" y1="2" y2="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visual Board</h3>
                  <p className="text-muted-foreground">
                    Manage your leads visually with an intuitive Kanban-style board. Drag and drop to update status and priority.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-secondary/10 text-secondary p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lead Tracking</h3>
                  <p className="text-muted-foreground">
                    Keep track of all your leads in one place. View detailed information and update status as deals progress.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-accent/10 text-accent p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <path d="M3 10h18" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Priority Management</h3>
                  <p className="text-muted-foreground">
                    Easily prioritize your leads with color-coded labels and filters to focus on the most important deals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© 2023 LeadFlow CRM. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
