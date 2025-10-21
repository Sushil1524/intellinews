import { BookOpen, MessageSquare, Search, Target, Trophy, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Summaries",
    description: "AI-generated summaries let you grasp key points in seconds, saving hours of reading time.",
    color: "primary",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Sentiment Analysis",
    description: "Automatically detect article tone—positive, negative, or neutral—to understand perspective instantly.",
    color: "secondary",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Historical Summarizer",
    description: "Generate comprehensive summaries of how topics evolved over weeks or months.",
    color: "tertiary",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Mains Answer Practice",
    description: "Get AI-generated model answers in UPSC format to master essay-style responses.",
    color: "primary",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Editorial Analysis",
    description: "Learn critical thinking with argument breakdowns of major newspaper editorials.",
    color: "secondary",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Vocabulary Builder",
    description: "Tap difficult words while reading to build your personal vocabulary list.",
    color: "tertiary",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-surface-variant">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From passive reading to active learning—transform your news consumption with powerful AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-card p-8 shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-base hover:-translate-y-1"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${feature.color}/10 text-${feature.color} mb-4 group-hover:scale-110 transition-transform duration-base`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
