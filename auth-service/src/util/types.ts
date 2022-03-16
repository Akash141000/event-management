export enum AuthType {
  user = 'user',
  organiser = 'organiser',
}
//
export interface tokenData {
  id: number;
  email: string;
  type: AuthType;
}

export enum ROLE_TYPE{
  USER = 'user',
  ORGANISER = 'organiser',
}
