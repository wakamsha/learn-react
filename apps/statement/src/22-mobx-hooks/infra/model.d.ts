export type User = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  job?: string;
};

export type CreateUserRequest = {
  name: string;
  job: string;
};

export type CreateUserResponse = {
  name: string;
  job: string;
  id: number;
};
