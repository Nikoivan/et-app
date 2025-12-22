export type OtpVefifyResponse<T extends boolean = boolean> = {
  success: T;
  error?: T extends false ? string : never;
};
