import { useAtom, useAtomValue } from "jotai";
import { MailBoxType } from "../../../types";
import { mailboxAtom, totalAtom } from "../../../atoms";
import { useFetchEmails, useReadEmail } from "../../../hooks";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";
import StarEmail from "./star-email.component";
import { Box, Chip } from "@mui/material";
import FromToColoumn from "./from-to-coloumn.component";
import Content from "./content.component";
import formatDate from "../../../utils/format-date.util";
import Actions from "./actions.component";
import { IMailBoxTableProp } from "../../../models";
import { chipColor } from "../../../utils";

const MailBoxTable: React.FC<IMailBoxTableProp> = ({ mailBoxType }) => {
  const [mailBox, setMailBox] = useAtom<MailBoxType[]>(mailboxAtom);
  const total = useAtomValue<number>(totalAtom);

  const { fetchEmails } = useFetchEmails(mailBoxType);
  const { readEmail } = useReadEmail();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handleReadStatusChange = (id: string, status: boolean) => {
    if (mailBoxType !== "outbox") {
      setMailBox((prev) =>
        prev.map((mail) => (mail._id === id ? { ...mail, read: status } : mail))
      );
      readEmail(id, status);
    }
    navigate(`/email/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const emails = await fetchEmails(page, limit);
      if (emails) {
        setMailBox(emails);
      }
    };

    fetchData();
  }, [page, limit, mailBoxType]); //eslint-disable-line

  const columns: MUIDataTableColumn[] = [
    {
      name: "isFavorite",
      label: "Favorite",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({
          style: {
            fontWeight: "bold",
            color: "#8de4ea",
            width: "100px",
          },
        }),
        customBodyRender: (_value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const mail = mailBox[rowIndex];
          return <StarEmail mail={mail} />;
        },
      },
    },
    {
      name: "type",
      label: "Priority",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({
          style: {
            fontWeight: "bold",
            color: "#8de4ea",
            width: "100px",
          },
        }),
        customBodyRender: (value) => {
          const chipLabel = value.charAt(0).toUpperCase() + value.slice(1);
          return <Chip label={chipLabel} color={chipColor[value]} />;
        },
      },
    },
    {
      name: mailBoxType === "outbox" ? "to" : "from",
      label: mailBoxType === "outbox" ? "To" : "From",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({
          style: {
            fontWeight: "bold",
            color: "#8de4ea",
          },
        }),
        setCellProps: () => ({
          style: {
            width: "250px",
          },
        }),
        customBodyRender: (_value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const mail = mailBox[rowIndex];
          return <FromToColoumn mailBoxType={mailBoxType} mail={mail} />;
        },
      },
    },
    {
      name: "subject",
      label: "Content",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({
          style: {
            fontWeight: "bold",
            color: "#8de4ea",
          },
        }),
        customBodyRender: (_value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const mail = mailBox[rowIndex];
          return <Content mail={mail} />;
        },
      },
    },
    {
      name: "createdAt",
      label: "Date",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({
          style: {
            fontWeight: "bold",
            color: "#8de4ea",
          },
        }),
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({
          style: {
            fontWeight: "bold",
            color: "#8de4ea",
          },
        }),
        customBodyRender: (_value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const mail = mailBox[rowIndex];
          return <Actions mail={mail} mailBoxType={mailBoxType} />;
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    elevation: 12,
    download: false,
    print: false,
    filter: false,
    sort: false,
    search: false,
    viewColumns: false,
    selectableRows: "single",
    responsive: "standard",
    serverSide: true,
    count: total,
    rowsPerPage: limit,
    rowsPerPageOptions: [10, 25],
    page,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setPage(tableState.page);
          break;
        case "changeRowsPerPage":
          setLimit(tableState.rowsPerPage);
          break;
        default:
          break;
      }
    },
    onRowClick: (_rowData, rowMeta) => {
      const rowIndex = rowMeta.dataIndex;
      const mail = mailBox[rowIndex];
      handleReadStatusChange(mail._id!, true);
    },
    setRowProps: () => ({
      style: { cursor: "pointer" },
    }),
    tableBodyHeight: "80vh",
  };

  return (
    <Box
      sx={{
        height: "88vh",
        mt: 2,
      }}
    >
      <MUIDataTable
        title={""}
        data={mailBox}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default MailBoxTable;
