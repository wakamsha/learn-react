import { css } from '@emotion/css';
import { useState } from 'react';
import { Transition } from '.';
import { FontSize } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';

export const Story = () => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  const handleToggle1 = () => setState1(state => !state);
  const handleToggle2 = () => setState2(state => !state);
  const handleToggle3 = () => setState3(state => !state);

  return (
    <>
      <h2>Horizontal ( Default )</h2>
      <button onClick={handleToggle1}>Toggle</button>

      <Transition id={`${state1}`}>
        {state1 ? (
          <article className={styleCard}>
            <p>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
            </p>
          </article>
        ) : (
          <article className={styleCard}>
            <p>
              Stay Hungry. Stay Foolish. And I have always wished that for myself. And now, as you graduate to begin
              anew, I wish that for you.
            </p>
          </article>
        )}
      </Transition>

      <h2>Vertical</h2>
      <button onClick={handleToggle2}>Toggle</button>

      <Transition id={`${state2}`} type="vertical">
        {state2 ? (
          <article className={styleCard}>
            <p>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
            </p>
          </article>
        ) : (
          <article className={styleCard}>
            <p>
              Stay Hungry. Stay Foolish. And I have always wished that for myself. And now, as you graduate to begin
              anew, I wish that for you.
            </p>
          </article>
        )}
      </Transition>

      <h2>Scale</h2>
      <button onClick={handleToggle3}>Toggle</button>

      <Transition id={`${state3}`} type="scale">
        {state3 ? (
          <article className={styleCard}>
            <p>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
            </p>
          </article>
        ) : (
          <article className={styleCard}>
            <p>
              Stay Hungry. Stay Foolish. And I have always wished that for myself. And now, as you graduate to begin
              anew, I wish that for you.
            </p>
          </article>
        )}
      </Transition>
    </>
  );
};

const styleCard = css`
  padding: ${gutter(4)};
  margin: ${gutter(2)};
  font-size: ${FontSize.Regular};
  background-color: white;
  box-shadow: ${cssVar('ShadowFloating')};
`;
