import { Product } from "../entities/Product";
import ProductGateway from "../gateways/ProductGateway";

export class SearchService
{
    private ProductGateway: ProductGateway;
    private setProduct: (product: Product) => void;

    constructor(setProduct: (product: Product) => void, ProductGateway: ProductGateway)
    {
        this.setProduct = setProduct
        this.ProductGateway = ProductGateway
    }
// SearchService.ts
    async searchByBarcode(barcode: string): Promise<Product | null> {
        const product = await this.ProductGateway.searchByBarcode(barcode);
        if (product) {
            this.setProduct(product);
        }
        return product;
    }
  
} 