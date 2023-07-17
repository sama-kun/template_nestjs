import { IsNotEmpty } from 'class-validator';

export class SearchQueryDto {
  pagination: Pagination;
}

class Pagination {
  page: number;
  pageSize: number;
}
