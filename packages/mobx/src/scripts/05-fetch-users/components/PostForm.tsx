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

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>POST</h3>
        <p>
          <input placeholder="Name ..." onChange={this.handleNameChange} />
        </p>
        <p>
          <textarea placeholder="Job ..." onChange={this.handleJobChange} />
        </p>
        <p>
          <button>POST</button>
        </p>
      </form>
    );
  }
}
