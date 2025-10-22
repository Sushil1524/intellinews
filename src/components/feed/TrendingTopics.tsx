import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { analyticsAPI } from "@/lib/api";

export const TrendingTopics = () => {
  const [categories, setCategories] = useState<Array<{ category: string; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTopCategories();
  }, []);

  const loadTopCategories = async () => {
    try {
      const data = await analyticsAPI.getTopCategories(5);
      setCategories(data);
    } catch (error) {
      console.error("Failed to load top categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No trending topics yet</p>
        ) : (
          categories.map((topic, index) => (
            <div
              key={index}
              className="w-full flex items-start justify-between p-2 rounded-md hover:bg-surface-variant/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{topic.category}</p>
                    <p className="text-xs text-muted-foreground">{topic.count} articles</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
