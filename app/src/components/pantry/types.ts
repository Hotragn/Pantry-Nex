export interface PantryItem {
  labels: never[];
  category: string;
  expirationDate: any;
  id?: string;
  name: string;
  quantity: number; // Add quantity field
  imageUrl?: string; // Optional image URL
}
