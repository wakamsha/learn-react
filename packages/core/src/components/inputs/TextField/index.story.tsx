import { css } from '@emotion/css';
import { useState } from 'react';
import { gutter } from '../../../helpers/Style';
import { TextField } from '.';

export const Story = () => {
  const [value, setValue] = useState('hello world');

  return (
    <>
      <h3>Basic</h3>
      <TextField value={value} onChange={setValue} placeholder="Input something..." />

      <h3>With Clear button</h3>
      <TextField value={value} onChange={setValue} placeholder="Input something..." clearable />

      <h3>Variant</h3>
      <div className={styleRow}>
        <TextField value={value} onChange={setValue} placeholder="text" type="text" />
        <TextField value={value} onChange={setValue} placeholder="email" type="email" />
        <TextField value={value} onChange={setValue} placeholder="password" type="password" />
        <TextField value={value} onChange={setValue} placeholder="search" type="search" icon="search" />
        <TextField value={value} onChange={setValue} placeholder="tel" type="tel" />
        <TextField value={value} onChange={setValue} placeholder="url" type="url" />
        <TextField value={value} onChange={setValue} placeholder="number" type="number" />
      </div>

      <h3>Disabled</h3>
      <TextField value={value} onChange={setValue} placeholder="Input something..." clearable disabled />
    </>
  );
};

const styleRow = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;
