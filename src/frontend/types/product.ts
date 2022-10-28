export enum ProductStatus {
  PUBLISHED,
  DRAFT,
  TRASH,
}

export interface Product {
  id: string;
  code: string;
  barcode: string;
  status: ProductStatus;
  imported_t: Date;
  url: string;
  product_name: string;
  quantity?: string;
  categories?: string;
  packaging?: string;
  brands?: string;
  image_url?: string;
}
