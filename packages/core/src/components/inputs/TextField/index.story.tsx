import { css } from '@emotion/css';
import { useState } from 'react';
import { TextField } from '.';
import { gutter } from '../../../helpers/Style';

export const Story = () => {
  const [value, setValue] = useState('hello world!');

  return (
    <>
      <h2>Basic</h2>
      <TextField name="input-basic" value={value} onChange={setValue} placeholder="Input something..." />

      <h2>With Clear button</h2>
      <TextField
        name="input-with-button"
        value={value}
        onChange={setValue}
        placeholder="Input something..."
        clearable
      />

      <h2>Variant</h2>
      <div className={styleRow}>
        <TextField name="input-text" value={value} onChange={setValue} placeholder="text" type="text" />
        <TextField name="input-email" value={value} onChange={setValue} placeholder="email" type="email" />
        <TextField name="input-password" value={value} onChange={setValue} placeholder="password" type="password" />
        <TextField
          name="input-search"
          value={value}
          onChange={setValue}
          placeholder="search"
          type="search"
          icon="search"
        />
        <TextField name="input-tel" value={value} onChange={setValue} placeholder="tel" type="tel" />
        <TextField name="input-url" value={value} onChange={setValue} placeholder="url" type="url" />
        <TextField name="input-number" value={value} onChange={setValue} placeholder="number" type="number" />
      </div>

      <h2>Invalid</h2>
      <TextField name="input-invalid" value={value} onChange={setValue} placeholder="Input something..." invalid />

      <h2>Disabled</h2>
      <TextField
        name="input-disabled"
        value={value}
        onChange={setValue}
        placeholder="Input something..."
        clearable
        disabled
      />
    </>
  );
};

const styleRow = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;
