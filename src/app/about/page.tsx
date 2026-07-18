import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">About SmartTravel</h1>
        <p className="text-zinc-550 dark:text-zinc-400 text-lg max-w-xl mx-auto">
          We combine modern web technologies with the power of generative AI to rewrite the rules of travel planning.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6 leading-relaxed text-zinc-650 dark:text-zinc-300">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Our Mission</h3>
        <p>
          Planning a trip should be just as exciting as taking it. However, the modern travel space is cluttered with sponsored blogs, fragmented maps, and complicated spreadsheets. SmartTravel was built to curate simple, personalized, and hyper-relevant day-to-day schedules in seconds.
        </p>
        
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-8">How it Works</h3>
        <p>
          Our application leverages Google Gemini AI. By passing your destination, duration, budget, and travel interests, our system constructs structured itineraries. You can then chat with your AI assistant to tweak recommendations, ask about local customs, or discover alternative restaurants.
        </p>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-8">Built on a Modern Stack</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Frontend:</strong> Next.js 16 (App Router), TypeScript, and Tailwind CSS.</li>
          <li><strong>Backend:</strong> Express.js running on Node.js.</li>
          <li><strong>Database:</strong> MongoDB via Mongoose.</li>
          <li><strong>AI Layer:</strong> Official Google Generative AI SDK (Gemini API).</li>
        </ul>
      </div>

      <div className="text-center pt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-md transition-all duration-200"
        >
          Plan a Trip Now
        </Link>
      </div>
    </div>
  );
}
