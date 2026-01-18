const STORAGE_KEY = 'newsletter-survey-progress';

export interface SurveyProgress {
  currentStep: number;
  answers: Record<string, string>;
  completedAt?: string;
}

export function saveProgress(progress: SurveyProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

export function loadProgress(): SurveyProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as SurveyProgress;
  } catch (e) {
    console.warn('Failed to load progress:', e);
    return null;
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear progress:', e);
  }
}
