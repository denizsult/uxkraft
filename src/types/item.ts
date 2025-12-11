 
export interface Item {
  id: number;
  spec_number: string | null;
  item_name: string;
  ship_from: string;
  ship_to: string;
  qty: number;
  phase: string;
  price: string;
  item_notes: string | null;
  location: string;
  category: string;
  created_at: string;
  updated_at: string;
  planning: Planning | null;
  production: Production | null;
  shipping: Shipping | null;
}

export interface Planning {
  id: number;
  item_id: number;
  po_approval_date: Date | null;
  hotel_need_by_date: Date | null;
  expected_delivery: Date | null;
  created_at: string;
  updated_at: string;
}

export interface Production {
  id: number;
  item_id: number;
  cfa_shops_send: Date | null;
  cfa_shops_approved: Date | null;
  cfa_shops_delivered: Date | null;
  created_at: string;
  updated_at: string;
}

export interface Shipping {
  id: number;
  item_id: number;
  ordered_date: Date | null;
  shipped_date: Date | null;
  delivered_date: Date | null;
  shipping_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
