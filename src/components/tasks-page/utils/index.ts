import type { Column } from '@tanstack/react-table';

export function createNameTableHeader<TData>(
  column: Column<TData, unknown> | undefined
) {
  if (!column) return '';

  const columnMeta = column.columnDef.meta as { title?: string };
  const title =
    columnMeta?.title && typeof columnMeta.title === 'string'
      ? columnMeta.title
      : undefined;
  return (
    title ||
    (typeof column.columnDef.header === 'string'
      ? column.columnDef.header
      : column.id)
  );
}
