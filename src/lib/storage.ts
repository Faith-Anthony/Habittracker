// Phase 2: Storage utilities with localStorage

export function saveToStorage(key: string, value: any): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
}

export function getFromStorage(key: string): any {
  try {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (error) {
    console.error("Error reading from storage:", error);
    return null;
  }
}

export function removeFromStorage(key: string): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Error removing from storage:", error);
  }
}

export function clearStorage(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}
