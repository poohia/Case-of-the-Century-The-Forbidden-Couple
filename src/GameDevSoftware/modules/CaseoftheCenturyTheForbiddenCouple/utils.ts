export function limiteArray<T = any>(arr: T[], max: number) {
  return arr.slice(0, max);
}

export function shuffleArray<T = any>(array: T[]): T[] {
  const result = [...array]; // copie pour ne pas modifier l'original
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // index aléatoire
    [result[i], result[j]] = [result[j], result[i]]; // swap
  }
  return result;
}
