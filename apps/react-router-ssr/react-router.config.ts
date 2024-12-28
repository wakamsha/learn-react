import { type Config } from '@react-router/dev/config';

export default {
  ssr: true,
  appDirectory: 'src',
  prerender: ['/about'],
} satisfies Config;
