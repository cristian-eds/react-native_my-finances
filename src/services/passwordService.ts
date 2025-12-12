import bcrypt from 'bcryptjs';
import * as Crypto from 'expo-crypto';

bcrypt.setRandomFallback((len) => {
  const randomBytes = Crypto.getRandomValues(new Uint8Array(len));
  return Array.from(randomBytes);
});

const SALT_ROUNDS = 10;

export const hashPassword = async (plainTextPass: string) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(plainTextPass, salt);
        return hash;
    } catch (error) {
        console.error(error)
    }
}

export const verifyPass = async (plainTextPass: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(plainTextPass, hashedPassword);
    } catch (error) {
        console.error('Erro durante a verificação:', error);
        return false;
    }
}   