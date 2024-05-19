export interface Data {
  productName: string;
  category: string;
  description: string;
  expiryDate: string;
  costPrice: number;
  sellPrice: number;
  discount: number;
  discountSellPrice: number;
  finalPrice: number;
  actions: JSX.Element;
  id: string;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteDialog: () => void;
  handleAdd: () => void;
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Products {
  id?: string;
  productName: string;
  category: string;
  description: string;
  expiryDate: string;
  costPrice: number;
  sellPrice: number;
  discount: number;
  discountSellPrice: number;
  finalPrice: number;
}

export interface TableData {
  id: string;
  employeeName: string;
  email: string;
  age: number;
  city: string;
}

export interface SnackbarState {
  message: string;
  severity: string;
  snackbarActive: boolean;
}
