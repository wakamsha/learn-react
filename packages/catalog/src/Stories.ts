import { Story as Box } from '@learn-react/core/components/Box/index.story';
import { Story as Button } from '@learn-react/core/components/Button/index.story';
import { Story as Calendar } from '@learn-react/core/components/Calendar/index.story';
import { Story as Card } from '@learn-react/core/components/Card/index.story';
import { Story as Checkbox } from '@learn-react/core/components/Checkbox/index.story';
import { Story as Icon } from '@learn-react/core/components/Icon/index.story';
import { Story as IconButton } from '@learn-react/core/components/IconButton/index.story';
import { Story as LabeledSlider } from '@learn-react/core/components/LabeledSlider/index.story';
import { Story as Popover } from '@learn-react/core/components/Popover/index.story';
import { Story as Radio } from '@learn-react/core/components/Radio/index.story';
import { Story as Range } from '@learn-react/core/components/Range/index.story';
import { Story as Select } from '@learn-react/core/components/Select/index.story';
import { Story as SplitPane } from '@learn-react/core/components/SplitPane/index.story';
import { Story as Tabs } from '@learn-react/core/components/Tabs/index.story';
import { Story as TextField } from '@learn-react/core/components/TextField/index.story';
import { Story as Toast } from '@learn-react/core/components/Toast/index.story';
import { Story as Tooltip } from '@learn-react/core/components/Tooltip/index.story';
import { Story as ShuffleLetters } from '@learn-react/core/hooks/useShuffleLetters/index.story';

export const Components = {
  Box,
  Button,
  Calendar,
  Card,
  Checkbox,
  LabeledSlider,
  Icon,
  IconButton,
  Popover,
  Radio,
  Range,
  Select,
  SplitPane,
  Tabs,
  TextField,
  Toast,
  Tooltip,
} as const;
export type Components = keyof typeof Components;

export const Hooks = { ShuffleLetters } as const;
export type Hooks = keyof typeof Hooks;

export type Category = 'components' | 'hooks';
