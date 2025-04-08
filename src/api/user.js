import { bridge } from './bridge';  // Ensure you're importing the bridge instance

class UserManager {
  constructor() {
    this.name = localStorage.getItem('stellar_username') || null;
    this.token = localStorage.getItem('token') || null;
    this.basket = JSON.parse(localStorage.getItem('stellar-basket')) || [];
  }

  async login(username, password) {
    const data = await bridge.login(username, password);
    if (data.success.token) {
      this.token = data.success.token;
      this.name = username;
      localStorage.setItem('stellar_username', username);
      this.clearBasket();
    }
    return data;
  }

  logout() {
    this.token = null;
    this.name = null;
    localStorage.removeItem('token');
    localStorage.removeItem('stellar_username');
  }

  isLoggedIn() {
    return !!this.token;
  }

  getName() {
    return this.name;
  }

  // Basket Management
  addToBasket(product, quantity) {
    const found = this.basket.find(p => p.id === product.id);
    if (!found) {
      this.basket.push({ ...product, quantity: quantity });
    } else {
      found.quantity++;
    }
    this._saveBasket();
  }

  removeFromBasket(productId) {
    this.basket = this.basket.filter(p => p.id !== productId);
    this._saveBasket();
  }

  clearBasket() {
    this.basket = [];
    this._saveBasket();
  }

  getBasket() {
    return this.basket;
  }

  _saveBasket() {
    localStorage.setItem('stellar-basket', JSON.stringify(this.basket));
  }

  // Method to place an order, calling the Bridge's createOrder
  async placeOrder() {
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];  // Format as YYYY-MM-DD
      const user = await bridge.getUserId();
      // console.log(user);
      
      const orderData = {
        socid: user,
        date: formattedDate,
        lines: this.getBasket().map(product => ({
          fk_product: product.id,
          qty: product.quantity,
          subprice: product.price,
          tva_tx: 20, 
        }))
      };

      console.log(orderData);

      const orderResponse = await bridge.createOrder(orderData); 
      console.log('Order placed successfully:', orderResponse);
      this.clearBasket();
      return orderResponse;
    } catch (error) {
      // console.error('Error placing order:', error);
      throw error;
    }
  }
}

const userManager = new UserManager();

export default userManager;
