import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LaptopModel {
    imageUrls: Array<string>;
    variants: Array<LaptopVariant>;
    modelName: string;
}
export interface ChatMessage {
    role: string;
    text: string;
    timestamp: bigint;
}
export interface LaptopVariant {
    ram: string;
    imageUrls: Array<string>;
    storage: string;
    variantName: string;
    processor: string;
}
export interface Brand {
    imageUrls: Array<string>;
    brandName: string;
    models: Array<LaptopModel>;
}
export interface backendInterface {
    converseWithAssistant(userMessage: string): Promise<ChatMessage>;
    getAllBrands(): Promise<Array<Brand>>;
    getAllModels(brandName: string): Promise<Array<LaptopModel>>;
    getAllVariants(brandName: string, modelName: string): Promise<Array<LaptopVariant>>;
    getBrandByName(brandName: string): Promise<Brand | null>;
    getModelByName(brandName: string, modelName: string): Promise<LaptopModel | null>;
}
