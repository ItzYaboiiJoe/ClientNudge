export type CustomerType = {
  id: number;
  ownerUserId: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  notes: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCustomerType = {
  name: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
};
