// import { Request, Response } from 'express';
// import { getConnection } from '../../config/db';

// /**
//  * 
//  * @param req 
//  * @param res 
//  */
// export const getItems = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const connection = await getConnection();

//     connection.query('SELECT * FROM items', (err, results) => {
//       if (err) {
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
//       res.json(results);
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// export const addItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { item_name, items_description, item_size } = req.body;

//     console.log('Request body:', req.body); 

//     const connection = await getConnection();
//     console.log('Database connection:', connection); 

//     connection.query('INSERT INTO items (item_name, items_description, item_size) VALUES (?, ?, ?)', [item_name, items_description, item_size], (err, result) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({ error: 'Database error' }); 
//       }
//       res.status(201).json({ id: result.insertId, item_name, items_description, item_size });
//     });
//   } catch (err) {
//     console.error('Internal server error:', err); 
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// export const addItem2 = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, name, start_time, end_time, total_hours_for_day, date, description } = req.body;

//     console.log('Request body:', req.body); 

//     const connection = await getConnection();
//     console.log('Database connection:', connection); 

//     // Insert data into the time_report table
//     connection.query('INSERT INTO time (user_id, name, start_time, end_time, total_hours_for_day, date, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [ user_id, name, start_time, end_time, total_hours_for_day, date, description], (err, result) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({ error: 'Database error' }); 
//       }
//       res.status(201).json({ id: result.insertId, name, start_time, end_time, total_hours_for_day, date, description, user_id });
//     });
//   } catch (err) {
//     console.error('Internal server error:', err); 
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// /**
//  * 
//  * @param req 
//  * @param res 
//  */
// export const updateItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { item_name, items_description, item_size } = req.body;
//     const connection = await getConnection();

//     connection.query('UPDATE items SET item_name = ?, items_description = ?, item_size = ? WHERE id = ?', [item_name, items_description, item_size, id], (err, result) => {
//       if (err) {
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
//       res.status(200).json({ message: 'Item updated successfully' });
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// /**
//  * 
//  * @param req 
//  * @param res 
//  */
// export const deleteItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const connection = await getConnection();

//     connection.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
//       if (err) {
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
//       res.status(200).json({ message: 'Item deleted successfully' });
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
