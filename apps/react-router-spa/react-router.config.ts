import { type Config } from '@react-router/dev/config';

export default {
  ssr: false,
  appDirectory: 'src',
  prerender: ['/about'],
} satisfies Config;
