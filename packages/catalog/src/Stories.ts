import { Story as Icon } from '@learn-react/core/components/dataDisplay/Icon/index.story';
import { Story as Tooltip } from '@learn-react/core/components/dataDisplay/Tooltip/index.story';
import { Story as Toast } from '@learn-react/core/components/feedback/Toast/index.story';
import { Story as Button } from '@learn-react/core/components/inputs/Button/index.story';
import { Story as Calendar } from '@learn-react/core/components/inputs/Calendar/index.story';
import { Story as Checkbox } from '@learn-react/core/components/inputs/Checkbox/index.story';
import { Story as IconButton } from '@learn-react/core/components/inputs/IconButton/index.story';
import { Story as LabeledSlider } from '@learn-react/core/components/inputs/LabeledSlider/index.story';
import { Story as Radio } from '@learn-react/core/components/inputs/Radio/index.story';
import { Story as Range } from '@learn-react/core/components/inputs/Range/index.story';
import { Story as Select } from '@learn-react/core/components/inputs/Select/index.story';
import { Story as TextField } from '@learn-react/core/components/inputs/TextField/index.story';
import { Story as Tabs } from '@learn-react/core/components/navigation/Tabs/index.story';
import { Story as Card } from '@learn-react/core/components/surfaces/Card/index.story';
import { Story as Box } from '@learn-react/core/components/utils/Box/index.story';
import { Story as Modal } from '@learn-react/core/components/utils/Modal/index.story';
import { Story as Popover } from '@learn-react/core/components/utils/Popover/index.story';
import { Story as SplitPane } from '@learn-react/core/components/utils/SplitPane/index.story';
import { Story as Transition } from '@learn-react/core/components/utils/Transition/index.story';
import { Story as Color } from '@learn-react/core/constants/Style/index.story';
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
  Modal,
  Popover,
  Radio,
  Range,
  Select,
  SplitPane,
  Tabs,
  TextField,
  Toast,
  Tooltip,
  Transition,
} as const;
export type Components = keyof typeof Components;

export const Constants = {
  Color,
} as const;
export type Constants = keyof typeof Constants;

export const Hooks = { ShuffleLetters } as const;
export type Hooks = keyof typeof Hooks;

export type Category = 'components' | 'constants' | 'hooks';
