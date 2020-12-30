const fs = require('fs');
const cheerio = require('cheerio');
const ejs = require('ejs');
const glob = require('glob');
const SVGO = require('svgo');

const svgo = new SVGO({});

async function exec() {
  const data = await glob.sync('src/*.svg');

  const result = await Promise.all(
    data.map(async file => {
      const content = fs.readFileSync(file).toString('utf8');
      const source = await svgo.optimize(content);
      const $ = cheerio.load(source.data.toString('utf8'), {
        decodeEntities: false,
      });

      $('style,title,defs').remove();
      $('[id]:not(symbol)').removeAttr('id');
      $('[class^="st"],[class^="cls"]').removeAttr('class');
      $('[style]:not(svg)').removeAttr('style');
      $('[data-name]').removeAttr('data-name');
      $('svg[id]').removeAttr('id');
      $('[fill]').removeAttr('fill');

      const key = file.split('/').pop().split('.').shift();
      const value = $.xml('svg');

      return { key, value };
    }),
  );

  ejs.renderFile('./templates/index.ejs', { result }, (_, output) => {
    fs.writeFileSync('./dist/index.tsx', output, 'utf8');
  });
}

exec();
