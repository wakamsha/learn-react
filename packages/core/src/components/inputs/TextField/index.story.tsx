import { css } from '@emotion/css';
import { useState } from 'react';
import { TextField } from '.';
import { gutter } from '../../../helpers/Style';

export const Story = () => {
  const [value, setValue] = useState('hello world!');

  return (
    <>
      <h2>Basic</h2>
      <TextField name="input-basic" value={value} placeholder="Input something..." onChange={setValue} />

      <h2>With Clear button</h2>
      <TextField
        clearable
        name="input-with-button"
        value={value}
        placeholder="Input something..."
        onChange={setValue}
      />

      <h2>Variant</h2>
      <div className={styleRow}>
        <TextField name="input-text" value={value} placeholder="text" type="text" onChange={setValue} />
        <TextField name="input-email" value={value} placeholder="email" type="email" onChange={setValue} />
        <TextField name="input-password" value={value} placeholder="password" type="password" onChange={setValue} />
        <TextField
          name="input-search"
          value={value}
          placeholder="search"
          type="search"
          icon="search"
          onChange={setValue}
        />
        <TextField name="input-tel" value={value} placeholder="tel" type="tel" onChange={setValue} />
        <TextField name="input-url" value={value} placeholder="url" type="url" onChange={setValue} />
        <TextField name="input-number" value={value} placeholder="number" type="number" onChange={setValue} />
      </div>

      <h2>Invalid</h2>
      <TextField invalid name="input-invalid" value={value} placeholder="Input something..." onChange={setValue} />

      <h2>Disabled</h2>
      <TextField
        clearable
        disabled
        name="input-disabled"
        value={value}
        placeholder="Input something..."
        onChange={setValue}
      />
    </>
  );
};

const styleRow = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;
