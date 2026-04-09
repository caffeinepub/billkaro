import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRecord {
    id: bigint;
    city: string;
    name: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface VisitStats {
    dailyVisits: Array<[bigint, bigint]>;
    totalVisits: bigint;
    visitsByCity: Array<[string, bigint]>;
}
export interface backendInterface {
    deleteContact(id: bigint): Promise<boolean>;
    getAllContacts(): Promise<Array<ContactRecord>>;
    getContact(id: bigint): Promise<ContactRecord | null>;
    getVisitStats(): Promise<VisitStats>;
    recordVisit(city: string): Promise<void>;
    removeContact(id: bigint): Promise<boolean>;
    submitContact(name: string, phone: string, city: string, message: string): Promise<bigint>;
}
