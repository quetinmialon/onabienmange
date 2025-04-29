import ProductGateway from "../gateways/ProductGateway";
import { Product } from "../entities/Product";
import { ApiRoutes } from "../endpoints/api";

export default class OpenFoodFactProductService implements ProductGateway {
    async searchByBarcode(barcode: string): Promise<Product | null> {
      try {
        const response = await fetch(`${ApiRoutes.Barcode}/${barcode}.json`);
        const data = await response.json();
        if (response.ok && data.product) {
          const product: Product = {
            barcode: data.code,
            name: data.product.product_name || "Unknown",
            brand: data.product.brands || "Unknown",
            nutriscore: data.product.nutriscore_score?.toString() || "Unknown",
          };
          return product;
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      return null;
    }
  }
  