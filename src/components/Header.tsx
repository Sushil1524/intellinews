import { Button } from "@/components/ui/button";
import { BookmarkIcon, MenuIcon, Newspaper, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Newspaper className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            NewsFlow
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Feed
          </Link>
          <Link to="/editorials" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Editorials
          </Link>
          <Link to="/study-tools" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Study Tools
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/bookmarks">
                  <BookmarkIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outlined" size="sm" onClick={handleLogout} className="hidden md:inline-flex gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" size="sm" asChild className="hidden md:inline-flex">
                <Link to="/auth?tab=login">Login</Link>
              </Button>
              <Button variant="filled" size="sm" asChild className="hidden md:inline-flex">
                <Link to="/auth?tab=register">Get Started</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
