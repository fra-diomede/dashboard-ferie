import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const IT_DATE_FORMAT = 'DD/MM/YYYY';

export function parseItalianDate(value?: string | null) {
  if (!value) return null;
  const parsed = dayjs(value, IT_DATE_FORMAT, true);
  return parsed.isValid() ? parsed : null;
}

export function toItalianDate(value: Date | string) {
  return dayjs(value).format(IT_DATE_FORMAT);
}

export function toIsoDate(value: Date | string) {
  return dayjs(value).format('YYYY-MM-DD');
}
