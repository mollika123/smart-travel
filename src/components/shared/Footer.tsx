import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'AI Trip Planner', href: '/' },
        { name: 'AI Chat Assistant', href: '/chat' },
        { name: 'Destinations', href: '/explore' },
        { name: 'Pricing Plans', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '#' },
        { name: 'Press & Media', href: '#' },
        { name: 'Contact Support', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookie Settings', href: '#' },
        { name: 'Security Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200/60 dark:bg-zinc-950 dark:border-zinc-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Logo & Brand Pitch */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5A2.1 2.1 0 1 0 16.5 4L13 7.5 4.8 5.8a1 1 0 0 0-1.2 1.2L9 11.5l-3.3 3.3-2.2-.4a1 1 0 0 0-1.1.5l-.6 1.1a.5.5 0 0 0 .5.7l2.8.6.6 2.8a.5.5 0 0 0 .7.5l1.1-.6a1 1 0 0 0 .5-1.1l-.4-2.2 3.3-3.3 4.5 5.4a1 1 0 0 0 1.2-.2Z" />
              </svg>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                SmartTravel
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed">
              Plan your next dream adventure in seconds. Our state-of-the-art AI curates custom daily itineraries, schedules activities, and chats with you to solve your travel dilemmas.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-200/50 hover:bg-teal-500 hover:text-white dark:bg-zinc-900/50 dark:hover:bg-teal-500 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-200/50 hover:bg-teal-500 hover:text-white dark:bg-zinc-900/50 dark:hover:bg-teal-500 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 18.41" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-zinc-200/50 hover:bg-teal-500 hover:text-white dark:bg-zinc-900/50 dark:hover:bg-teal-500 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-zinc-950 dark:text-zinc-50 font-bold text-sm tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-900/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-xs text-center md:text-left">
            &copy; {currentYear} SmartTravel Inc. All rights reserved. Made with ❤️ by Deepmind Antigravity.
          </p>
          <div className="flex gap-6 text-xs text-zinc-400">
            <a href="#" className="hover:text-teal-500 transition-colors">Cookies</a>
            <a href="#" className="hover:text-teal-500 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
