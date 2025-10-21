import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-surface -z-10" />
      <div className="absolute inset-0 bg-gradient-primary opacity-5 -z-10" />
      
      <div className="container relative">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-20 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 text-sm font-medium text-primary-on-container shadow-elevation-1 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered News Aggregation</span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            Stay Informed,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Learn Smarter
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
            The intelligent news platform designed for UPSC aspirants. Get AI-powered summaries, 
            sentiment analysis, and advanced study tools all in one place.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button variant="filled" size="lg" asChild className="shadow-elevation-3">
              <Link to="/auth?tab=register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outlined" size="lg" asChild>
              <Link to="/feed">
                Explore Feed
              </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16">
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title="AI Summaries"
              description="Get concise, intelligent summaries of every article"
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Sentiment Analysis"
              description="Understand the tone and bias at a glance"
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Study Tools"
              description="Mains answer practice, vocab builder, and more"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-base">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </div>
  );
};
