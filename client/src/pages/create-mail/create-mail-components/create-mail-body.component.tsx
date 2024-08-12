import { Box, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import useGetAllUsers from "../../../hooks/use-get-all-users.hook";
import { SeperatorBoxStyles } from "../create-mail-styles";
import { recipients } from "../../../utils";
import { IMailBodyProps } from "../../../models";
import { AutoComplete } from "../../common/common-components";

const MailBody: React.FC<IMailBodyProps> = ({ control, openFullScreen }) => {
  const { getAllUsers, users, loading } = useGetAllUsers();

  useEffect(() => {
    getAllUsers();
  }, []); // eslint-disable-line
  return (
    <>
      {recipients.map((r) => (
        <Box key={r.name} sx={SeperatorBoxStyles}>
          <AutoComplete
            name={r.name}
            label={r.label}
            control={control}
            users={users}
            loading={loading}
            required={r.required}
          />
        </Box>
      ))}
      <Box sx={SeperatorBoxStyles}>
        <Controller
          name="subject"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth label="Subject" />
          )}
          rules={{ required: false }}
        />
      </Box>
      <Box sx={SeperatorBoxStyles}>
        <Controller
          name="body"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <JoditEditor
              value={value}
              config={{
                readonly: false,
                height: openFullScreen ? 350 : 320,
                style: {
                  color: "#000",
                },
              }}
              onBlur={(newContent) => onChange(newContent)}
              onChange={() => {}}
            />
          )}
          rules={{ required: false }}
        />
      </Box>
    </>
  );
};

export default MailBody;
