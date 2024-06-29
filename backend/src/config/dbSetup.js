import connection from "./connection.js";
import * as Models from '../models/index.js'; // necessario per forzare la ricreazione delle tabelle

const syncDatabase = async () => {
    try {
        await connection.sync({ force: true });
        console.log('Database & Tables Created..')
    } catch(error) {
        console.log(`Error with database synchronization: ${error}`); 
    }
}

await syncDatabase(); 