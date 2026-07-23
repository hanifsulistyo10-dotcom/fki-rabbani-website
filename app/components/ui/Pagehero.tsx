import React from "react";
import Container from "./Container";
import Badge from "./Badge";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
}

export default function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <div className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white py-20 lg:py-28 relative overflow-hidden">
      <Container className="relative z-10 text-center">
        {badge && (
          <div className="flex justify-center mb-4">
            <Badge variant="amber">{badge}</Badge>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </Container>
    </div>
  );
}