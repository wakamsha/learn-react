import * as React from 'react';
import { Button } from './components/Button';
import { Content } from './components/Content';
import { Theme, ThemeContext, themes } from './components/ThemeContext';

type State = {
  theme: Theme;
  toggleTheme: () => void;
};

export class ContextApp extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  private toggleTheme = () =>
    this.setState(state => ({ theme: state.theme === themes.dark ? themes.light : themes.dark }));

  public render() {
    return (
      <>
        <ThemeContext.Provider value={this.state}>
          {/* <Toolbar changeTheme={this.toggleTheme} /> */}
          <Content />
        </ThemeContext.Provider>
        <div>
          <Button label="hoge" onClick={this.toggleTheme} />
        </div>
      </>
    );
  }
}
