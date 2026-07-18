'use client';

import React, { use, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Trip, Message } from '@/types/trip';
import ChatBox from '@/components/ai/ChatBox';

function ChatContent() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId');
  
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Load trip context and initialize messages
  useEffect(() => {
    let initialGreeting = "Hello! I am your personal AI Travel Assistant. Ask me anything about destinations, travel tips, local foods, packing, or flight planning!";
    
    if (tripId) {
      const storedTrips = localStorage.getItem('trips');
      if (storedTrips) {
        try {
          const tripsList: Trip[] = JSON.parse(storedTrips);
          const currentTrip = tripsList.find((t) => t.id === tripId);
          if (currentTrip) {
            setActiveTrip(currentTrip);
            initialGreeting = `Hi there! I see you are planning a trip to ${currentTrip.destination} (${travelStyleLabel(currentTrip.travelStyle)} style). How can I help you customize your itinerary, find local spots, or prepare for your departure?`;
          }
        } catch (e) {
          console.error('Error loading trip context for chat:', e);
        }
      }
    }

    setMessages([
      {
        id: 'msg_welcome',
        sender: 'ai',
        text: initialGreeting,
        timestamp: new Date().toISOString()
      }
    ]);
  }, [tripId]);

  const travelStyleLabel = (style: string) => {
    const labels: Record<string, string> = {
      adventure: 'Adventure 🧗‍♂️',
      relaxation: 'Relaxation 🌴',
      culture: 'Cultural 🏛️',
      family: 'Family 👨',
      romantic: 'Romantic 💖',
      nature: 'Nature 🌲'
    };
    return labels[style] || style;
  };

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message
    const userMessage: Message = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // 2. Set Typing state
    setIsAiTyping(true);

    // 3. Simulate response with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let aiResponseText = `That is a great question! For a trip to ${activeTrip ? activeTrip.destination : 'your destination'}, I recommend exploring local neighborhoods and tasting native dishes. Let me know if you would like me to add specific activities to your itinerary!`;

    // Smart keywords matching for mock responses
    const lowerText = text.toLowerCase();
    if (lowerText.includes('restaurant') || lowerText.includes('eat') || lowerText.includes('food')) {
      aiResponseText = `Here are some highly recommended dining spots in ${activeTrip ? activeTrip.destination : 'the area'}:\n1. Local street markets for authentic flavors.\n2. A mid-range family tavern known for traditional recipes.\n3. A panoramic rooftop restaurant for fine dining with scenic views.`;
    } else if (lowerText.includes('pack') || lowerText.includes('bring') || lowerText.includes('wear')) {
      aiResponseText = `Based on your style, here is a quick packing checklist:\n- Comfortable walking shoes (crucial for sight-seeing!)\n- A light waterproof layer in case of sudden rain.\n- Relevant outlet adapters and portable power banks.\n- Dress codes matching local cultures (e.g. temples or churches).`;
    } else if (lowerText.includes('weather') || lowerText.includes('climate') || lowerText.includes('rain')) {
      aiResponseText = `Typically, seasonal weather varies, but packing light breathable layers is always a safe bet. I suggest checking the local forecast 48 hours prior to departure for precision.`;
    } else if (lowerText.includes('change') || lowerText.includes('add') || lowerText.includes('remove')) {
      aiResponseText = `Sure! I can help you adjust your itinerary. Once our backend database is fully connected, I'll be able to dynamically write these changes directly into your Day Plan. For now, we can chat about the modifications!`;
    }

    const aiMessage: Message = {
      id: `msg_ai_${Date.now()}`,
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsAiTyping(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col lg:flex-row gap-8 items-stretch h-[calc(100vh-64px-100px)] min-h-[650px]">
      
      {/* Left Sidebar showing active Trip details if exists */}
      <div className="lg:w-1/4 flex flex-col gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span>💬</span> Active Context
          </h3>
          
          {activeTrip ? (
            <div className="space-y-4">
              <div className="p-4 bg-teal-500/5 dark:bg-teal-950/15 border border-teal-500/10 rounded-2xl">
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Current Trip Context</span>
                <h4 className="font-bold text-base text-zinc-850 dark:text-zinc-200 mt-1">{activeTrip.title}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Destination: {activeTrip.destination}</p>
              </div>
              <p className="text-xs text-zinc-400 leading-normal">
                Your messages will be interpreted in the context of this trip. You can ask for recommendations for specific days.
              </p>
              <Link 
                href={`/trip/${activeTrip.id}`}
                className="w-full text-center block px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-350 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
              >
                View Full Itinerary
              </Link>
            </div>
          ) : (
            <div className="space-y-3 py-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                You are currently in General Chat mode. Feel free to ask generic questions or create a trip to enable contextual AI assistance.
              </p>
              <Link
                href="/dashboard"
                className="w-full text-center block px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-xs font-bold text-white rounded-xl shadow-sm transition-all"
              >
                Go to Dashboard 🪄
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: ChatBox */}
      <div className="lg:w-3/4 flex flex-col">
        <ChatBox
          messages={messages}
          onSendMessage={handleSendMessage}
          isAiTyping={isAiTyping}
        />
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex-grow flex items-center justify-center py-32">
        <div className="w-12 h-12 rounded-full border-4 border-teal-500/10 border-t-teal-600 animate-spin" />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
