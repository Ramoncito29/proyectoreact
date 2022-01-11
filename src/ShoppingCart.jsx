import React, { Component } from "react";
import Product from "./Product";
export default class ShoppingCart extends Component {
  //executes when the component is mounted
  constructor(props) {
    // console.log("constructor - ShoppingCart");
    super(props); //calling super class's constructor
    //initialization of the state
    this.state = {
      products: [],
    };
  }

  render() {
    //console.log("render - ShoppingCart");
    return (
      <div>
        <h4>Shopping Cart</h4>

        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="btn btn-primary">Buy now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }
  //render ends here//

  //Executes after constructor and render method(includes life cycle of child compoents, if any) of current component
  //it is recomended to do all http requests here
  componentDidMount = async () => {
    //fetch data from data source

    var response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });
    var prods = await response.json();

    console.log(prods);
    this.setState({ products: prods });

    //console.log("componentDidMount - ShoppingCart");
  };

  //componentDidUpdate(prevProps, prevState) {
  //console.log(
  //"componentDidUpdate - ShoppingCart",
  //prevProps,
  //prevState,
  //this.props,
  //this.state
  //);
  //if (prevProps.x != this.props.x) {
  //make http call
  //}
  //}
  //Executes when the current instance of current component is being deleted from memory
  componentWillUnmount() {
    //console.log("componentWillUnmount - ShoppingCart");
  }

  componentDidCatch(error, info) {
    //  console.log("componentDidCatch- ShoppingCart");
    //console.log(error, info);
    //localStorage.lastError = `${error}\n${JSON.stringify(info)}`;
  }

  //executes when user clikcs on + button
  handleIncrement = (product, maxValue) => {
    //get index of the selected product//
    let allProducts = [...this.state.products]; //the 3 dots gets all the contents of an array//
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;

      //updates the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };
  //executes when user clikcs on - button
  handleDecrement = (product, minValue) => {
    //get index of the selected product//
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;

      //updates the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };
  //executes when user clicks on X button in the product component
  handleDelete = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (window.confirm("Are you sure to delete?")) {
      //delete product based on index
      allProducts.splice(index, 1);

      //updates the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };
}
