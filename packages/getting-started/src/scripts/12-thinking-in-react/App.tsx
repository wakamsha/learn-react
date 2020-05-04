// https://ja.reactjs.org/docs/thinking-in-react.html
import { ProductTable } from './components/ProductTable';
import { SearchBar } from './components/SearchBar';
import React from 'react';

export type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

type Props = {
  products: Product[];
};

type State = {
  filterText: string;
  stockOnly: boolean;
};

export const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

export class FilterableProductTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterText: '',
      stockOnly: false,
    };
  }

  private handleFilterTextChange = (filterText: string) => {
    this.setState({
      filterText,
    });
  };

  private handleStockChange = (stockOnly: boolean) => {
    this.setState({
      stockOnly,
    });
  };

  public render() {
    const { filterText, stockOnly } = this.state;
    return (
      <>
        <SearchBar
          filterText={filterText}
          stockOnly={stockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onStockChange={this.handleStockChange}
        />
        <ProductTable products={PRODUCTS} filterText={filterText} stockOnly={stockOnly} />
      </>
    );
  }
}
