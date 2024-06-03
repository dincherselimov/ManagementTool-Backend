import mysql, { Pool, Connection } from 'mysql';

const pool: Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apinode',
    connectionLimit: 10,
});

let cachedConnection: Connection | null = null;

export const getConnection = (): Promise<Connection> => {
    return new Promise((resolve, reject) => {
        if (cachedConnection) {
            resolve(cachedConnection);
        } else {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Connected to MySQL database');
                    cachedConnection = connection;
                    resolve(connection);
                }
            });
        }
    });
};
