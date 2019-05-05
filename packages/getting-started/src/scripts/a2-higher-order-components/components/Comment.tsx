import * as React from 'react';

type Props = {
  comment: string;
};

export function Comment({ comment }: Props) {
  return <p>{comment}</p>;
}
