enum UserRole {
  CONTRIBUTOR = 1,
  CUSTOMER = 2,
}

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  recaptchaResponse?: string;
  role: number;
}

interface RegisteredUser {
  username: string;
  email: string;
}
