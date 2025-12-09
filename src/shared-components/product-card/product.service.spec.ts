import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import Product from '../../app/models/product.interface';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return an array of products', () => {
      const products = service.getProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should return products with correct structure', () => {
      const products = service.getProducts();
      const firstProduct = products[0];
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('imgUrl');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('quantity');
    });
  });

  describe('setBoughtProducts', () => {
    it('should add a product to bought products', (done) => {
      const testProduct: Product = {
        name: 'Test Product',
        imgUrl: 'test.svg',
        price: '$10.00',
        quantity: 0
      };

      service.setBoughtProducts(testProduct);
      
      service.boughtProducts$.subscribe(products => {
        expect(products.length).toBe(1);
        expect(products[0].name).toBe('Test Product');
        expect(products[0].quantity).toBe(1);
        done();
      });
    });

    it('should increment quantity if product already exists', (done) => {
      const testProduct: Product = {
        name: 'Test Product',
        imgUrl: 'test.svg',
        price: '$10.00',
        quantity: 0
      };

      service.setBoughtProducts(testProduct);
      service.setBoughtProducts(testProduct);
      
      service.boughtProducts$.subscribe(products => {
        expect(products.length).toBe(1);
        expect(products[0].quantity).toBe(2);
        done();
      });
    });
  });

  describe('getSubTotalPrice', () => {
    it('should calculate correct subtotal', () => {
      const testProduct1: Product = {
        name: 'Product 1',
        imgUrl: 'test1.svg',
        price: '$10.00',
        quantity: 0
      };
      
      const testProduct2: Product = {
        name: 'Product 2',
        imgUrl: 'test2.svg',
        price: '$20.00',
        quantity: 0
      };

      service.clearBoughtProducts();
      service.setBoughtProducts(testProduct1);
      service.setBoughtProducts(testProduct2);
      
      const subtotal = service.getSubTotalPrice();
      expect(subtotal).toBe(30);
    });
  });

  describe('updateBoughtProducts', () => {
    it('should update product quantity', (done) => {
      const testProduct: Product = {
        name: 'Test Product',
        imgUrl: 'test.svg',
        price: '$10.00',
        quantity: 0
      };

      service.clearBoughtProducts();
      service.setBoughtProducts(testProduct);
      service.updateBoughtProducs(testProduct, 2);
      
      service.boughtProducts$.subscribe(products => {
        if (products.length > 0) {
          expect(products[0].quantity).toBe(3);
          done();
        }
      });
    });

    it('should remove product when quantity becomes 0', (done) => {
      const testProduct: Product = {
        name: 'Test Product',
        imgUrl: 'test.svg',
        price: '$10.00',
        quantity: 0
      };

      service.clearBoughtProducts();
      service.setBoughtProducts(testProduct);
      service.updateBoughtProducs(testProduct, -1);
      
      service.boughtProducts$.subscribe(products => {
        expect(products.length).toBe(0);
        done();
      });
    });
  });

  describe('clearBoughtProducts', () => {
    it('should clear all bought products', (done) => {
      const testProduct: Product = {
        name: 'Test Product',
        imgUrl: 'test.svg',
        price: '$10.00',
        quantity: 0
      };

      service.setBoughtProducts(testProduct);
      service.clearBoughtProducts();
      
      service.boughtProducts$.subscribe(products => {
        expect(products.length).toBe(0);
        done();
      });
    });
  });
});

