import { observer } from 'mobx-react';
import { ChangeEvent, Component, FormEvent } from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { TransactionStatus, transaction } from '../utils/Decorator';

type Props = {
  store: JSONPlaceholderStore;
};

type State = {
  status: TransactionStatus;
};

@observer
export class PostForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: {},
    };
  }

  private handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { store } = this.props;

    store.setName(e.target.value);
  };

  private handleJobChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { store } = this.props;

    store.setJob(e.target.value);
  };

  private handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.handlePostUser();
  };

  @transaction('status')
  private *handlePostUser() {
    const { store } = this.props;

    yield store.postUser();
    yield store.getUser();
  }

  private checkInput(): boolean {
    const {
      store: { name, job },
    } = this.props;
    return !name || !job;
  }

  public render() {
    const { status } = this.state;
    const fetching = !!status.running;

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
