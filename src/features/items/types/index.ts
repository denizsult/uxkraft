// Phase as numeric string: '1', '2', '3', '4'
export type ItemPhase = '1' | '2' | '3' | '4';

export type ItemPlanning = {
  id: string;
  po_approval_date: string | null;
  hotel_need_by_date: string | null;
  expected_delivery: string | null;
  created_at: string;
  updated_at: string;
};

export type ItemProduction = {
  id: string;
  production_start_date: string | null;
  production_end_date: string | null;
  qa_passed: boolean;
  created_at: string;
  updated_at: string;
};

export type ItemShipping = {
  id: string;
  ship_date: string | null;
  tracking_number: string | null;
  carrier: string | null;
  delivery_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Item = {
  id: string;
  spec_number: string | null;
  item_name: string;
  vendor: string | null;
  ship_to: string | null;
  qty: number;
  phase: ItemPhase | null;
  price: number;
  ship_notes: string | null;
  location: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
  planning?: ItemPlanning;
  production?: ItemProduction;
  shipping?: ItemShipping;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type CreateItemDto = {
  spec_number?: string;
  item_name: string;
  vendor?: string;
  ship_to?: string;
  qty: number;
  phase?: ItemPhase;
  price?: number;
  ship_notes?: string;
  location?: string;
  category?: string;
};

export type UpdateItemDto = Partial<CreateItemDto>;

export type UpdatePlanningDto = {
  po_approval_date?: string | null;
  hotel_need_by_date?: string | null;
  expected_delivery?: string | null;
};

export type BulkUpdateItemsDto = {
  item_ids: string[];
  location?: string;
  category?: string;
};

export type BulkUpdateTrackingDto = {
  item_ids: string[];
  planning?: UpdatePlanningDto;
  production?: {
    production_start_date?: string | null;
    production_end_date?: string | null;
    qa_passed?: boolean;
  };
  shipping?: {
    ship_date?: string | null;
    tracking_number?: string | null;
    carrier?: string | null;
    delivery_date?: string | null;
  };
};

export type QueryItemsDto = {
  page?: number;
  limit?: number;
  search?: string;
  vendor?: string;
  phase?: ItemPhase;
  location?: string;
};