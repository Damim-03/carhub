import {LucideIcon, LucideProps} from "lucide-react";
import {ChangeEvent, MouseEventHandler} from "react";
import {ProductDetails} from "../pages/Products/data/productData.ts";

export interface CarProps {
  id: number;
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface InputFieldProps {
  icon: React.ComponentType<LucideProps>;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Properly typed
  required?: boolean;
  autoComplete?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  paymentStatus: string;
}

export interface PaymentContextType {
  amount: number; // Explicitly type amount as number
  // ...other payment methods
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  totalSpent: number;
  totalOrders: number;
  joinDate: string;
  status: "Active" | "Inactive";
  pendingOrders: Order[];
}

export interface ProductProps {
  index: number;
  title: string;
  value: string;
  image: string;
  link?: string;
  product: string;
}

export interface User {
  id: number;
  name: string;
  picture: string;
}

export interface FilterProps {
  manufacturer: string;
  year: number;
  model: string;
  limit: number;
  fuel: string;
}

export interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface Product_Props {
  image: string;
  name: string;
  slug: string;
  price: number;
}

export interface CarCardProps {
  car: CarProps;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface RegisterButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface ProductInfoProps {
  product: ProductDetails;
  className?: string;
}

export interface InputFieldProps {
  type?: string,
  placeholder?: string,
  icon: LucideIcon
  value?: string;
  onChange: (e: unknown) => void;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

export interface SearchModelProps {
  model: string;
  setModel: (manufacturer: string) => void;
}

export interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface TimelineItemProps {
  year: string;
  milestone: string;
  description: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
}
