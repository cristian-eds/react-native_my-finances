import { SQLiteDatabase } from "expo-sqlite";


export async function create(userId: string, sessionToken: string,database: SQLiteDatabase) {

    const statement = await database.prepareAsync(` 
            INSERT INTO sessions (user_id, session_token)
            VALUES ($userId, $sessionToken);
        `);

    try {
        const params = { $userId: userId, $sessionToken: sessionToken};
        await statement.executeAsync(params);
    } catch (error) {
        console.error("Error creating session:", error);
    } finally {
        await statement.finalizeAsync();
    }
}