import React, { useState } from "react";
import { IAuthProps } from "../../../models/auth-pages.model";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FullLogo, LoginPic } from "../../../assets";
import { useRegister } from "../../../hooks";
import { Controller, useForm } from "react-hook-form";
import { SignUpType } from "../../../types/user.type";
import {
  AuthFormBoxStyles,
  AuthFormLogoStyle,
  AuthFormMainBoxStyles,
  AuthFormSubmitButtonStyles,
  AuthImageBoxStyles,
  AuthImageStyles,
  AuthMainBoxStyles,
  AuthSwitchFormsStyles,
} from "../auth-styles";
import { LoadingButton } from "@mui/lab";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../validators";

const RegisterPage: React.FC<IAuthProps> = ({ signUp, setSignUp }) => {
  const { register, loading } = useRegister();
  const { control, handleSubmit } = useForm<SignUpType>({
    resolver: yupResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmit = (data: SignUpType) => {
    register(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={AuthMainBoxStyles}>
      <Box sx={AuthImageBoxStyles}>
        <Avatar src={LoginPic} sx={AuthImageStyles} />
      </Box>
      <Box sx={AuthFormMainBoxStyles}>
        <Avatar variant="square" src={FullLogo} sx={AuthFormLogoStyle} />
        <Box mt={2} position="relative" sx={AuthFormBoxStyles}>
          <Typography variant="h4" color={"primary.light"}>
            Sign Up
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", marginTop: 1 }}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Full Name"
                  autoFocus
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="emailId"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  autoFocus
                  placeholder="example@coldmail.com"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Confirm Password is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              loading={loading}
              disabled={loading}
              sx={AuthFormSubmitButtonStyles}
            >
              Sign Up
            </LoadingButton>
            <Typography
              textAlign={"left"}
              onClick={() => setSignUp(!signUp)}
              sx={AuthSwitchFormsStyles}
            >
              Already have an account? Sign In Now!
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
