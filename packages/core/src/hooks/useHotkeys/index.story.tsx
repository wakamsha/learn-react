import { css } from '@emotion/css';
import { useState } from 'react';
import { useHotkeys } from '.';
import { Modal } from '../../components/utils/Modal';

export const Story = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const [submitLog, setSubmitLog] = useState('');

  const handleToggleModalVisibility = () => {
    setModalVisibility(state => !state);
  };

  useHotkeys('esc', () => {
    setModalVisibility(false);
  });

  const textareaRef = useHotkeys<HTMLTextAreaElement>('command+enter', () => {
    setSubmitLog(state => `${state}送信しました!\n`);
  });

  return (
    <>
      <h2>Modal</h2>
      <button onClick={handleToggleModalVisibility}>Open Modal</button>
      <p>
        <small>
          <kbd>esc</kbd> でモーダルを閉じれます。
        </small>
      </p>
      <Modal visible={modalVisibility} onClickOutside={handleToggleModalVisibility}>
        <h1>Hello!!</h1>
      </Modal>

      <h2>Form</h2>
      <textarea ref={textareaRef} className={styleTextArea} />
      <p>
        <small>
          <kbd>⌘</kbd> + <kbd>enter</kbd> で送信
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
