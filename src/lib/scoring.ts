import { TraitScores, TraitKey, Persona, AudienceSegment, personas, audienceSegments } from '@/config/survey';

export function calculateTraits(answers: Record<string, string>, questions: { id: string; answers: { id: string; scores: Partial<TraitScores> }[] }[]): TraitScores {
  const traits: TraitScores = { vision: 0, structure: 0, speed: 0, empathy: 0 };

  for (const question of questions) {
    const selectedAnswerId = answers[question.id];
    if (!selectedAnswerId) continue;

    const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
    if (!selectedAnswer) continue;

    for (const [trait, score] of Object.entries(selectedAnswer.scores)) {
      traits[trait as TraitKey] += score as number;
    }
  }

  return traits;
}

export function getTraitLevel(score: number, maxPossible: number): 'high' | 'medium' | 'low' {
  const ratio = score / maxPossible;
  if (ratio >= 0.6) return 'high';
  if (ratio >= 0.35) return 'medium';
  return 'low';
}

export function getTraitLevels(traits: TraitScores): Record<TraitKey, 'high' | 'medium' | 'low'> {
  const maxPossible = 21;
  return {
    vision: getTraitLevel(traits.vision, maxPossible),
    structure: getTraitLevel(traits.structure, maxPossible),
    speed: getTraitLevel(traits.speed, maxPossible),
    empathy: getTraitLevel(traits.empathy, maxPossible),
  };
}

function profileMatchScore(traits: TraitScores, persona: Persona): number {
  const levels = getTraitLevels(traits);
  let score = 0;

  for (const [trait, idealLevel] of Object.entries(persona.idealProfile)) {
    const actualLevel = levels[trait as TraitKey];
    if (actualLevel === idealLevel) {
      score += 3;
    } else if (
      (actualLevel === 'high' && idealLevel === 'medium') ||
      (actualLevel === 'medium' && idealLevel === 'high') ||
      (actualLevel === 'medium' && idealLevel === 'low') ||
      (actualLevel === 'low' && idealLevel === 'medium')
    ) {
      score += 1;
    }
  }

  return score;
}

export function determinePersona(traits: TraitScores): Persona {
  let bestMatch: Persona = personas[0];
  let bestScore = -1;

  for (const persona of personas) {
    const matchScore = profileMatchScore(traits, persona);

    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestMatch = persona;
    } else if (matchScore === bestScore) {
      if (traits.vision > traits.structure) {
        const visionPersonas = ['fox', 'lion', 'hawk', 'octopus'];
        if (visionPersonas.includes(persona.id)) {
          bestMatch = persona;
        }
      } else {
        const structurePersonas = ['owl', 'elephant', 'beaver'];
        if (structurePersonas.includes(persona.id)) {
          bestMatch = persona;
        }
      }
    }
  }

  return bestMatch;
}

export function determineAudienceSegment(traits: TraitScores): AudienceSegment {
  const levels = getTraitLevels(traits);

  for (const segment of audienceSegments) {
    if (Object.keys(segment.traits).length === 0) continue;

    let matches = true;
    for (const [trait, requiredLevel] of Object.entries(segment.traits)) {
      if (levels[trait as TraitKey] !== requiredLevel) {
        matches = false;
        break;
      }
    }

    if (matches) {
      return segment;
    }
  }

  return audienceSegments.find(s => s.id === 'balanced-leader') || audienceSegments[audienceSegments.length - 1];
}

export function encodeResultsToUrl(persona: Persona, traits: TraitScores): string {
  const params = new URLSearchParams({
    p: persona.id,
    v: traits.vision.toString(),
    st: traits.structure.toString(),
    sp: traits.speed.toString(),
    e: traits.empathy.toString(),
  });
  return `/results?${params.toString()}`;
}

export function decodeResultsFromUrl(searchParams: URLSearchParams): { persona: Persona | null; traits: TraitScores | null } {
  const personaId = searchParams.get('p');
  const vision = searchParams.get('v');
  const structure = searchParams.get('st');
  const speed = searchParams.get('sp');
  const empathy = searchParams.get('e');

  if (!personaId || !vision || !structure || !speed || !empathy) {
    return { persona: null, traits: null };
  }

  const persona = personas.find(p => p.id === personaId) || null;
  const traits: TraitScores = {
    vision: parseInt(vision, 10) || 0,
    structure: parseInt(structure, 10) || 0,
    speed: parseInt(speed, 10) || 0,
    empathy: parseInt(empathy, 10) || 0,
  };

  return { persona, traits };
}
