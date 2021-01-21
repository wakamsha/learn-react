import { css } from '@emotion/css';
import { useState } from 'react';
import { FontSize, Shadow } from '../../constants/Style';
import { gutter } from '../../helpers/Style';
import { Popover } from '.';

export const Story = () => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  return (
    <>
      <h3>Basic</h3>
      <table style={{ marginLeft: gutter(8) }}>
        <tbody>
          <tr>
            <td />
            <td>
              <button id="target1" onClick={() => setState1(true)}>
                👆
              </button>
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <button id="target2" onClick={() => setState2(true)}>
                👈
              </button>
            </td>
            <td />
            <td>
              <button id="target3" onClick={() => setState3(true)}>
                👉
              </button>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button id="target4" onClick={() => setState4(true)}>
                👇
              </button>
            </td>
            <td />
          </tr>
        </tbody>
      </table>

      <Popover targetSelector="#target1" position="top" visible={state1} onClickOutside={() => setState1(false)}>
        <p className={styleCard}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </Popover>
      <Popover targetSelector="#target2" position="left" visible={state2} onClickOutside={() => setState2(false)}>
        <p className={styleCard}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </Popover>
      <Popover targetSelector="#target3" position="right" visible={state3} onClickOutside={() => setState3(false)}>
        <p className={styleCard}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </Popover>
      <Popover targetSelector="#target4" position="bottom" visible={state4} onClickOutside={() => setState4(false)}>
        <p className={styleCard}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </Popover>
    </>
  );
};

const styleCard = css`
  padding: ${gutter(4)};
  font-size: ${FontSize.Regular};
  background: white;
  box-shadow: ${Shadow.Floating};
`;
