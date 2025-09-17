import { SQLiteDatabase } from "expo-sqlite";
import bcrypt from "react-native-bcrypt";
import { User } from "../domain/userModel";
import { ResponseUser } from "../domain/responseUser";

interface UserLogin {
    cpf: string;
    password: string;
}



export async function login(database: SQLiteDatabase, data: UserLogin) : Promise<ResponseUser | undefined> {
    const statement = await database.prepareAsync(` 
            SELECT * FROM users WHERE cpf = $cpf;
        `);
    try {
        const params = { $cpf: data.cpf, $password: data.password };    
        const result = await statement.executeAsync<Omit<User,"id">>(params);
        const user = await result.getFirstAsync();
        if(user) {
            const hashedPassword = user.password;

            const isMatch = bcrypt.compareSync(data.password, hashedPassword);

            if(isMatch) {
                return { data: user };
            }   
            return { data: null, error: "Senha incorreta" };
        }
        return { data: null, error: "Usuário não encontrado" };

    } catch (error) {
        console.error("Error logging in user:", error);
    } finally {
        await statement.finalizeAsync();
    } 
}