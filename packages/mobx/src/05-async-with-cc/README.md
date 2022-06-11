# 05 Async with Class Component

クラスコンポーネントと MobX のデコレータを組み合わせたサンプル。

Legacy Decorator を Vite で適切に処理するには `vite-config` を以下のように記述する必要がある。

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
```

しかし MobX v6.6.0 だと React18 に対応しきれていないのか、React コンポーネントが正しく observe してくれない[^1]。 `createRoot` でなく従来の `render` でも同様。

[^1]: Class Component だけでなく Functional Component でも observe してくれない。
