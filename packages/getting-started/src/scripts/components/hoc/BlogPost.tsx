import * as React from 'react';

type State = {
  blogPost: string;
};

export class BlogPost extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      blogPost: 'good night hoge...',
    };
  }

  public componentDidMount() {
    console.log('BlogPost is mounted!!!');
  }

  public componentWillUnmount() {
    console.log('BlogPost will remove...');
  }

  public render() {
    return (
      <p>
        <strong>{this.state.blogPost}</strong>
      </p>
    );
  }
}
