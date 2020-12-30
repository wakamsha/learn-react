import { Story as Box } from '@learn-react/core/components/Box/index.story';
import { Story as Button } from '@learn-react/core/components/Button/index.story';
import { Story as Calendar } from '@learn-react/core/components/Calendar/index.story';
import { Story as LabeledSlider } from '@learn-react/core/components/LabeledSlider/index.story';
import { Story as Range } from '@learn-react/core/components/Range/index.story';
import { Story as Tabs } from '@learn-react/core/components/Tabs/index.story';
import { Story as Toast } from '@learn-react/core/components/Toast/index.story';
import { Story as ShuffleLetters } from '@learn-react/core/hooks/useShuffleLetters/index.story';

export const Stories = { Box, Button, Calendar, LabeledSlider, Range, ShuffleLetters, Tabs, Toast } as const;

export type Stories = keyof typeof Stories;
