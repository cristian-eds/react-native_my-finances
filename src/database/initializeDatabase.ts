import { type SQLiteDatabase } from "expo-sqlite";

import migrations from './migrations';

const LATEST_VERSION = migrations.length;

interface Response {
    user_version : number
}

export async function intilizeDatabase(database: SQLiteDatabase) {

    console.log("Initializing database...");

    const [{user_version}]  = await database.getAllAsync<Response>('PRAGMA user_version;');
    const currentVersion = user_version;
    await database.execAsync('PRAGMA foreign_keys = ON;');

    console.log(user_version);

    if (currentVersion < LATEST_VERSION) {
        await database.withTransactionAsync(async () => {

            for (let i = currentVersion; i < LATEST_VERSION; i++) {
                const migrationScript = migrations[i];

                console.log(`Aplicando migração v${i + 1}...`);
                await database.execAsync(migrationScript);
            }

            await database.execAsync(`PRAGMA user_version = ${LATEST_VERSION};`);
            console.log('Migrações concluídas!');
        });
    }
    
}