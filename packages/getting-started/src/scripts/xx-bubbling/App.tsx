import * as React from 'react';

export const Bubbling = () => {
  const handleClickOuter = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('outer', e);
  };

  const handleClickInner = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('inner', e);
  };

  const handleClickLabel = (e: React.MouseEvent<HTMLLabelElement>) => e.stopPropagation();

  return (
    <div
      style={{
        padding: 24,
        background: 'pink',
      }}
      onClick={handleClickOuter}
    >
      <p>Outer</p>
      <button onClick={handleClickInner}>Inner</button>
      <label onClick={handleClickLabel}>
        <input type="checkbox" />
        Inner 2
      </label>
    </div>
  );
};
