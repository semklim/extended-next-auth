import { format, parse } from 'date-fns';

/**
 * Parses a date string in various formats and returns a Date object
 * @param dateString - The date string to parse
 * @returns Date object
 */
export const parseDate = (dateString?: string | null): Date | null => {
  if (!dateString) return null;

  // Check if the date is in dd.MM.yyyy format
  if (dateString.includes('.')) {
    return parse(dateString, 'dd.MM.yyyy', new Date());
  }

  // If not in dd.MM.yyyy format, try standard parsing
  return new Date(dateString);
};

/**
 * Formats a date string to the specified output format
 * @param dateString - The date string to format
 * @param outputFormat - The desired output format (default: 'yyyy-MM-dd')
 * @returns Formatted date string or empty string if input is invalid
 */
export const formatDate = (
  dateString?: string | null,
  outputFormat = 'yyyy-MM-dd'
): string => {
  if (!dateString) return '';

  try {
    const date = parseDate(dateString);
    if (!date) return '';
    return format(date, outputFormat);
  } catch {
    return '';
  }
};
