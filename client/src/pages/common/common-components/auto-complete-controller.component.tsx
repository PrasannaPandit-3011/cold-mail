import {
  Autocomplete,
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { UserType } from "../../../types/user.type";
import { CreateMailType } from "../../../types/mail-box.type";

interface IAutoCompleteProps {
  name: keyof CreateMailType;
  label: string;
  control: Control<CreateMailType, unknown>;
  users: UserType[];
  loading: boolean;
  required?: boolean;
}

const AutoComplete: React.FC<IAutoCompleteProps> = ({
  name,
  label,
  control,
  users,
  loading,
  required,
}) => (
  <Box sx={{ marginBottom: 2 }}>
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option: UserType) => option.name}
          filterSelectedOptions
          loading={loading}
          value={users.filter((user) => value.includes(user._id ?? ""))}
          onChange={(_, newValue) => onChange(newValue.map((user) => user._id))}
          renderOption={(props, option: UserType) => (
            <li {...props} key={option._id}>
              <Avatar alt={option.name} src="" />
              <Box sx={{ ml: 2 }}>
                <Typography>{option.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {option.emailId}
                </Typography>
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error ? error.message : null}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
      rules={required ? { required: `The "${label}" field is required` } : {}}
    />
  </Box>
);

export default AutoComplete;
