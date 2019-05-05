import * as React from 'react';

type Props = {
  filterText: string;
  stockOnly: boolean;
  onFilterTextChange: (val: string) => void;
  onStockChange: (val: boolean) => void;
};

export class SearchBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onFilterTextChange(e.target.value);
  private handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.onStockChange(e.target.checked);

  public render() {
    const { filterText, stockOnly } = this.props;
    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} onChange={this.handleFilterTextChange} />
        <p>
          <label>
            <input type="checkbox" checked={stockOnly} onChange={this.handleStockChange} />
            Only show products in stock
          </label>
        </p>
      </form>
    );
  }
}
