export function bandClass(band?: string) {
  if (band === 'Strong') return 'strong';
  if (band === 'Weak') return 'weak';
  return 'moderate';
}
