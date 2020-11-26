import { css } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
import { useShuffleLetters } from '.';
import React, { ReactNode, useRef, useState } from 'react';

export const Story = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLParagraphElement>(null);

  const [value, setValue] = useState('');
  const [input, setInput] = useState('hello world!');

  const [startShuffle1] = useShuffleLetters(ref1);
  const [startShuffle2] = useShuffleLetters(ref2);

  const handleSubmit = () => {
    setValue(input);
    startShuffle1(input);
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={handleSubmit}>submit</button>
      </form>
      <p ref={ref1}>{value}</p>

      <p className={styleParagraph} ref={ref2} onClick={() => startShuffle2('my name is wakamsha')}>
        my name is wakamsha
      </p>

      <ul className={styleList}>
        {['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr'].map((name, i) => (
          <ListItem key={i}>{name}</ListItem>
        ))}
      </ul>
    </>
  );
};

const ListItem = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [startShuffle] = useShuffleLetters(ref);

  return (
    <li ref={ref} onMouseEnter={() => startShuffle(children as string)}>
      {children}
    </li>
  );
};

const styleParagraph = css`
  cursor: pointer;
`;

const styleList = css`
  > li + li {
    margin-top: ${gutter(3)};
  }
`;
