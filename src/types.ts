export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure = {
  ok: false;
  error: Error;
  status?: number;
};

export type Result<T> = Success<T> | Failure;