export const getCart = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };
  
  export const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const addToCart = (item) => {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
  
    saveCart(updatedCart);
    return updatedCart;
  };
  
  export const removeFromCart = (itemId) => {
    const cart = getCart();
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === itemId) {
        if (cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
          return null; 
        }
      }
      return cartItem;
    }).filter(item => item !== null);
  
    saveCart(updatedCart);
    return updatedCart;
  };  
  
  export const getTotalItems = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  