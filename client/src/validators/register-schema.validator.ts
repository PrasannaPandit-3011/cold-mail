import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  emailId: yup
    .string()
    .email("Invalid email format")
    .required("Unique email id is required")
    .matches(/@coldmail\.com$/, "Email must end with @coldmail.com"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
      "Password must be between 8-30 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .test(
      "password-not-contains-password",
      "Password must not contain the word 'password'",
      (value: string) => !/password/i.test(value)
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
