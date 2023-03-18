import { css } from '@emotion/css';
import { useState } from 'react';
import { useHotkeys } from '.';
import { Modal } from '../../components/utils/Modal';
import { BorderRadius, Color } from '../../constants/Style';
import { gutter } from '../../helpers/Style';

export const Story = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const [submitLog, setSubmitLog] = useState('');

  const handleToggleModalVisibility = () => {
    setModalVisibility((state) => !state);
  };

  useHotkeys(
    'esc',
    () => {
      setModalVisibility(false);
    },
    {
      enabled: modalVisibility,
    },
  );

  const textareaRef = useHotkeys<HTMLTextAreaElement>('command+enter', () => {
    setSubmitLog((state) => `${state}送信しました!\n`);
  });

  return (
    <>
      <h2>Modal</h2>
      <button onClick={handleToggleModalVisibility}>Open Modal</button>
      <p>
        <small>
          <kbd className={styleKey}>esc</kbd> でモーダルを閉じれます。
        </small>
      </p>
      <Modal visible={modalVisibility}>
        <h1>Hello!!</h1>
      </Modal>

      <h2>Form</h2>
      <textarea ref={textareaRef} className={styleTextArea} />
      <p>
        <small>
          <kbd className={styleKey}>⌘</kbd> + <kbd className={styleKey}>enter</kbd> で送信
        </small>
      </p>
      <pre>
        <code>{submitLog}</code>
      </pre>
    </>
  );
};

const styleTextArea = css`
  display: block;
  width: 100%;
  height: 160px;
  resize: vertical;
`;

const styleKey = css`
  display: inline-flex;
  align-items: center;
  justify-content: baseline;
  padding: ${gutter(0.5)} ${gutter(2)};
  margin: ${gutter(1)};
  background-color: ${Color.TextureInput};
  border: 1px solid ${Color.LineNeutral};
  border-bottom-width: 4px;
  border-radius: ${BorderRadius.Small};
`;
