import * as React from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { TransactionStatus, transaction } from '../utils/Decorator';
import { observer } from 'mobx-react';

type Props = {
  store: JSONPlaceholderStore;
};

type State = {
  status: TransactionStatus;
};

@observer
export class PostForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'Idling',
    };
  }

  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { store } = this.props;

    store.setName(e.target.value);
  };

  private handleJobChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { store } = this.props;

    store.setJob(e.target.value);
  };

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.handlePostUser();
  };

  private checkInput(): boolean {
    const {
      store: { name, job },
    } = this.props;
    return !name || !job;
  }

  @transaction('status')
  private *handlePostUser() {
    const { store } = this.props;

    yield store.postUser();
    yield store.getUser();
  }

  public render() {
    const { status } = this.state;
    const fetching = status === 'Running';

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>POST</h3>
        <p>
          <input placeholder="Name ..." onChange={this.handleNameChange} disabled={fetching} />
        </p>
        <p>
          <textarea placeholder="Job ..." onChange={this.handleJobChange} disabled={fetching} />
        </p>
        <p>
          <button disabled={this.checkInput() || fetching}>POST</button>
        </p>
      </form>
    );
  }
}
