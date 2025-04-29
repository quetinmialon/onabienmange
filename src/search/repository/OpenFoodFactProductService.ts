import ProductGateway from "../gateways/ProductGateway";
import { Product } from "../entities/Product";
import { ApiRoutes } from "../endpoints/api";

export default class OpenFoodFactProductService implements ProductGateway {
    async searchByBarcode(barcode: string): Promise<Product | null> {
    try {
      const response = await fetch(`${ApiRoutes.Barcode}/${barcode}.json`);
      const data = await response.json();
        if (data.status === 0){
            const product = {
                barcode: barcode,
                name: "Unknown",
                brand: "Unknown",
                nutriscore: "Unknown",
                error: "Produit non trouvé"
            }
            return product
        }
        const product: Product = {
            barcode: data.product.code,
            name: data.product.product_name,
            brand: data.product.brands || "Unknown",
            nutriscore: data.product.nutriscore_data?.grade || "Unknown",
        };
        return product;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      return null;
    }
}