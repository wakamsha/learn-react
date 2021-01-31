import { css } from '@emotion/css';
import { useState } from 'react';
import { FontSize, Shadow } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';
import { Transition } from '.';

export const Story = () => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  const handleToggle1 = () => setState1(state => !state);
  const handleToggle2 = () => setState2(state => !state);
  const handleToggle3 = () => setState3(state => !state);

  return (
    <>
      <h3>Horizontal ( Default )</h3>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </article>
        )}
      </Transition>

      <h3>Vertical</h3>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </article>
        )}
      </Transition>

      <h3>Scale</h3>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
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
  background: white;
  box-shadow: ${Shadow.Floating};
`;
