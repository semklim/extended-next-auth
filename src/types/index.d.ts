// interface LoginResponse {
//   admin: Admin;
//   accessToken: string;
//   refreshToken: string;
// }

// interface Admin {
//   _id: string;
//   name: string;
//   email: string;
//   telegramId: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface Paginate {
//   page: number;
//   count: number;
// }

// interface Sort {
//   name: string;
//   type: 'asc' | 'desc';
// }

// interface ApiRequestProps {
//   paginate: Paginate;
//   sort?: Partial<Sort>;
// }

// interface BaseError {
//   statusCode: number;
//   message: string;
// }

// interface FormError extends BaseError {
//   message: string[];
//   error: string;
// }

// interface RefreshTokenError extends BaseError {
//   name: string;
// }
