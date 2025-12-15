// Кастомные утилитные типы

/**
 * Делает только указанные поля опциональными
 * @example
 * type User = { id: string; name: string; email: string };
 * type CreateUser = PartialBy<User, 'id'>; // { id?: string; name: string; email: string }
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
