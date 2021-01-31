import { css } from '@emotion/css';
import { useState } from 'react';
import { FontSize, Shadow } from '../../constants/Style';
import { gutter } from '../../helpers/Style';
import { Modal } from '.';

export const Story = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <>
      <h3>Normal content</h3>
      <button onClick={() => setVisible1(true)}>Open</button>

      <h3>Very long content</h3>
      <button onClick={() => setVisible2(true)}>Open</button>

      <Modal visible={visible1} onClickOutside={() => setVisible1(false)}>
        <article className={styleCard}>
          <h1>Hello!!</h1>
          <nav>
            <button onClick={() => setVisible1(false)}>Close</button>
          </nav>
        </article>
      </Modal>

      <Modal visible={visible2} onClickOutside={() => setVisible2(false)}>
        <article className={styleCard}>
          <h1>ポラーノの広場</h1>
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
          <nav>
            <button onClick={() => setVisible2(false)}>Close</button>
          </nav>
        </article>
      </Modal>
    </>
  );
};

const styleCard = css`
  width: 400px;
  padding: ${gutter(4)};
  font-size: ${FontSize.Regular};
  background: white;
  box-shadow: ${Shadow.Dialog};

  > p {
    font-size: ${FontSize.Large};
  }
`;
