const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');
const path = require('path');
const usersModel = require('../model/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    try {
        const users = await usersController.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});

// thêm user
router.post('/add', async (req, res) => {
    try {
        const savedUser = await usersController.createUsers(req.body);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Chi tiết user
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const pro = await usersController.getUserById(id);
        return res.status(200).json(pro)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})

// đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body; 

    try {
        const user = await usersModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        res.status(200).json({
            user: {
                id: user._id,
                name: user.username,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
