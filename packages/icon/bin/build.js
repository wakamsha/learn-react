// @ts-check
import { load } from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import { optimize } from 'svgo';
import { template } from '../templates/index.js';

async function exec() {
  const targetFiles = await glob('src/*.svg');
  const sortedTargetFiles = targetFiles.sort((a, b) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });

  const result = await Promise.all(
    sortedTargetFiles.map(async (file) => {
      const content = readFileSync(file).toString('utf8');
      const source = await optimize(content);
      const $ = load(source.data.toString(), {
        decodeEntities: false,
      });

      $('style,title,defs').remove();
      $('[id]:not(symbol)').removeAttr('id');
      $('[class^="st"],[class^="cls"]').removeAttr('class');
      $('[space]').removeAttr('space');
      $('[style]').removeAttr('style');
      $('[data-name]').removeAttr('data-name');
      $('svg[id]').removeAttr('id');
      $('[fill]').removeAttr('fill');

      const key = file.split('/').pop()?.split('.').shift();
      const value = $.xml('svg');

      return { key, value };
    }),
  );

  writeFileSync('./dist/index.tsx', template(result), 'utf8');
}

exec();
