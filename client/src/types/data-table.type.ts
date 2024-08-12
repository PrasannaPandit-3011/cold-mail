export type TableMeta = {
  rowIndex: number;
  columnIndex: number;
  rowData: unknown[];
  tableData: unknown[];
  columnData: unknown[];
  tableState: {
    page: number;
    rowsPerPage: number;
    filterList: unknown[];
    searchText?: string;
    sortOrder?: {
      name: string;
      direction: "asc" | "desc";
    };
  };
};
