import { Request, Response } from 'express';
import { getConnection } from '../../config/db';
import { error } from 'console';
import { resolve } from 'path';
import { rejects } from 'assert';
import { connect } from 'http2';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { json } from 'stream/consumers';

export const insertData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, name, startTime, endTime, totalHoursWorkedForTheDay, date, description } = req.body;

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

export const deleteUserTimeReport = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const connection = await getConnection();

        const timeReport = await new Promise<any>((resolve, reject) => {
            connection.query('SELECT user_id FROM time_report WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });

        if (!timeReport) {
            return res.status(400).json({ error: 'Item not found!' });
        }

        if (timeReport.user_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this item!' });
        }

        await new Promise<void>((resolve, reject) => {
            connection.query('DELETE FROM time_report WHERE id = ?', [id], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return res.status(200).json({ message: 'Item deleted successfully!' });
    } catch (err) {
        console.error('Internal Server Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
