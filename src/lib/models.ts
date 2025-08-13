

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  password?: string;
  role: 'customer' | 'creator' | 'admin';
}

export interface Customer extends User {
  role: 'customer';
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  } | null;
  orderIds: string[];
}

export interface Creator extends User {
  role: 'creator';
  bio: string;
  storeName: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: ('manage_users' | 'manage_products' | 'view_analytics')[];
}
