import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { css } from 'emotion';

type Props = {
  label: string;
  to: string;
  activeOnlyWhenExact?: boolean;
};

const activeStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    content: `'>'`,
    display: 'block',
    marginRight: 8,
  },
});

export const OldSchoolMenuLink = (props: Props) => (
  <Route
    path={props.to}
    exact={props.activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? activeStyle : ''}>
        <Link to={props.to}>{props.label}</Link>
      </div>
    )}
  />
);
