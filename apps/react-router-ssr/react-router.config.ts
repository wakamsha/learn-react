import { type Config } from '@react-router/dev/config';

export default {
  ssr: true,
  appDirectory: 'app',
  prerender: ['/about'],
} satisfies Config;
