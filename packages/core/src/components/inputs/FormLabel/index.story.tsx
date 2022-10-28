import { css } from '@emotion/css';
import { useId } from 'react';
import { FormLabel } from '.';
import { gutter } from '../../../helpers/Style';

export const Story = () => {
  const inputId = useId();

  return (
    <>
      <h2>Nest</h2>
      <FormLabel label="メールアドレス">
        <input type="email" placeholder="taro.legal@legalforce.co.jp" />
      </FormLabel>

      <h2>Use Id</h2>
      <div className={styleFormGroup}>
        <FormLabel label="メールアドレス" htmlFor={inputId} />
        <input type="email" id={inputId} placeholder="taro.legal@legalforce.co.jp" />
      </div>

      <h2>With Tooltip</h2>
      <FormLabel label="メールアドレス" tooltip="あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら">
        <input type="email" placeholder="taro.legal@legalforce.co.jp" />
      </FormLabel>
    </>
  );
};

const styleFormGroup = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${gutter(4)};
  align-items: center;
`;
