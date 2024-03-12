import React, { useState, useEffect } from 'react';

function ShoppingCart({ cartItems, totalPrice, removeFromCart, clearCart, handleCheckout }) {
  return (
    <div className="col-md-4">
      <h2 className="mt-3">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ₹{item.price}</p>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <p>Total Price: ₹{totalPrice}</p>
          <button className="btn btn-warning mx-2" onClick={clearCart}>Clear Cart</button>
          <button className="btn btn-success" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Leptop', price: 3000, category: 'Electronics' },
    { id: 2, name: 'Tshirt', price: 300, category: 'Clothing' },
    { id: 3, name: 'Mobile', price: 15000, category: 'Electronics' },
    { id: 4, name: 'Jeans', price: 2500, category: 'Clothing' },

  ]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [filterByCategory, setFilterByCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let filteredProductsByCategory = filterByCategory
      ? products.filter(product => product.category === filterByCategory)
      : products;

    if (searchTerm) {
      filteredProductsByCategory = filteredProductsByCategory.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sortedProducts = filteredProductsByCategory.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(sortedProducts);
  }, [products, sortBy, filterByCategory, searchTerm]);

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

  const handleCategoryFilter = e => {
    setFilterByCategory(e.target.value);
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice + product.price);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    const removedItem = cartItems.find(item => item.id === productId);
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice - removedItem.price);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout");
  };

  return (
    <div className="container">
      <div className="row">
        <div className={cartItems.length === 0 ? "col-md-12" : "col-md-8"}>
          <h2 className="mt-3">Product Listing Page</h2>
          <div className="row mt-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={sortBy} onChange={handleSortChange}>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={filterByCategory} onChange={handleCategoryFilter}>
                <option value="">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
              </select>
            </div>
          </div>
          <div className="row mt-3">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ₹{product.price}</p>
                    <p className="card-text">Category: {product.category}</p>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {cartItems.length > 0 && (
          <ShoppingCart
            cartItems={cartItems}
            totalPrice={totalPrice}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            handleCheckout={handleCheckout}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
