const express = require('express');
const db = require('../db/db');
const router = express.Router();

    // 全ての店舗を取得
    router.get('/', (req, res) => {
    db.all('SELECT * FROM store', [], (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(rows);
    });
    });

    // 特定の店舗を取得
    router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM store WHERE id = ?', [id], (err, row) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        if (row) {
        res.json(row);
        } else {
        res.status(404).json({ error: 'Store not found' });
        }
    });
    });

    // 特定のカテゴリーIDに属する店舗を取得
    router.get('/category/:category_id', (req, res) => {
        const { category_id } = req.params;
        db.all('SELECT * FROM store WHERE category = ?', [category_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (rows.length > 0) {
            res.json(rows);
        } else {
            // res.status(404).json({ message: 'No store found for this category' });
            res.json(rows);
        }
        });
    });  

    // 新しい店舗を追加
    router.post('/', (req, res) => {
    const { category, genre, visitDate, nameOfStore, address, totalAmount, contents, photos } = req.body;
    const sql = `INSERT INTO store (category, genre, visitDate, nameOfStore, address, totalAmount, contents, photos)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [category, genre, visitDate, nameOfStore, address, totalAmount, contents, photos], function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.status(201).json({ id: this.lastID });
    });
    });

    // 店舗情報を更新
    router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { category, genre, visitDate, nameOfStore, address, totalAmount, contents, photos } = req.body;
    const sql = `UPDATE store SET category = ?, genre = ?, visitDate = ?, nameOfStore = ?, address = ?, totalAmount = ?, contents = ?, photos = ? 
                WHERE id = ?`;
    db.run(sql, [category, genre, visitDate, nameOfStore, address, totalAmount, contents, photos, id], function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Store updated', changes: this.changes });
    });
    });

    // 店舗を削除
    router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM store WHERE id = ?', id, function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Store deleted', changes: this.changes });
    });
    });

    module.exports = router;
