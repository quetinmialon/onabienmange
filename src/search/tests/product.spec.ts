import {describe, expect, test} from 'vitest';
import { Product } from '../entities/Product';
import ProductGateway from '../gateways/ProductGateway';
import OpenFoodFactProductService from '../repository/OpenFoodFactProductService';

describe('product',() => {
    test('Product should have a barcode, name, brand and nutriscore', () => {
        const product: Product = {
            barcode: '1234567890123',
            name: 'Test Product',
            brand: 'Test Brand',
            nutriscore: 'A'
        };
        expect(product.barcode).toBe('1234567890123');
        expect(product.name).toBe('Test Product');
        expect(product.brand).toBe('Test Brand');
        expect(product.nutriscore).toBe('A');
    });

    test('OFPS should have a searchByBarcode and implement ProductGateway', () => {
        const service = new OpenFoodFactProductService();
        expect(typeof service.searchByBarcode).toBe('function');
        expect(typeof (service as ProductGateway)).toBe('object');
    });

    test('OFPS should return a product with a barcode, name, brand and nutriscore', async () => {
        const service = new OpenFoodFactProductService();
        const product = await service.searchByBarcode('1234567890123');
        expect(product).toBeDefined();
        expect(product?.barcode).toBeDefined();
        expect(product?.name).toBeDefined();
        expect(product?.brand).toBeDefined();
        expect(product?.nutriscore).toBeDefined();
    });
    test('OFPS should return null for an invalid barcode', async () => {
        const service = new OpenFoodFactProductService();
        const product = await service.searchByBarcode('invalid-barcode');
        expect(product).toBeNull();
    });
    
});