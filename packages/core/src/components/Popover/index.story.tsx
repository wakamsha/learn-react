import { useState } from 'react';
import { Popover } from '.';

export const Story = () => {
  const [state1, setState1] = useState(false);

  return (
    <>
      <h3>Basic</h3>
      <p>
        <span id="target1">#popover-target1 ( Default position )</span>
      </p>

      <button onClick={() => setState1(true)}>Open</button>
      <button onClick={() => setState1(false)}>Close</button>

      <Popover
        targetSelector="#target1"
        position="right"
        alignment="start"
        visible={state1}
        onClickOutside={() => setState1(false)}
      >
        <p style={{ background: 'white', padding: 16 }}>
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </p>
      </Popover>
    </>
  );
};
