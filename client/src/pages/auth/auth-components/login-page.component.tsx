import { useState } from "react";
import { IAuthProps } from "../../../models/auth-pages.model";
import useLogin from "../../../hooks/use-login.hook";
import { Controller, useForm } from "react-hook-form";
import { LogInType } from "../../../types/user.type";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FullLogo, LoginPic } from "../../../assets";
import {
  AuthSwitchFormsStyles,
  AuthFormBoxStyles,
  AuthFormLogoStyle,
  AuthFormMainBoxStyles,
  AuthFormSubmitButtonStyles,
  AuthImageBoxStyles,
  AuthImageStyles,
  AuthMainBoxStyles,
} from "../auth-styles/authentication.styles";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validators";

const LoginPage: React.FC<IAuthProps> = ({ signUp, setSignUp }) => {
  const { login, loading } = useLogin();
  const { control, handleSubmit, setError } = useForm<LogInType>({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onSubmit = async (data: LogInType) => {
    try {
      await login(data);
    } catch (error) {
      setError("emailId", {
        type: "manual",
        message: "Incorrect credentials",
      });
      setError("password", {
        type: "manual",
        message: "Incorrect credentials",
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box sx={AuthMainBoxStyles}>
        <Box sx={AuthImageBoxStyles}>
          <Avatar src={LoginPic} sx={AuthImageStyles} />
        </Box>
        <Box sx={AuthFormMainBoxStyles}>
          <Avatar variant="square" src={FullLogo} sx={AuthFormLogoStyle} />
          <Box mt={2} position="relative" sx={AuthFormBoxStyles}>
            <Typography variant="h4" color={"primary.light"}>
              Log In
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", marginTop: 1 }}
            >
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
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={loading}
                disabled={loading}
                sx={AuthFormSubmitButtonStyles}
              >
                Sign In
              </LoadingButton>
              <Typography
                textAlign={"left"}
                onClick={() => setSignUp(!signUp)}
                sx={AuthSwitchFormsStyles}
              >
                Don't have an account? Sign Up Now!
              </Typography>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
