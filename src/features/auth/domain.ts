export type SignUpFormStateErrors = {
  login?: string;
  password?: string;
  tel?: string;
  code?: string;
  _errors?: string;
};

export type SignUpFormState = {
  formData?: FormData;
  errors?: SignUpFormStateErrors;
};
