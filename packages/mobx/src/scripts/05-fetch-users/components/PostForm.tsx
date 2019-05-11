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
  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.store.setName(e.target.value);

  private handleJobChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.props.store.setJob(e.target.value);

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.handlePostUser();
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'Idling',
    };
  }

  public render() {
    const fetching = this.state.status === 'Running';
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

  private checkInput(): boolean {
    const { name, job } = this.props.store;
    return !name || !job;
  }

  @transaction('status')
  private *handlePostUser() {
    yield this.props.store.postUser();
    yield this.props.store.getUser();
  }
}
