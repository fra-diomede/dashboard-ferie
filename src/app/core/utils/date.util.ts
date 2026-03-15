import { format, isValid, parse, parseISO } from 'date-fns';

export const IT_DATE_FORMAT = 'dd/MM/yyyy';
const ISO_DATE_FORMAT = 'yyyy-MM-dd';

function isItalianDateString(value: string) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
}

function isIsoDateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function normalizeDate(value: Date | string) {
  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }

  if (isItalianDateString(value)) {
    return parseItalianDate(value);
  }

  if (isIsoDateString(value)) {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  }

  const parsed = new Date(value);
  return isValid(parsed) ? parsed : null;
}

export function parseItalianDate(value?: string | null) {
  if (!value) return null;
  const parsed = parse(value, IT_DATE_FORMAT, new Date());
  return isValid(parsed) && format(parsed, IT_DATE_FORMAT) === value ? parsed : null;
}

export function toItalianDate(value: Date | string) {
  const normalized = normalizeDate(value);
  return normalized ? format(normalized, IT_DATE_FORMAT) : '';
}

export function toIsoDate(value: Date | string) {
  const normalized = normalizeDate(value);
  return normalized ? format(normalized, ISO_DATE_FORMAT) : '';
}
