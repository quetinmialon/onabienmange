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
    async searchByBarcode(barcode: string): Promise<void> {
        const product = await this.ProductGateway.searchByBarcode(barcode);
        if (!product) {
            throw new Error("Product not found for the given barcode.");
        }
        this.setProduct(product);
    }
} 