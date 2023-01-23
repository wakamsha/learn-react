export function debounce<T extends (...args: Record<string, unknown>[]) => unknown>(
  callback: T,
  delay = 0,
): (...args: Parameters<T>) => void {
  let timerId: number;

  return (...args) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => callback(...args), delay);
  };
}
