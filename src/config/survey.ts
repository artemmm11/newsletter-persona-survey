export type TraitKey = 'vision' | 'structure' | 'speed' | 'empathy';

export interface TraitScores {
  vision: number;
  structure: number;
  speed: number;
  empathy: number;
}

export interface Answer {
  id: string;
  text: string;
  scores: Partial<TraitScores>;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export interface Persona {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  strengths: string[];
  watchOuts: string[];
  nextSteps: string[];
  idealProfile: {
    vision: 'high' | 'medium' | 'low';
    structure: 'high' | 'medium' | 'low';
    speed: 'high' | 'medium' | 'low';
    empathy: 'high' | 'medium' | 'low';
  };
}

export interface AudienceSegment {
  id: string;
  name: string;
  traits: Partial<Record<TraitKey, 'high' | 'medium'>>;
  whatThisMeans: string[];
  whatToImprove: string[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    question: 'What best describes your decision style?',
    answers: [
      { id: 'q1a', text: 'I decide fast and iterate', scores: { speed: 3, vision: 1 } },
      { id: 'q1b', text: 'I collect evidence first', scores: { structure: 2, vision: 1 } },
      { id: 'q1c', text: 'I align people before deciding', scores: { empathy: 3, structure: 1 } },
      { id: 'q1d', text: 'I map the strategy then act', scores: { vision: 3, structure: 1 } },
    ],
  },
  {
    id: 'q2',
    question: 'When a project is unclear, you...',
    answers: [
      { id: 'q2a', text: 'Prototype a quick version', scores: { speed: 2, vision: 2 } },
      { id: 'q2b', text: 'Write a plan and milestones', scores: { structure: 3 } },
      { id: 'q2c', text: 'Talk to users/stakeholders', scores: { empathy: 2, vision: 1 } },
      { id: 'q2d', text: 'Research patterns and competitors', scores: { vision: 2, structure: 1 } },
    ],
  },
  {
    id: 'q3',
    question: 'Your default work mode is...',
    answers: [
      { id: 'q3a', text: 'Deep focus, minimal meetings', scores: { structure: 2 } },
      { id: 'q3b', text: 'Collaboration-heavy, energy from people', scores: { empathy: 3 } },
      { id: 'q3c', text: 'Short sprints and fast shipping', scores: { speed: 3 } },
      { id: 'q3d', text: 'Exploration and idea generation', scores: { vision: 3 } },
    ],
  },
  {
    id: 'q4',
    question: 'What stresses you most?',
    answers: [
      { id: 'q4a', text: 'Slow approvals and bureaucracy', scores: { speed: 2 } },
      { id: 'q4b', text: 'Chaos and lack of structure', scores: { structure: 3 } },
      { id: 'q4c', text: 'Conflict and misalignment', scores: { empathy: 3 } },
      { id: 'q4d', text: 'No room for creativity', scores: { vision: 3 } },
    ],
  },
  {
    id: 'q5',
    question: "If you had 2 hours to improve a process, you'd...",
    answers: [
      { id: 'q5a', text: 'Automate something immediately', scores: { speed: 2, structure: 1 } },
      { id: 'q5b', text: 'Redesign the system end-to-end', scores: { vision: 2, structure: 2 } },
      { id: 'q5c', text: 'Create a clear checklist/SOP', scores: { structure: 3 } },
      { id: 'q5d', text: 'Teach the team and align expectations', scores: { empathy: 3 } },
    ],
  },
  {
    id: 'q6',
    question: 'When you communicate, you prefer...',
    answers: [
      { id: 'q6a', text: 'Short and direct', scores: { speed: 2 } },
      { id: 'q6b', text: 'Structured docs and clarity', scores: { structure: 3 } },
      { id: 'q6c', text: 'Stories and examples', scores: { vision: 2, empathy: 1 } },
      { id: 'q6d', text: '1:1 or small groups', scores: { empathy: 2, structure: 1 } },
    ],
  },
  {
    id: 'q7',
    question: 'Your biggest strength is...',
    answers: [
      { id: 'q7a', text: 'Shipping and momentum', scores: { speed: 3 } },
      { id: 'q7b', text: 'Systems and reliability', scores: { structure: 3 } },
      { id: 'q7c', text: 'Creativity and strategy', scores: { vision: 3 } },
      { id: 'q7d', text: 'People, trust, and support', scores: { empathy: 3 } },
    ],
  },
];

export const personas: Persona[] = [
  {
    id: 'owl',
    name: 'The Owl',
    emoji: '🦉',
    tagline: 'Wisdom through structure',
    description: 'You see the full picture and build reliable systems. Your methodical approach ensures nothing falls through the cracks.',
    traits: ['Analytical', 'Organized', 'Strategic', 'Detail-oriented'],
    strengths: [
      'Creating sustainable processes that scale',
      'Spotting risks before they become problems',
      'Building documentation others actually use',
    ],
    watchOuts: [
      'Analysis paralysis can slow momentum',
      'May over-engineer simple solutions',
      'Risk of prioritizing process over people',
    ],
    nextSteps: [
      'Set "good enough" deadlines for decisions',
      'Schedule regular check-ins focused on relationships, not tasks',
      'Practice shipping MVPs before perfecting',
    ],
    idealProfile: { vision: 'medium', structure: 'high', speed: 'low', empathy: 'medium' },
  },
  {
    id: 'fox',
    name: 'The Fox',
    emoji: '🦊',
    tagline: 'Strategic and adaptive',
    description: 'You navigate complexity with creativity. Your ability to see patterns and pivot quickly makes you invaluable in uncertain environments.',
    traits: ['Creative', 'Adaptive', 'Strategic', 'Quick-thinking'],
    strengths: [
      'Finding unconventional solutions',
      'Adapting strategy when conditions change',
      'Connecting dots others miss',
    ],
    watchOuts: [
      'May jump to new ideas too quickly',
      'Can overwhelm teams with constant pivots',
      'Risk of under-investing in execution',
    ],
    nextSteps: [
      'Commit to seeing one initiative through before starting another',
      'Document your strategic thinking for others to follow',
      'Partner with execution-focused teammates',
    ],
    idealProfile: { vision: 'high', structure: 'medium', speed: 'medium', empathy: 'low' },
  },
  {
    id: 'dolphin',
    name: 'The Dolphin',
    emoji: '🐬',
    tagline: 'Connection drives results',
    description: 'You lead through relationships. Your emotional intelligence and collaborative spirit create environments where people do their best work.',
    traits: ['Empathetic', 'Collaborative', 'Supportive', 'Communicative'],
    strengths: [
      'Building trust across teams and stakeholders',
      'Navigating conflict with grace',
      'Creating psychological safety',
    ],
    watchOuts: [
      'May avoid necessary difficult conversations',
      'Can prioritize harmony over results',
      'Risk of taking on others\' emotional weight',
    ],
    nextSteps: [
      'Practice giving direct feedback with kindness',
      'Set boundaries on your availability',
      'Balance relationship-building with outcome focus',
    ],
    idealProfile: { vision: 'low', structure: 'medium', speed: 'medium', empathy: 'high' },
  },
  {
    id: 'lion',
    name: 'The Lion',
    emoji: '🦁',
    tagline: 'Bold vision, fast action',
    description: 'You lead from the front with conviction. Your combination of strategic thinking and bias for action inspires teams to achieve ambitious goals.',
    traits: ['Bold', 'Decisive', 'Visionary', 'Action-oriented'],
    strengths: [
      'Setting ambitious direction and rallying teams',
      'Making tough calls under pressure',
      'Turning vision into momentum',
    ],
    watchOuts: [
      'May move faster than the team can follow',
      'Can overlook details in pursuit of speed',
      'Risk of steamrolling quieter voices',
    ],
    nextSteps: [
      'Build in reflection time before major decisions',
      'Actively solicit dissenting opinions',
      'Delegate execution to trust your team more',
    ],
    idealProfile: { vision: 'high', structure: 'low', speed: 'high', empathy: 'low' },
  },
  {
    id: 'elephant',
    name: 'The Elephant',
    emoji: '🐘',
    tagline: 'Steady strength, deep care',
    description: 'You combine reliability with genuine care for people. Your memory for context and commitment to relationships creates lasting organizational strength.',
    traits: ['Reliable', 'Caring', 'Patient', 'Thorough'],
    strengths: [
      'Building lasting systems and relationships',
      'Remembering context others forget',
      'Supporting team members through challenges',
    ],
    watchOuts: [
      'May resist change even when needed',
      'Can be slow to adapt to new situations',
      'Risk of holding onto past grievances',
    ],
    nextSteps: [
      'Experiment with one new approach each quarter',
      'Practice letting go of "how we\'ve always done it"',
      'Balance care for others with self-care',
    ],
    idealProfile: { vision: 'low', structure: 'high', speed: 'low', empathy: 'high' },
  },
  {
    id: 'hawk',
    name: 'The Hawk',
    emoji: '🦅',
    tagline: 'Precision at speed',
    description: 'You spot opportunities from a mile away and strike decisively. Your sharp focus and speed make you exceptional at capturing high-value targets.',
    traits: ['Focused', 'Swift', 'Perceptive', 'Decisive'],
    strengths: [
      'Identifying and seizing opportunities quickly',
      'Cutting through noise to find signal',
      'Executing with precision under pressure',
    ],
    watchOuts: [
      'May miss the human element in decisions',
      'Can be perceived as cold or detached',
      'Risk of tunnel vision on targets',
    ],
    nextSteps: [
      'Schedule regular 1:1s focused on relationship, not tasks',
      'Practice asking "who might this affect?" before acting',
      'Build in deliberate pause before major moves',
    ],
    idealProfile: { vision: 'high', structure: 'medium', speed: 'high', empathy: 'low' },
  },
  {
    id: 'beaver',
    name: 'The Beaver',
    emoji: '🦫',
    tagline: 'Build it right, build it fast',
    description: 'You combine craftsmanship with efficiency. Your ability to create quality work at speed makes you the backbone of any high-performing team.',
    traits: ['Industrious', 'Efficient', 'Practical', 'Reliable'],
    strengths: [
      'Shipping quality work consistently',
      'Optimizing processes for efficiency',
      'Building infrastructure others depend on',
    ],
    watchOuts: [
      'May prioritize doing over thinking strategically',
      'Can get lost in the work without stepping back',
      'Risk of burnout from constant productivity',
    ],
    nextSteps: [
      'Block time weekly for strategic thinking',
      'Say no to projects that don\'t align with priorities',
      'Celebrate completion, not just progress',
    ],
    idealProfile: { vision: 'low', structure: 'high', speed: 'high', empathy: 'low' },
  },
  {
    id: 'octopus',
    name: 'The Octopus',
    emoji: '🐙',
    tagline: 'Creative connection',
    description: 'You bring ideas and people together in unexpected ways. Your combination of vision and empathy creates innovative solutions that actually get adopted.',
    traits: ['Versatile', 'Creative', 'Empathetic', 'Integrative'],
    strengths: [
      'Bridging creative ideas with human needs',
      'Managing multiple initiatives simultaneously',
      'Building coalitions around new concepts',
    ],
    watchOuts: [
      'May spread attention too thin',
      'Can struggle with follow-through on individual threads',
      'Risk of complexity overwhelming simplicity',
    ],
    nextSteps: [
      'Ruthlessly prioritize your top 3 initiatives',
      'Find an execution partner for each major project',
      'Practice saying "not now" to good ideas',
    ],
    idealProfile: { vision: 'high', structure: 'low', speed: 'low', empathy: 'high' },
  },
];

export const audienceSegments: AudienceSegment[] = [
  {
    id: 'strategic-builder',
    name: 'Strategic Builder',
    traits: { vision: 'high', structure: 'high' },
    whatThisMeans: [
      'You think long-term and build systems to match',
      'Others look to you for direction and reliability',
      'You excel at turning strategy into sustainable processes',
    ],
    whatToImprove: [
      'Move faster on decisions with incomplete information',
      'Build in more flexibility for changing conditions',
    ],
  },
  {
    id: 'fast-mover',
    name: 'Fast Mover',
    traits: { speed: 'high', vision: 'medium' },
    whatThisMeans: [
      'You bias toward action and learn by doing',
      'Teams rely on you to break through blockers',
      'You create momentum when others get stuck in planning',
    ],
    whatToImprove: [
      'Pause occasionally to validate direction',
      'Document learnings so the team can keep up',
    ],
  },
  {
    id: 'people-first-operator',
    name: 'People-First Operator',
    traits: { empathy: 'high', structure: 'medium' },
    whatThisMeans: [
      'You lead through relationships and trust',
      'Others feel heard and supported around you',
      'You build teams that stick together through challenges',
    ],
    whatToImprove: [
      'Balance care with accountability',
      'Practice delivering hard feedback directly',
    ],
  },
  {
    id: 'creative-catalyst',
    name: 'Creative Catalyst',
    traits: { vision: 'high', empathy: 'medium' },
    whatThisMeans: [
      'You generate ideas that inspire action',
      'Others look to you for creative direction',
      'You connect concepts in ways others don\'t see',
    ],
    whatToImprove: [
      'Partner with executers to ship your ideas',
      'Commit to fewer initiatives with deeper focus',
    ],
  },
  {
    id: 'reliable-executor',
    name: 'Reliable Executor',
    traits: { structure: 'high', speed: 'medium' },
    whatThisMeans: [
      'You deliver consistently and build trust through reliability',
      'Teams depend on your follow-through',
      'You turn plans into reality efficiently',
    ],
    whatToImprove: [
      'Step back to question if you\'re building the right thing',
      'Make time for strategic thinking, not just doing',
    ],
  },
  {
    id: 'balanced-leader',
    name: 'Balanced Leader',
    traits: {},
    whatThisMeans: [
      'You bring a well-rounded approach to challenges',
      'You adapt your style to what situations require',
      'You can connect with diverse working styles',
    ],
    whatToImprove: [
      'Consider developing a signature strength',
      'Lean into situations that play to your natural tendencies',
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
