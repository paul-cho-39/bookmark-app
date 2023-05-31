// to pass control as props it is required to pass defaultValues

type LoginFormValues = {
   email: string;
   password: string;
};

type SignUpFormValues = {
   email: string;
   name: string;
   password: string;
};

export type OmitMultiple<T, K extends keyof any> = K extends keyof T ? Omit<T, K> : T;

export type { LoginFormValues, SignUpFormValues };
