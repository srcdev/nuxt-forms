import type { IOptionsConfig } from '@/types/types.forms';

export interface IFormMultipleOptions {
  data: IOptionsConfig[];
  total: number;
  skip: number;
  limit: number;
}
