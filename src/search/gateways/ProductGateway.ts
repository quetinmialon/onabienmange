import { Product } from "../entities/Product";
export default interface ProductGateway {
     searchByBarcode: (barcode: string) => Promise<Product | null>;
}
