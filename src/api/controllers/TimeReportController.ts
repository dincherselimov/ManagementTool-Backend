import { Request, Response } from 'express';
import { getConnection } from '../../config/db';

export const insertData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, name, startTime, endTime, totalHoursWorkedForTheDay, date, description } = req.body;

        // console.log('Request body:', req.body);

        if(userId === null){
            return;
        }

        const connection = await getConnection();

        // Insert data into the time_report table
        connection.query('INSERT INTO time_report (user_id, name, start_time, end_time, total_hours_for_day, date, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, name, startTime, endTime, totalHoursWorkedForTheDay, date, description], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            // Send the response to the client
            res.status(201).json({ id: result.insertId, userId, name, startTime, endTime, totalHoursWorkedForTheDay, date, description });
        });
    } catch (err) {
        console.error('Internal server error:', err);
        // Send the response to the client
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllTimeReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = await getConnection();
        const results = await new Promise<any[]>((resolve, reject) => {
            connection.query('SELECT * FROM time_report', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        res.json(results);
    } catch (err) {
        console.error('Error fetching time reports:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const getUserTimeReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.query; 
        const connection = await getConnection();
        const results = await new Promise<any[]>((resolve, reject) => {
            // Use a prepared statement with a WHERE clause to filter by user ID
            connection.query('SELECT * FROM time_report WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        res.json(results);
    } catch (err) {
        console.error('Error fetching time reports:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


