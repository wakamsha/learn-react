import * as React from 'react';

type TodoItem = {
  id: number;
  text: string;
};

type ListProps = {
  items: TodoItem[];
};

class TodoList extends React.Component<ListProps> {
  public render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

type TodoState = {
  items: TodoItem[];
  text: string;
};

export class Todo extends React.Component<{}, TodoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo" style={{ display: 'block' }}>
            What needs to be done?
          </label>
          <input type="new-todo" onChange={this.handleChange} value={this.state.text} />
          <button>Add #{this.state.items.length + 1}</button>
        </form>
      </div>
    );
  }

  private handleChange(e: React.ChangeEvent) {
    this.setState({ text: (e.target as HTMLInputElement).value });
  }

  private handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!this.state.text) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: '',
    }));
  }
}
