export interface ApiResponse<T>  {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T[];
  }