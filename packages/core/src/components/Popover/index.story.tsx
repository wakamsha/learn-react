import { css } from '@emotion/css';
import { ChangeEvent, ComponentProps, useState } from 'react';
import { FontSize, Shadow } from '../../constants/Style';
import { gutter } from '../../helpers/Style';
import { Popover } from '.';

export const Story = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<ComponentProps<typeof Popover>['position']>('top');
  const [alignment, setAlignment] = useState<ComponentProps<typeof Popover>['alignment']>('center');
  const [target, setTarget] = useState('#target1');

  const handleClickShow = (targetSelector: string, position: ComponentProps<typeof Popover>['position']) => {
    setTarget(targetSelector);
    setPosition(position);
    setVisible(true);
  };

  const handleChangeAlignment = (e: ChangeEvent<HTMLInputElement>) =>
    setAlignment(e.target.value as ComponentProps<typeof Popover>['alignment']);

  return (
    <>
      <h3>Basic</h3>
      <div className={styleContainer}>
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
        <div>
          <h4>Alignment</h4>
          <ul className={styleAlignmentsList}>
            {['start', 'center', 'end'].map(type => (
              <li key={type}>
                <label>
                  <input
                    type="radio"
                    name="alignment"
                    checked={type === alignment}
                    value={type}
                    onChange={handleChangeAlignment}
                  />
                  <span>{type}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Popover
        targetSelector={target}
        position={position}
        alignment={alignment}
        visible={visible}
        onClickOutside={() => setVisible(false)}
      >
        <p className={styleCard}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </Popover>
    </>
  );
};

const styleContainer = css`
  display: flex;

  > :not(:first-child) {
    margin-left: ${gutter(12)};
  }
`;

const styleAlignmentsList = css`
  > li > label {
    display: inline-flex;
    align-items: center;

    > :not(:first-child) {
      margin-left: ${gutter(1)};
    }
  }
`;

const styleCard = css`
  padding: ${gutter(4)};
  font-size: ${FontSize.Regular};
  background: white;
  box-shadow: ${Shadow.Floating};
`;
