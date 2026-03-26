import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getContact(id: bigint): Promise<ContactSubmission>;
    removeContact(id: bigint): Promise<void>;
    submitContact(form: ContactSubmission): Promise<bigint>;
}
