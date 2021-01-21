import { css } from '@emotion/css';
import { ComponentProps, useState } from 'react';
import { FontSize, Shadow } from '../../constants/Style';
import { gutter } from '../../helpers/Style';
import { Popover } from '.';

export const Story = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<ComponentProps<typeof Popover>['position']>('top');
  const [target, setTarget] = useState('#target1');

  const handleClickShow = (targetSelector: string, position: ComponentProps<typeof Popover>['position']) => {
    setTarget(targetSelector);
    setPosition(position);
    setVisible(true);
  };

  return (
    <>
      <h3>Basic</h3>
      <table style={{ marginLeft: gutter(8) }}>
        <tbody>
          <tr>
            <td />
            <td>
              <button id="target1" onClick={() => handleClickShow('#target1', 'top')}>
                👆
              </button>
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <button id="target2" onClick={() => handleClickShow('#target2', 'left')}>
                👈
              </button>
            </td>
            <td />
            <td>
              <button id="target3" onClick={() => handleClickShow('#target3', 'right')}>
                👉
              </button>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button id="target4" onClick={() => handleClickShow('#target4', 'bottom')}>
                👇
              </button>
            </td>
            <td />
          </tr>
        </tbody>
      </table>

      <Popover targetSelector={target} position={position} visible={visible} onClickOutside={() => setVisible(false)}>
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
