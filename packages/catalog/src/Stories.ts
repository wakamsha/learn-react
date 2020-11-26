import { Story as Button } from '@learn-react/core/components/Button/index.story';
import { Story as Calendar } from '@learn-react/core/components/Calendar/index.story';
import { Story as LabeledSlider } from '@learn-react/core/components/LabeledSlider/index.story';
import { Story as ShuffleLetters } from '@learn-react/core/hooks/useShuffleLetters/index.story';
import { Story as Toast } from '@learn-react/core/components/Toast/index.story';

export const Stories = { Button, Calendar, LabeledSlider, ShuffleLetters, Toast } as const;

export type Stories = keyof typeof Stories;
