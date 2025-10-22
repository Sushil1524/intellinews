import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const mockTrendingTopics = [
  { title: "Economic Growth", articles: 1247, change: "+12%" },
  { title: "Climate Summit", articles: 892, change: "+8%" },
  { title: "Digital India", articles: 567, change: "+15%" },
  { title: "UPSC 2024", articles: 445, change: "+22%" },
  { title: "AI Policy", articles: 334, change: "+5%" },
];

export const TrendingTopics = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTrendingTopics.map((topic, index) => (
          <button
            key={index}
            className="w-full flex items-start justify-between text-left hover:bg-surface-variant/50 p-2 rounded-md transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{index + 1}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.articles} articles</p>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium text-primary">{topic.change}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
