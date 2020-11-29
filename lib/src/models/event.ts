export interface IEvent<T> {
    instant: Date;
    data: T;
    title?: string;
    description?: string;
    color?: string;
}