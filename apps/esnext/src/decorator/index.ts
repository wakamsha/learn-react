import { outputLog } from './Decorators';

function sleep(sec: number) {
  const start = Date.now();
  let now = Date.now();
  while (now - start <= sec * 1000) {
    now = Date.now();
  }
}

function delay(sec: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

// TypeScript のバージョンが上がったことで動作しなくなったため、無効化する。
// @classDecorator
class Example {
  constructor(private name: string) {}

  @outputLog
  public greet() {
    sleep(3);
    console.info(`hello, ${this.name}`);
  }

  @outputLog
  public async greetAsync() {
    await delay(3);
    console.info(`hello, ${this.name}`);
  }
}

/**
 * decorator のデモを実行する
 */
export function runDecorator() {
  new Example('world').greet();
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  new Example('async world').greetAsync();
}
