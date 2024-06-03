import { Sequelize } from 'sequelize'; 
import { DB_NAME, DB_USER, DB_PSW, DB_PORT, DB_SCHEMA, HOST } from './environment.js';

const connection = new Sequelize({
    database: DB_NAME, 
    username: DB_USER, 
    password: DB_PSW, 
    host: HOST, 
    port: DB_PORT, 
    schema: DB_SCHEMA,
    dialect: 'postgres' 
})

try {
    await connection.authenticate()
    console.log('connection established')
} catch(error) {
    console.log(`Unable to connect ${error}`)
}

export default connection; 