import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return an array of rated products', () => {
      const products = service.getProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBe(10);
    });

    it('should return products with correct structure', () => {
      const products = service.getProducts();
      const firstProduct = products[0];
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('imgUrl');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('starCount');
      expect(firstProduct).toHaveProperty('brand');
      expect(firstProduct).toHaveProperty('discount');
      expect(firstProduct).toHaveProperty('type');
    });
  });

  describe('getProductsbyBrand', () => {
    it('should filter products by brand', () => {
      const filtered = service.getProductsbyBrand(['Casio']);
      expect(filtered.length).toBe(2);
      expect(filtered.every(p => p.brand === 'Casio')).toBe(true);
    });

    it('should filter by multiple brands', () => {
      const filtered = service.getProductsbyBrand(['Casio', 'Sony']);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every(p => p.brand === 'Casio' || p.brand === 'Sony')).toBe(true);
    });

    it('should return all products when no brands are specified', () => {
      const filtered = service.getProductsbyBrand([]);
      expect(filtered.length).toBe(10);
    });
  });

  describe('getProductsbyDiscount', () => {
    it('should filter products by discount', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyDiscount(allProducts, [20]);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every(p => p.discount === 20)).toBe(true);
    });

    it('should return all products when no discounts are specified', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyDiscount(allProducts, []);
      expect(filtered.length).toBe(10);
    });
  });

  describe('getProductsbyRating', () => {
    it('should filter products by rating', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyRating(allProducts, [1]);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every(p => p.starCount === 1)).toBe(true);
    });

    it('should return all products when no ratings are specified', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyRating(allProducts, []);
      expect(filtered.length).toBe(10);
    });
  });

  describe('getProductsbyType', () => {
    it('should filter products by type', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyType(allProducts, ['Watches']);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every(p => p.type === 'Watches')).toBe(true);
    });

    it('should return all products when no types are specified', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyType(allProducts, []);
      expect(filtered.length).toBe(10);
    });
  });

  describe('getProductsbyPrice', () => {
    it('should filter products by price range', () => {
      const allProducts = service.getProducts();
      const filtered = service.getProductsbyPrice(allProducts, ['10-50']);
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(product => {
        const price = Number(product.price.slice(1));
        expect(price).toBeGreaterThanOrEqual(10);
        expect(price).toBeLessThanOrEqual(50);
      });
    });
  });

  describe('getProductsSorted', () => {
    it('should sort products in descending order by price', () => {
      const sorted = service.getProductsSorted('Descending');
      for (let i = 0; i < sorted.length - 1; i++) {
        const price1 = Number(sorted[i].price.slice(1));
        const price2 = Number(sorted[i + 1].price.slice(1));
        expect(price1).toBeGreaterThanOrEqual(price2);
      }
    });

    it('should sort products in ascending order by price', () => {
      const sorted = service.getProductsSorted('Ascending');
      for (let i = 0; i < sorted.length - 1; i++) {
        const price1 = Number(sorted[i].price.slice(1));
        const price2 = Number(sorted[i + 1].price.slice(1));
        expect(price1).toBeLessThanOrEqual(price2);
      }
    });

    it('should sort products by rating when option is default', () => {
      const sorted = service.getProductsSorted('default');
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].starCount).toBeLessThanOrEqual(sorted[i + 1].starCount);
      }
    });
  });

  describe('getSortedProducts', () => {
    it('should apply all filters correctly', () => {
      const filtered = service.getSortedProducts(
        ['Casio'],
        [20],
        [1],
        ['Watches'],
        ['30-50']
      );
      
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(product => {
        expect(product.brand).toBe('Casio');
        expect(product.discount).toBe(20);
        expect(product.starCount).toBe(1);
        expect(product.type).toBe('Watches');
        const price = Number(product.price.slice(1));
        expect(price).toBeGreaterThanOrEqual(30);
        expect(price).toBeLessThanOrEqual(50);
      });
    });

    it('should return all products when no filters applied', () => {
      const filtered = service.getSortedProducts([], [], [], [], []);
      expect(filtered.length).toBe(10);
    });
  });
});

