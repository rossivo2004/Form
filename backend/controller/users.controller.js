const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersModel = require('../model/usersModel');

async function getAllUsers() {
    try {
        const result = await usersModel.find();
        return result;
    } catch (error) {
        console.log('Loi: ', error);
        throw error;
    }
}

async function createUsers(body) {
    try {
        const { username, fullname, password } = body;


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const userData = {
            username,
            fullname,
            password: hash,
        };

        const newUser = new usersModel(userData);
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

async function getUserById(id) {
    try {
        const result = await usersModel.findById(id);

        if (!result) {
            throw new Error('User không tồn tại');
        }
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

async function loginUser(username, password) {
    try {
        const user = await usersModel.findOne({ username });
        if (!user) {
            throw new Error('User không tồn tại');
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password không đúng');
        }
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}


module.exports = { getAllUsers, createUsers, loginUser, getUserById };
