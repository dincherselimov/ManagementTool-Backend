import mysql, { Connection, Pool } from 'mysql';

const pool: Pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apinode',
  connectionLimit: 10,
});

export const getConnection = (): Promise<Connection> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Connected to MySQL database');
      resolve(connection);
    });
  });
};
