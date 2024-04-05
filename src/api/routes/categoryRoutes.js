    const express = require('express');
    const db = require('../db/db');
    const router = express.Router();

    // 全てのカテゴリを取得
    router.get('/', (req, res) => {
    db.all('SELECT * FROM category', (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ categories: rows });
    });
    });

    // 新しいカテゴリを追加
    router.post('/', (req, res) => {
    const { category_name, category_img } = req.body;
    const sql = 'INSERT INTO category (category_name, category_img) VALUES (?, ?)';
    db.run(sql, [category_name, category_img], function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ categoryId: this.lastID });
    });
    });

    // カテゴリを更新
    router.put('/:id', (req, res) => {
    const { category_name, category_img } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE category SET category_name = ?, category_img = ? WHERE id = ?';
    db.run(sql, [category_name, category_img, id], function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Category updated', changes: this.changes });
    });
    });

    // カテゴリを削除
    router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM category WHERE id = ?';
    db.run(sql, id, function(err) {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({ message: 'Category deleted', changes: this.changes });
    });
    });

    module.exports = router;
