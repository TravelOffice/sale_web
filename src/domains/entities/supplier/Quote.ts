export interface Quote {
  name: string;
  unit: string;
  price: number;
  link: string;
  year: number;
  description: string;
}
export interface AddingQuoteFormData extends Quote {
  attachment: FileList;
}
