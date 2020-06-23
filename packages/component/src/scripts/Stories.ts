import { Story as DatePicker } from './components/DatePicker/index.story';
import { Story as LabeledSlider } from './components/LabeledSlider/index.story';
import { Story as Toast } from './components/Toast/index.story';

export const Stories = { DatePicker, LabeledSlider, Toast } as const;

export type Stories = keyof typeof Stories;
