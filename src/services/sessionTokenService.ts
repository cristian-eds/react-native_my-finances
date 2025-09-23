import { User } from "../domain/userModel";
import uuid from 'react-native-uuid';
import * as sessionRepository from "../repository/sessionRepository";
import { SQLiteDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function generateSessionToken(loggedUser: Omit<User, "password">, database: SQLiteDatabase) {
    const sessionId = uuid.v4();
    try {
        await Promise.all([
            sessionRepository.create(loggedUser.id.toLocaleString(), sessionId, database),
            saveSessionTokenOnAsyncStorage(sessionId)
        ]);
    } catch (error) {
        console.error("Failed to generate or save session token:", error);
    }
}

function saveSessionTokenOnAsyncStorage(sessionToken: string) {
    AsyncStorage.setItem("sessionToken", sessionToken);
}

