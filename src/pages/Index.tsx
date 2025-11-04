import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ArticleCard } from "@/components/feed/ArticleCard";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { FeedTabs } from "@/components/feed/FeedTabs";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { JoinCard } from "@/components/feed/JoinCard";
import { TrendingTopics } from "@/components/feed/TrendingTopics";
import { StudyToolsCard } from "@/components/feed/StudyToolsCard";
import { UserStatsCard } from "@/components/feed/UserStatsCard";
import { Button } from "@/components/ui/button";
import { Article, articlesAPI } from "@/lib/api";
import { RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    loadArticles();
  }, [selectedCategory]);
  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const response = await articlesAPI.getArticles({
        limit: 20,
        category: selectedCategory
      });
      setArticles(response.articles || []);
    } catch (error) {
      console.error("Failed to load articles:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section - only show when not authenticated */}
        {!isAuthenticated && showHero && <>
            <Hero />
            
          </>}

        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Feed Section */}
        <section className="py-6">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
              {/* Main Feed */}
              <div className="space-y-4">
                {/* Search and Tabs */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <FeedTabs selected={sortBy} onSelect={setSortBy} />
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 bg-surface border-border" />
                    </div>
                    <Button variant="outlined" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Filters */}
                <FeedFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

                {/* Articles */}
                {isLoading ? <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading articles...</p>
                  </div> : articles.length === 0 ? <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground mb-4">
                      No articles found. Make sure your backend is running at http://127.0.0.1:8000
                    </p>
                    <Button onClick={loadArticles} variant="filled">Try Again</Button>
                  </div> : articles.map(article => <ArticleCard key={article._id} article={article} onArticleClick={(article) => navigate(`/article/${article._id}`)} />)}
              </div>

              {/* Right Sidebar */}
              <aside className="space-y-4">
                {isAuthenticated ? (
                  <>
                    <UserStatsCard />
                    <TrendingTopics />
                    <StudyToolsCard />
                  </>
                ) : (
                  <>
                    <JoinCard />
                    <TrendingTopics />
                    <StudyToolsCard />
                  </>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Index;