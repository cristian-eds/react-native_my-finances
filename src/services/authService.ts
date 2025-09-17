import { SQLiteDatabase } from "expo-sqlite";
import bcrypt from "react-native-bcrypt";
import { User } from "../domain/userModel";

interface UserLogin {
    cpf: string;
    password: string;
}

interface ResponseLogin {
    data: Omit<User,"id"> | null;
    error?: string;
}

export async function login(database: SQLiteDatabase, data: UserLogin) : Promise<ResponseLogin | undefined> {
    const statement = await database.prepareAsync(` 
            SELECT * FROM users WHERE cpf = $cpf;
        `);
    try {
        const params = { $cpf: data.cpf, $password: data.password };    
        const result = await statement.executeAsync<Omit<User,"id">>(params);
        const user = await result.getFirstAsync();
        console.log(user);
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