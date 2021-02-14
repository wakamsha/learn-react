import { Component } from 'react';

type State = {
  blogPost: string;
};

export class BlogPost extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      blogPost: 'good night my friend...',
    };
  }

  public componentDidMount() {
    console.info('BlogPost is mounted!!!');
  }

  public componentWillUnmount() {
    console.info('BlogPost will remove...');
  }

  public render() {
    const { blogPost } = this.state;

    return (
      <p>
        <strong>{blogPost}</strong>
      </p>
    );
  }
}
