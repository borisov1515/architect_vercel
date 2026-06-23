import type { OptionId } from '@/types';

export function shuffle<T>(arr: T[], seed?: number): T[] {
  const out = [...arr];
  let s = seed ?? Date.now();
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const DISPLAY_KEYS = ['A', 'B', 'C', 'D', 'E'] as const;

export function shuffleOptions<T extends { id: OptionId; text: string }>(
  options: T[],
  seed?: number,
) {
  const shuffled = shuffle(options, seed);
  return shuffled.map((opt, i) => ({
    displayKey: DISPLAY_KEYS[i],
    originalId: opt.id,
    text: opt.text,
  }));
}

export function mapDisplayToOriginal(
  displayKeys: string[],
  optionMap: { displayKey: string; originalId: OptionId }[],
): OptionId[] {
  return displayKeys.map((dk) => {
    const found = optionMap.find((o) => o.displayKey === dk);
    if (!found) throw new Error(`Unknown display key ${dk}`);
    return found.originalId;
  });
}
