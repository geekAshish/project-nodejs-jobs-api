export interface ProductsQueryInterface {
  name?: string;
  price?: string;
  rating?: string;
  company?: string[] | string;
  featured?: boolean;
  createdAt?: string;
}
