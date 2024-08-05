import { FieldError } from "react-hook-form";

export type ArticleInterface = {
  id: string;
  nameItem: string;
  quantity: string;
  price: string;
  total:string
};

export type DataForm = {
  nameSender: string;
  emailSender: string;
  jobSender: string;
  streetSender: string;
  stateSender: string;
  citySender: string;
  countrySender: string;
  nameReceiver: string;
  emailReceiver: string;
  streetReceiver: string;
  stateReceiver: string;
  cityReceiver: string;
  countryReceiver: string;
  serviceDescription: string;
  articles: ArticleInterface[];
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames | string;
  error: FieldError | undefined;
  label?: string;
  valueAsNumber?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control: any;
};

export type ValidFieldNames =
  | "nameSender"
  | "emailSender"
  | "jobSender"
  | "streetSender"
  | "stateSender"
  | "citySender"
  | "countrySender"
  | "nameReceiver"
  | "emailReceiver"
  | "streetReceiver"
  | "stateReceiver"
  | "cityReceiver"
  | "countryReceiver"
  | "serviceDescription"
  | "nameItem"
  | "quantity"
  | "price";
