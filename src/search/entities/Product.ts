export interface Product  {
    barcode: string;
    name: string;
    brand: string | null;
    nutriscore: string | null;
    error? : string;
}