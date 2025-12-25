export type ProductFormType = {
  name: string;
  productCode: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  category: 'Featured' | 'Chairs' | 'Armchairs' | 'TableLamp' | 'CeilingLight' | 'Decors' | 'Rugs' | 'Cushions';
  price: string;
  photo?: string | null;
  userId: string;
};