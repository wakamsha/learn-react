import { essentials, jsdoc, node, react, test, typescript } from '@wakamsha/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [essentials, jsdoc, node, react, typescript, test.essentials],
});
