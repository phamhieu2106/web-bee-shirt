import { Customer } from "./customer.class";

export class Address {
  id: number;
  tinh: number;
  huyen: string;
  xa: string;
  duong: string;
  macDinh: boolean;
  customer: Customer;
}
