import * as bcrypt from 'bcrypt';

const salt = 10;
export const encrypt = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

export const isSame = (password: string, encrypted: string) => {
  return bcrypt.compareSync(password, encrypted);
};
