export interface FinancialModal {
    id: number;
    statement: string;
    selected: boolean;
    lower_limit: number;
    upper_limit: number;
    is_range: boolean;
    unit: string;
    currency: string;
  }
  