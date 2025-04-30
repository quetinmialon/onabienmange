import { Product } from "../entities/Product";
export default interface ProductGateway {
     getProductByBarcode: (barcode: string) => Promise<Product | null>;
     saveProduct: (product: Product) => Promise<void>;
}
