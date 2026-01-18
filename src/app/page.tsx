'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Clock, Target } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            7-Step Survey
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
          Discover Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Work Persona
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
          Answer 7 quick questions to uncover your unique working style and get personalized insights for growth.
        </p>

        <button
          onClick={() => router.push('/survey')}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Start the Survey
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Personalized results</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </main>
  );
}
