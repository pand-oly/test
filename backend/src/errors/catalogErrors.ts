export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  ErrorInDatabase = 'ErrorInDatabase',
  NotUserFoundError = 'NotUserFoundError',
}

type ErrorResponseObject = {
  error: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  ErrorInDatabase: {
    error: 'Internal database error',
    httpStatus: 500,
  },
  NotUserFoundError: {
    error: 'No User found error',
    httpStatus: 404,
  },
};
