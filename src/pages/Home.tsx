import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesPreview } from '../components/ServicesPreview';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { BlogPreview } from '../components/BlogPreview';
import { AboutSection } from '../components/AboutSection';
import { ContactCTA } from '../components/ContactCTA';

import { SEO } from '../components/SEO';

const Home = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Home" 
        description="Professional international developer portfolio and high-performance web engineering solutions by IMTIAZ CREATIVE." 
      />
      <Hero />
      <ServicesPreview />
      <FeaturedProjects />
      <BlogPreview />
      <AboutSection />
      <ContactCTA />
    </div>
  );
};

export default Home;

