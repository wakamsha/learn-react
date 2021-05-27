import { css } from '@emotion/css';
import { Card } from '.';
import { FontSize, LineHeight } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';

export const Story = () => (
  <>
    <h2>Neutral</h2>
    <Card shadow="neutral">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h2>Dialog</h2>
    <Card shadow="dialog">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h2>Floating</h2>
    <Card shadow="floating">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h2>Deep</h2>
    <Card shadow="deep">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h2>Hover</h2>
    <Card hover>
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h2>Max Width = 200</h2>
    <Card shadow="neutral" maxWidth={200}>
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>
  </>
);

const styleInner = css({
  padding: gutter(4),
  fontSize: FontSize.Regular,
  lineHeight: LineHeight.Regular,
});
