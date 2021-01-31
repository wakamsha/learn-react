import { css } from '@emotion/css';
import { FontSize, LineHeight } from '../../constants/Style';
import { gutter } from '../../helpers/Style';
import { Card } from '.';

export const Story = () => (
  <>
    <h3>Neutral</h3>
    <Card shadow="neutral">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h3>Dialog</h3>
    <Card shadow="dialog">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h3>Floating</h3>
    <Card shadow="floating">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h3>Deep</h3>
    <Card shadow="deep">
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h3>Hover</h3>
    <Card hover>
      <div className={styleInner}>
        <p>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </div>
    </Card>

    <h3>Max Width = 200</h3>
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
