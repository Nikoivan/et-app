import { v4 } from 'uuid';

export function formatNumber(value: string): string {
  return value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5');
}

export function getUniqName(name: string): string {
  return `${v4()}-${name}`;
}
