import type { IconName } from '@learn-react/icon';
import { iconElements } from '@learn-react/icon';

type Props = {
  name: IconName;
};

export const Icon = ({ name }: Props) => iconElements[name];
