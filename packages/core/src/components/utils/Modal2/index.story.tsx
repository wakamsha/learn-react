import { css } from '@emotion/css';
import { type FC, useState } from 'react';
import { Modal } from '.';
import { FontSize, LineHeight } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';
import { Card } from '../../surfaces/Card';

export const Story: FC = () => {
  const [lightDismiss, setLightDismiss] = useState(false);

  const [visible1, setVisible1] = useState(false);

  const [visible2, setVisible2] = useState(false);

  const [visible3, setVisible3] = useState(false);

  const handleToggle1 = () => {
    console.info('Toggling modal 1 visibility');
    setVisible1((state) => !state);
  };

  const handleToggle2 = () => {
    setVisible2((state) => !state);
  };

  const handleToggle3 = () => {
    setVisible3((state) => !state);
  };

  const handleLightDismiss = () => {
    setLightDismiss((state) => !state);
  };

  return (
    <>
      <label>
        <input type="checkbox" checked={lightDismiss} onChange={handleLightDismiss} />
        Light dismiss
      </label>

      <h2>Normal content</h2>
      <button onClick={handleToggle1}>Open</button>

      <h2>Very long content</h2>
      <button onClick={handleToggle2}>Open</button>

      <h2>Liquid Content</h2>
      <button onClick={handleToggle3}>Open</button>

      <pre>
        <code>
          {JSON.stringify(
            {
              lightDismiss,
              visible1,
              visible2,
              visible3,
            },
            null,
            2,
          )}
        </code>
      </pre>

      <Modal open={visible1} onLightDismiss={lightDismiss ? handleToggle1 : undefined}>
        <article className={styleCard}>
          <h1 className={styleHeading}>Hello!!</h1>
          <footer className={styleFooter}>
            <input type="text" />
            <button onClick={handleToggle1}>Close</button>
          </footer>
        </article>
      </Modal>

      <Modal open={visible2} onLightDismiss={lightDismiss ? handleToggle2 : undefined}>
        <article className={styleCard}>
          <h1 className={styleHeading}>ポラーノの広場</h1>
          <div className={styleBody}>
            <LongContent />
          </div>
          <footer className={styleFooter}>
            <input type="text" />
            <button onClick={handleToggle2}>Close</button>
          </footer>
        </article>
      </Modal>

      <Modal open={visible3} onLightDismiss={lightDismiss ? handleToggle3 : undefined}>
        <Card maxWidth={400} maxHeight={`calc(100dvh - ${gutter(20)})`}>
          <Card.Header>
            <h1>ポラーノの広場</h1>
          </Card.Header>
          <Card.Body>
            <LongContent />
          </Card.Body>
          <Card.Footer>
            <input type="text" />
            <button onClick={handleToggle3}>Close</button>
          </Card.Footer>
        </Card>
      </Modal>
    </>
  );
};

const LongContent = () => (
  <>
    <p>そのころわたくしは、モリーオ市の博物局に勤めて居りました</p>
    <p>
      十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給もほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すというので、その景色のいいまわりにアカシヤを植え込んだ広い地面が、切符売場や信号所の建物のついたまま、わたくしどもの役所の方へまわって来たものですから、わたくしはすぐ宿直という名前で月賦で買った小さな蓄音器と二十枚ばかりのレコードをもって、その番小屋にひとり住むことになりました。わたくしはそこの馬を置く場所に板で小さなしきいをつけて一疋の山羊を飼いました。毎朝その乳をしぼってつめたいパンをひたしてたべ、それから黒い革のかばんへすこしの書類や雑誌を入れ、靴もきれいにみがき、並木のポプラの影法師を大股にわたって市の役所へ出て行くのでした。
    </p>
    <p>
      あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
    </p>
    <p>
      五月のしまいの日曜でした。わたくしは賑やかな市の教会の鐘の音で眼をさましました。もう日はよほど登って、まわりはみんなきらきらしていました。時計を見るとちょうど六時でした。わたくしはすぐチョッキだけ着て山羊を見に行きました。すると小屋のなかはしんとして藁が凹んでいるだけで、あのみじかい角も白い髯も見えませんでした。
    </p>
    <p>「あんまりいい天気なもんだから大将ひとりででかけたな。」</p>
    <p>
      わたくしは半分わらうように半分つぶやくようにしながら、向うの信号所からいつも放して遊ばせる輪道の内側の野原、ポプラの中から顔をだしている市はずれの白い教会の塔までぐるっと見まわしました。けれどもどこにもあの白い頭もせなかも見えていませんでした。うまやを一まわりしてみましたがやっぱりどこにも居ませんでした。
    </p>
  </>
);

const styleCard = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  overflow: hidden;
  font-size: ${FontSize.Regular};
  background-color: ${cssVar('TexturePaper')};
  box-shadow: ${cssVar('ShadowDialog')};

  > :not(:first-child) {
    border-top: 1px solid ${cssVar('LineLight')};
  }
`;

const styleHeading = css`
  flex: 0 0 auto;
  padding: ${gutter(4)};
`;

const styleBody = css`
  flex: 1 1 100%;
  padding: ${gutter(4)};
  overflow: auto;
  font-size: ${FontSize.Large};
  line-height: ${LineHeight.Medium};
`;

const styleFooter = css`
  flex: 0 0 auto;
  padding: ${gutter(4)};
`;
