import { Story as LabeledSlider } from './components/LabeledSlider/index.story';
import { Story as Toast } from './components/Toast/index.story';

export const Stories = { LabeledSlider, Toast } as const;

export type Stories = keyof typeof Stories;
