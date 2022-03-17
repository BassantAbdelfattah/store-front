import bcrypt from 'bcrypt';
const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

const hashPassword = (password: string) => {
  const salt = parseInt(SALT_ROUNDS as unknown as string, 10);
  return bcrypt.hashSync(password + BCRYPT_PASSWORD, salt);
 
};

export default hashPassword;