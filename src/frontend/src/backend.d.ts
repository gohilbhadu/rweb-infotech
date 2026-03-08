import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Laptop {
    id: bigint;
    name: string;
    specs: string;
    category: string;
    brand: string;
    price: bigint;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    addLaptop(name: string, brand: string, price: bigint, specs: string, category: string): Promise<void>;
    getAllLaptops(): Promise<Array<Laptop>>;
    getContactForms(): Promise<Array<ContactForm>>;
    getLaptopsByBrand(brand: string): Promise<Array<Laptop>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
