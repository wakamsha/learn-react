import * as React from 'react';
import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';
import { observer } from 'mobx-react';

type Props = {
  store: JSONPlaceholderStore;
};

@observer
export class PostForm extends React.Component<Props> {
  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.store.setName(e.target.value);

  private handleJobChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.props.store.setJob(e.target.value);

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.store.postUser();
  };

  private checkInput(): boolean {
    const { name, job, fetching } = this.props.store;
    return !name || !job || fetching;
  }

  public render() {
    const { fetching } = this.props.store;
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
          <button disabled={this.checkInput()}>POST</button>
        </p>
      </form>
    );
  }
}
