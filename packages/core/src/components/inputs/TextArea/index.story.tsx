import { css } from '@emotion/css';
import { useState } from 'react';
import { TextArea } from '.';
import { FontSize } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';

export const Story = () => {
  const [value, setValue] = useState('hello world!\ngoodbye world!!');

  const [minLines, setMinLines] = useState(1);
  const [maxLines, setMaxLines] = useState(6);

  return (
    <>
      <h2>Basic</h2>
      <TextArea
        name="input-basic"
        value={value}
        minRows={minLines}
        maxRows={maxLines}
        placeholder="Input something..."
        onChange={setValue}
      />

      <div className={styleFormControls}>
        <label className={styleFormControl}>
          <span>Min Lines</span>
          <input
            type="number"
            min={1}
            max={100}
            value={minLines}
            onChange={(e) => {
              setMinLines(Number(e.target.value));
            }}
          />
        </label>
        <label className={styleFormControl}>
          <span>Max Lines</span>
          <input
            type="number"
            min={1}
            max={100}
            value={maxLines}
            onChange={(e) => {
              setMaxLines(Number(e.target.value));
            }}
          />
        </label>
      </div>

      <h2>Invalid</h2>
      <TextArea
        invalid
        name="input-basic"
        value={value}
        minRows={2}
        placeholder="Input something..."
        onChange={setValue}
      />

      <h2>Disabled</h2>
      <TextArea
        disabled
        name="input-basic"
        value={value}
        minRows={2}
        placeholder="Input something..."
        onChange={setValue}
      />
    </>
  );
};

const styleFormControls = css`
  display: flex;
  gap: ${gutter(4)};
  margin-top: ${gutter(4)};
`;

const styleFormControl = css`
  display: inline-flex;
  flex-direction: column;
  font-size: ${FontSize.Regular};

  > :not(:first-child) {
    margin-top: ${gutter(1)};
  }
`;
