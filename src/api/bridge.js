import { ref } from "vue";

// src/api/bridge.js
const API_URL = "http://localhost/Stellar/api/index.php";

class Bridge {
  constructor(apiKey = null) {
    this.apiKey = apiKey || localStorage.getItem('token') || '';
  }

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('token', key);
  }

  getHeaders() {
    return {
      'DOLAPIKEY': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  async get(endpoint) {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: this.getHeaders()
    });
    return res.json();
  }

  async post(endpoint, data) {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (err) {
      // console.error("❌ Raw response that failed to parse:", text);  
      throw new SyntaxError("Non-JSON response");
    }
  }

  async login(username, password) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: username,
        password: password
      })
    });

    const data = await res.json();

    if (data.success && data.success.token) {
      // Save token to localStorage
      localStorage.setItem('token', data.success.token);
      // console.log('Token saved to localStorage:', data.success.token);
    } else {
      console.error('Login failed', data.success.message);
    }

    return data;
  }

  // Use the post method to create an order, passing order data
  async createOrder(orderData) {
    try {
      const response = await this.post('orders', orderData);
      console.log('Order created successfully:', response);
      return response;
    } catch (error) {
      // console.error('Error creating order:', error);
      throw error;  // Optionally rethrow the error
    }
  }

  async getOrder() {
    return this.get('orders');
  }


  async getInvoice() {
    return this.get('invoices');
  }

  async getOrderBySocid(socid) {
    return this.get(`orders/orders?socid=${socid}`);
  }

  async getProducts() {
    return this.get('products');
  }

  async getProduct(id) {
    return this.get(`products/${id}`);
  }

  async updateRatingProduct(ref, label, rating) {
    const orderData = {
      array_options: {
        options_rating: rating,
      }
    };
    const res = await fetch(`${API_URL}/products/${ref}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData)
    });

    const text = await res.text();
    // return true;
    // return JSON.parse(text);
    try {
      return JSON.parse(text);
    } catch (err) {
      // window.location.reload();
      throw new SyntaxError("Non-JSON response");
    }

    // return this.post(`products?id=${id}`, orderData);
  }

  async createThirdParty(userData) {
    return this.post('thirdparties', userData);
  }

  async createUser(userData) {
    return this.post('users', userData);
  }

  async getUserId() {
    const res = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    const userData = await res.json();

    const foundUser = userData.find(user => user.login === localStorage.getItem('stellar_username'));

    if (foundUser) {
      console.log("✅ Found user:", foundUser.ref);
      return foundUser.ref;
    } else {
      console.warn("❌ User not found");
      return null;
    }
  }


}

export const bridge = new Bridge();
