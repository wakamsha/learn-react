import { Story as Button } from './components/Button/index.story';
import { Story as Calendar } from './components/Calendar/index.story';
import { Story as LabeledSlider } from './components/LabeledSlider/index.story';
import { Story as Toast } from './components/Toast/index.story';

export const Stories = { Button, Calendar, LabeledSlider, Toast } as const;

export type Stories = keyof typeof Stories;
