'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [destination, setDestination] = useState('');

  const handleStartPlanning = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      router.push(`/dashboard?destination=${encodeURIComponent(destination.trim())}`);
    } else {
      router.push('/dashboard');
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Instant AI Itineraries',
      description: 'Get custom day-by-day schedules tailored specifically to your budget, travel style, and timeline in seconds.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'AI Travel Assistant Chat',
      description: 'Chat in real-time with an AI guide. Ask questions about spots, get weather info, or request adjustments on the fly.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Smart Budget Optimizer',
      description: 'Choose between budget, moderate, or luxury ranges. Our AI allocates daily spends and estimates activity fees.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: 'Interactive Travel Maps',
      description: 'Visualize your daily route and activities on integrated map views so you waste less time in transit.',
    },
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px] pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pulse-glow" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 text-sm font-semibold tracking-wide border border-teal-500/20">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Next-Gen AI Travel Assistant
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            Your Next Dream Journey,<br />
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-400 dark:from-teal-400 dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              Curated by Artificial Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop spending hours reading travel blogs and cross-referencing maps. Tell us your interests, and get a completely customized itinerary in seconds.
          </p>

          {/* Planning Form */}
          <form onSubmit={handleStartPlanning} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/20 dark:shadow-black/20">
            <div className="flex-grow flex items-center gap-2.5 px-3 py-2">
              <svg className="w-5 h-5 text-zinc-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="e.g., Tokyo, Paris, Bali, Grand Canyon..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent outline-none border-none text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 text-base"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all duration-200"
            >
              Start Planning
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-zinc-500">
            <span>Popular:</span>
            {['Tokyo 🌸', 'Paris 🗼', 'Iceland 🏔️', 'Rome 🏛️'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setDestination(city.split(' ')[0])}
                className="px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800 hover:border-teal-500/50 hover:bg-teal-50/20 dark:hover:bg-zinc-850 dark:hover:border-teal-400/50 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Itinerary Showcase Section */}
      <section className="bg-zinc-100/50 dark:bg-zinc-900/40 border-y border-zinc-200/50 dark:border-zinc-850/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Context Column */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Designed to make travel planning effortless
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                SmartTravel curates the perfect daily routes, balances your travel days so you do not get burned out, and groups activities geographically.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Curated Activities</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Handpicked local spots, culinary gems, and hidden views.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    ⏱️
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Optimized Scheduling</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Timings aligned with sunset times, operational hours, and commute times.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase Visual Card */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-3xl pointer-events-none" />
                
                {/* Header of planned trip */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-150 dark:border-zinc-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full">
                      Itinerary Preview
                    </span>
                    <h3 className="text-2xl font-bold mt-2">5-Day Adventure in Tokyo</h3>
                    <p className="text-xs text-zinc-400 mt-1">Budget: Moderate • Travel Style: Culture & Adventure</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>

                {/* Day-by-Day Activities */}
                <div className="space-y-6">
                  {/* Day Label */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                      D1
                    </div>
                    <span className="font-bold text-zinc-700 dark:text-zinc-200">Day 1: Modern Icons & Ancient Traditions</span>
                  </div>

                  {/* Day Timeline */}
                  <div className="pl-3.5 border-l-2 border-teal-600/30 space-y-6 ml-3.5">
                    {/* Item 1 */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-teal-500/20" />
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-medium text-zinc-400">09:00 AM - 11:30 AM</span>
                          <h5 className="font-bold text-base mt-0.5">Senso-ji Temple Exploration</h5>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Walk down Nakamise-dori and explore Tokyo oldest, most iconic Buddhist temple. Sample fresh melonpan.</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">Culture</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-teal-500/20" />
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-medium text-zinc-400">12:00 PM - 02:00 PM</span>
                          <h5 className="font-bold text-base mt-0.5">Lunch at Tsukiji Outer Market</h5>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Taste fresh seafood, tamagoyaki (sweet omelet), and premium matcha at local street vendors.</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Food</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-400 ring-4 ring-zinc-300/20 dark:ring-zinc-800" />
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-medium text-zinc-400">03:00 PM - 06:00 PM</span>
                          <h5 className="font-bold text-base mt-0.5 text-zinc-500 dark:text-zinc-400">Akihabara Electric Town</h5>
                          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5">Browse retro gaming stores, multi-level manga shops, and experience the neon heart of pop culture.</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">Sightsee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Plan smarter, travel better
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            A suite of AI tools working together to deliver a seamless journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* popular destination  */}
{/* Popular Destinations Section */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
  <div className="text-center max-w-2xl mx-auto mb-12">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
      Popular Destinations
    </h2>
    <p className="text-zinc-500 dark:text-zinc-400 mt-4">
      Discover trending places and let AI create your perfect travel plan.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        name: "Paris",
        country: "France 🇫🇷",
        description: "Romantic city with art, culture and iconic landmarks."
      },
      {
        name: "Tokyo",
        country: "Japan 🇯🇵",
        description: "Experience technology, food and traditional culture."
      },
      {
        name: "Bali",
        country: "Indonesia 🇮🇩",
        description: "Beautiful beaches, nature and relaxing adventures."
      },
      {
        name: "Rome",
        country: "Italy 🇮🇹",
        description: "Explore ancient history and amazing architecture."
      }
    ].map((place) => (
      <div
        key={place.name}
        className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-2xl mb-5">
          🌍
        </div>

        <h3 className="text-xl font-bold">
          {place.name}
        </h3>

        <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mt-1">
          {place.country}
        </p>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
          {place.description}
        </p>

        <button
          className="mt-5 text-sm font-semibold text-teal-600 hover:text-teal-500"
          onClick={() => {
            window.location.href = `/dashboard?destination=${place.name}`;
          }}
        >
          Plan Trip →
        </button>
      </div>
    ))}
  </div>
</section>
      {/* Call to Action Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative rounded-3xl bg-gradient-to-br from-teal-900 via-zinc-900 to-zinc-950 text-white p-8 sm:p-16 overflow-hidden border border-teal-800/50 shadow-2xl">
          {/* Blur background in CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

          <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to explore the world with your personal AI guide?
            </h2>
            <p className="text-teal-200/80 text-base sm:text-lg max-w-lg mx-auto">
              Sign up today and get access to unlimited AI travel planning, interactive tools, and chat assistant.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold rounded-xl shadow-lg active:scale-95 transition-all text-center"
              >
                Sign Up Free
              </Link>
              <Link
                href="/explore"
                className="px-8 py-4 bg-transparent border border-zinc-650 hover:bg-zinc-800 text-zinc-100 font-bold rounded-xl active:scale-95 transition-all text-center"
              >
                Browse Itineraries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
