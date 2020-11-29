export interface IRange<T> {
    start: Date;
    end: Date;
    data: T;
    title?: string;
    description?: string;
    color?: string;
}