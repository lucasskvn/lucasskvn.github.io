export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`intervalle:${key}`);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function saveStored(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(`intervalle:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
