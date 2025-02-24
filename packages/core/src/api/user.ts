import { request } from './common';

/**
 * User type definition
 */
export type User = {
  /**
   * User ID.
   */
  id: number;
  /**
   * User name.
   */
  name: string;
  /**
   * User username.
   */
  username: string;
  /**
   * User email.
   */
  email: string;
  /**
   * User address.
   */
  address: Address;
  /**
   * User phone.
   */
  phone: string;
  /**
   * User website.
   */
  website: string;
  /**
   * User's company.
   */
  company: Company;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

/**
 * Request Payload type
 */
export type CreateUserRequest = {
  /**
   * User name.
   */
  name: string;
  /**
   * User job.
   */
  job: string;
};

/**
 * Response Payload type
 */
export type CreateUserResponse = {
  /**
   * User name.
   */
  name: string;
  /**
   * User job.
   */
  job: string;
  /**
   * User ID.
   */
  id: number;
};

/**
 * Get users data from the server.
 *
 * @example
 *
 * ```typescript
 * const users = await requestGetUsers(),
 * ```
 */
export async function requestGetUsers(): Promise<User[]> {
  return request<User[]>({
    method: 'GET',
    path: '/users',

    withCredentials: false,
  });
}

/**
 * Get user data from the server by User ID.
 *
 * @example
 *
 * ```typescript
 * const user = await requestGetUser({ path: '1' }),
 * ```
 */
export async function requestGetUser({ path }: { path: string }): Promise<User> {
  return request<User>({
    method: 'GET',
    path: `/users/${path}`,

    withCredentials: false,
  });
}

/**
 * Post user data to the server.
 */
export async function requestPostUser({ send }: { send: CreateUserRequest }): Promise<CreateUserResponse> {
  return request<CreateUserResponse>({
    method: 'POST',
    path: '/users',

    send,
    withCredentials: false,
  });
}
