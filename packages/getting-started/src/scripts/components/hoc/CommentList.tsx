import * as React from 'react';
import { Comment } from './Comment';

type State = {
  comments: string[];
};

export class CommentList extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      comments: ['good morning, foo!', 'good afternoon, bar!!', 'good evening, baz!!!'],
    };
  }

  public componentDidMount() {
    console.log('commentList is mounted!!!');
  }

  public componentWillUnmount() {
    console.log('commentList will remove...');
  }

  public render() {
    return (
      <div>
        {this.state.comments.map((comment, i) => (
          <Comment comment={comment} key={`${i}`} />
        ))}
      </div>
    );
  }
}
