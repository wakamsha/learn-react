import { Box } from '.';

export const Story = () => (
  <>
    <h2>Horizontal</h2>
    <Box orientation="horizontal">
      <Box.Cell>
        <div style={{ color: 'white', backgroundColor: 'red', padding: 16 }}>hello world</div>
      </Box.Cell>
      <Box.Cell type="filled">
        <div style={{ color: 'white', backgroundColor: 'blue', padding: 16 }}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
        </div>
      </Box.Cell>
      <Box.Cell>
        <div style={{ color: 'white', backgroundColor: 'red', padding: 16 }}>Goodbye</div>
      </Box.Cell>
    </Box>
    <h2>Vertical</h2>
    <Box orientation="vertical">
      <Box.Cell>
        <div style={{ color: 'white', backgroundColor: 'red', padding: 16 }}>hello world</div>
      </Box.Cell>
      <Box.Cell type="filled">
        <div style={{ color: 'white', backgroundColor: 'blue', padding: 16 }}>
          {[...Array(3).keys()].map(i => (
            <p key={i}>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
            </p>
          ))}
        </div>
      </Box.Cell>
      <Box.Cell>
        <div style={{ color: 'white', backgroundColor: 'red', padding: 16 }}>Goodbye</div>
      </Box.Cell>
    </Box>
  </>
);
