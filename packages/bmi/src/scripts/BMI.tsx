import * as React from 'react';
import { LabeledSlider } from './components/LabeledSlider';

export const BMI: React.FC = () => {
  const [weight, setWeight] = React.useState<number>(60);
  const [height, setHeight] = React.useState<number>(170);

  const handleWeightChange = React.useCallback((w: string) => setWeight(Number(w)), []);
  const handleHeightChange = React.useCallback((h: string) => setHeight(Number(h)), []);

  const calcBMI = React.useMemo<number>(() => {
    const heightMeters = height * 0.01;
    return Math.round(weight / (heightMeters * heightMeters));
  }, [weight, height]);

  return (
    <>
      <LabeledSlider label="Weight" unit="kg" min={40} max={150} value={weight} onValueChange={handleWeightChange} />
      <LabeledSlider label="Height" unit="cm" min={140} max={220} value={height} onValueChange={handleHeightChange} />
      <p>BMI: {calcBMI}</p>
    </>
  );
};
