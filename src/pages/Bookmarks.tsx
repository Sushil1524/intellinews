import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BookmarkIcon } from "lucide-react";

export default function Bookmarks() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?tab=login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BookmarkIcon className="h-8 w-8" />
            Bookmarks
          </h1>
          <p className="text-muted-foreground mb-8">
            Your saved articles for later reading
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Saved Articles</CardTitle>
              <CardDescription>
                Articles you've bookmarked will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No bookmarks yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start bookmarking articles to build your reading list
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
