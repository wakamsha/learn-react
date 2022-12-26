import { SplitPane } from '.';

export const Story = () => (
  <div style={{ height: 480, overflow: 'hidden' }}>
    <SplitPane
      orientation="vertical"
      minSize="100px"
      maxSize="360px"
      defaultSize="40%"
      onStarted={() => console.info('started')}
      onFinished={console.info}
    >
      <div style={{ overflow: 'hidden' }}>
        <h3>1st Pane hello world!</h3>
        <Paragraph />
        <Paragraph />
        <Paragraph />
      </div>
      <div>
        <h3>2nd Pane Goodbye world</h3>
        <Paragraph />
      </div>
    </SplitPane>
  </div>
);

const Paragraph = () => (
  <p>
    あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
  </p>
);
