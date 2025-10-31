import { defineConfig } from 'cspell';

export default defineConfig({
  $schema: 'https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json',
  dictionaries: [
    'bash',
    'css',
    'en_US',
    'fonts',
    'filetypes',
    'html',
    'misc',
    'node',
    'npm',
    'softwareTerms',
    'typescript',
  ],
  ignorePaths: [
    '*.svg',
    './**/build/*',
    './**/dist/*',
    './apps/react-router-*/**/data.ts',
    './apps/catalog/src/constants/Stories.ts',
    './pnpm-lock.yaml',
  ],
  words: [
    // Music-related terms
    ...['beatle', 'bonham'],
    // OSS-related terms
    ...[
      'constate',
      'formkit',
      'isbot',
      'konva',
      'lefthook',
      'nodenv',
      'pixi',
      'pixijs',
      'reactrouter',
      'chartjs',
      'registerables',
      'oxlint',
      'tsgolint',
    ],
    // SVG-related terms
    ...['cdefs', 'cclip', 'crect', 'csvg', 'cpath', 'csvg'],
    // Font-related terms
    ...['cmaps'],
    // CSS-related terms
    ...['palt'],
    // DOM-related terms
    ...['closedby', 'pointerupoutside'],
    // Other terms
    ...['codegen', 'qiita', 'wakamsha'],
  ],
});
