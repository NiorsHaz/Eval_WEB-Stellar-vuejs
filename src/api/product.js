// src/api/product.js
import { bridge } from './bridge';

export class ProductManager {
  constructor() {
    this.products = [];
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    this.products = await bridge.getProducts();
    this.initialized = true;
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(p => p.id === id);
  }

  async refresh() {
    this.products = await bridge.getProducts();
  }
}

const productManager = new ProductManager();

export default productManager;
