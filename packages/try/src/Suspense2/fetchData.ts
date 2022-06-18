export async function fetchData(): Promise<string> {
  await sleep(Math.random() * 3000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });
}
