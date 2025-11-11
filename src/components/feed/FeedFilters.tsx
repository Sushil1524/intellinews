import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const categories = [
  "Technology",
  "Politics",
  "Business",
  "Health",
  "Sports",
  "Entertainment",
  "Science",
  "Crime",
  "Education",
  "Environment",
  "Travel",
  "Lifestyle",
  "Obituary",
  "General",
];

type Props = {
  selectedCategory?: string;
  onCategoryChange: (category?: string) => void;
};

export const FeedFilters = ({ selectedCategory, onCategoryChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filter by Category</h3>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(undefined)}
            className="h-8 gap-1 text-xs"
          >
            Clear
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => onCategoryChange(category === selectedCategory ? undefined : category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};
