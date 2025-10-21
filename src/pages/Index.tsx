import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ArticleCard } from "@/components/feed/ArticleCard";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { ArticleDialog } from "@/components/feed/ArticleDialog";
import { Button } from "@/components/ui/button";
import { Article, articlesAPI } from "@/lib/api";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    loadArticles();
  }, [selectedCategory]);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const response = await articlesAPI.getArticles({
        limit: 20,
        category: selectedCategory,
      });
      setArticles(response.articles || []);
    } catch (error) {
      console.error("Failed to load articles:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - only show when not authenticated */}
        {!isAuthenticated && showHero && (
          <>
            <Hero />
            <Features />
            <div className="py-12 bg-gradient-surface">
              <div className="container">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Latest News</h2>
                  <p className="text-muted-foreground">
                    Curated articles from top sources
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Feed Section */}
        <section className="py-8 bg-surface-variant">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                <div className="sticky top-20 space-y-6">
                  <FeedFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                  <Button
                    variant="outlined"
                    className="w-full gap-2"
                    onClick={loadArticles}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh Feed
                  </Button>
                </div>
              </aside>

              {/* Articles Feed */}
              <div className="lg:col-span-3 space-y-4">
                {isLoading ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading articles...</p>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-xl shadow-elevation-1">
                    <p className="text-muted-foreground mb-4">
                      No articles found. Make sure your backend is running at http://127.0.0.1:8000
                    </p>
                    <Button onClick={loadArticles}>Try Again</Button>
                  </div>
                ) : (
                  articles.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      onArticleClick={setSelectedArticle}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Article Detail Dialog */}
      <ArticleDialog
        article={selectedArticle}
        open={!!selectedArticle}
        onOpenChange={(open) => !open && setSelectedArticle(null)}
      />
    </div>
  );
};

export default Index;
