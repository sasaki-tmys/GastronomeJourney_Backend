const express = require('express');
const db = require('../db/db');
const router = express.Router();

    // 全てのジャンルを取得
    router.get('/', (req, res) => {
    db.all('SELECT * FROM genre', [], (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(rows);
    });
    });

    // 特定のカテゴリーIDに属するジャンルを取得
    router.get('/category/:category_id', (req, res) => {
    const { category_id } = req.params;
    db.all('SELECT * FROM genre WHERE category_id = ?', [category_id], (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(rows);
    });
    });

    // 新しいジャンルを追加
    router.post('/', (req, res) => {
    const { name, category_id } = req.body;
    db.run('INSERT INTO genre (name, category_id) VALUES (?, ?)', [name, category_id], function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ id: this.lastID });
    });
    });

    // ジャンルを更新
    router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    db.run('UPDATE genre SET name = ?, category_id = ? WHERE id = ?', [name, category_id, id], function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Genre updated', changes: this.changes });
    });
    });

    // ジャンルを削除
    router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM genre WHERE id = ?', id, function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Genre deleted', changes: this.changes });
    });
    });

    module.exports = router;
