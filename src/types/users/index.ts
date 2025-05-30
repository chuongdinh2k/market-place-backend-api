export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  deletedAt?: Date | null;
  updatedAt?: Date;
}
