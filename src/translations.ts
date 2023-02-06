import { get, writable } from 'svelte/store';

export const culture = writable<string>();

export function t<Key extends keyof typeof defaultTranslations>(key: Key) {
  const c = get(culture);

  if (!c) {
    return defaultTranslations[key];
  }

  const translation: string =
    translations?.[c]?.[key] || defaultTranslations[key];

  return translation;
}

const defaultTranslations = {
  'Add to cart': 'Add to cart',
  'You might also be interested in these products':
    'You might also be interested in these products',
};

const translations: Record<string, Partial<typeof defaultTranslations>> = {
  'sv-SE': {
    'Add to cart': 'Lägg till i ordern',
    'You might also be interested in these products':
      'Du kanske också är intresserad av dessa produkter',
  },
};
