// @ts-check
const fs = require('fs');
const cheerio = require('cheerio');
const glob = require('glob');
const { optimize } = require('svgo');
const iconTemplate = require('../templates');

async function exec() {
  const data = await glob.sync('src/*.svg');

  const result = await Promise.all(
    data.map(async file => {
      const content = fs.readFileSync(file).toString('utf8');
      const source = await optimize(content);
      const $ = cheerio.load(source.data.toString(), {
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

      const key = file.split('/').pop().split('.').shift();
      const value = $.xml('svg');

      return { key, value };
    }),
  );

  fs.writeFileSync('./dist/index.tsx', iconTemplate(result), 'utf8');
}

exec();
