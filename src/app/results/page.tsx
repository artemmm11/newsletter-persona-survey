'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { RotateCcw, Copy, Link2, Check, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import { Persona, TraitScores, TraitKey } from '@/config/survey';
import { decodeResultsFromUrl, getTraitLevels, determineAudienceSegment } from '@/lib/scoring';
import { clearProgress } from '@/lib/storage';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [traits, setTraits] = useState<TraitScores | null>(null);
  const [copied, setCopied] = useState<'result' | 'link' | null>(null);

  useEffect(() => {
    const { persona: p, traits: t } = decodeResultsFromUrl(searchParams);
    if (p && t) {
      setPersona(p);
      setTraits(t);
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const handleRestart = () => {
    clearProgress();
    router.push('/');
  };

  const handleCopyResult = async () => {
    if (!persona || !traits) return;
    const segment = determineAudienceSegment(traits);
    const text = `My Work Persona: ${persona.emoji} ${persona.name}\n"${persona.tagline}"\n\nSegment: ${segment.name}\n\nKey Traits: ${persona.traits.join(', ')}\n\nTake the survey: ${window.location.origin}`;
    
    await navigator.clipboard.writeText(text);
    setCopied('result');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied('link');
    setTimeout(() => setCopied(null), 2000);
  };

  if (!persona || !traits) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  }

  const traitLevels = getTraitLevels(traits);
  const segment = determineAudienceSegment(traits);

  const traitLabels: Record<TraitKey, string> = {
    vision: 'Vision',
    structure: 'Structure',
    speed: 'Speed',
    empathy: 'Empathy',
  };

  const levelColors: Record<string, string> = {
    high: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-slate-100 text-slate-600',
  };

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Persona Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-7xl md:text-8xl mb-4">{persona.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            You are {persona.name}
          </h1>
          <p className="text-xl text-slate-600 italic">"{persona.tagline}"</p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-6"
        >
          <p className="text-lg text-slate-700 leading-relaxed">{persona.description}</p>
        </motion.div>

        {/* Trait Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Trait Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(traitLevels) as TraitKey[]).map((trait) => (
              <div key={trait} className="text-center">
                <div className="text-sm text-slate-500 mb-1">{traitLabels[trait]}</div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    levelColors[traitLevels[trait]]
                  }`}
                >
                  {traitLevels[trait]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Traits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Key Traits</h2>
          <div className="flex flex-wrap gap-2">
            {persona.traits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Strengths, Watch-outs, Next Steps */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {persona.strengths.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-slate-900">Watch-outs</h3>
            </div>
            <ul className="space-y-2">
              {persona.watchOuts.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-amber-500 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Next Steps</h3>
            </div>
            <ul className="space-y-2">
              {persona.nextSteps.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-blue-500 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Audience Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-indigo-100 mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Audience Analysis</h2>
          <p className="text-2xl font-bold text-indigo-700 mb-4">{segment.name}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">What this means</h4>
              <ul className="space-y-1.5">
                {segment.whatThisMeans.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-indigo-500 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">What to improve</h4>
              <ul className="space-y-1.5">
                {segment.whatToImprove.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-indigo-500 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>

          <button
            onClick={handleCopyResult}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            {copied === 'result' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy result
              </>
            )}
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-lg transition-all active:scale-[0.98]"
          >
            {copied === 'link' ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                Copy share link
              </>
            )}
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
