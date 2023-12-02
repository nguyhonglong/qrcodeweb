import express, { response } from "express";
import cors from 'cors';
import { JWT_SECRET_KEY } from "./config.js";
import mongoose from "mongoose";
import { Bill, Drink } from "./models/billModel.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './models/userModel.js'
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 5555
const mongoDBURL = process.env.DATABASE_URL

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("hehe")
})

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT} `)
});

app.post('/api/bills', async (req, res) => {
    try {
        const { billID, numCustomer, customerName, storeName, drinks, updateAccount } = req.body;

        if (!billID || !numCustomer || !customerName || !storeName || !updateAccount) {
            return res.status(400).send({
                message: 'Send all required fields: billID, numCustomer, customerName, storeName'
            });
        }

        const existingBill = await Bill.findOne({ billID });
        if (existingBill) {
            return res.status(409).send({
                message: 'A bill with the same billID already exists.'
            });
        }

        const newBill = {
            billID,
            numCustomer,
            customerName,
            storeName,
            drinks,
            updateAccount
        };

        const bill = await Bill.create(newBill);
        return res.status(201).send(bill);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

app.get('/api/bills', async (request, response) => {
    try {
        const bills = await Bill.find({});
        return response.status(200).json(bills);

    } catch (error) {
        console.log(error.message);
    }
});

app.get('/api/bills/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const bill = await Bill.findOne({ billID: id });
        if (!bill) {
            return response.status(404).json({ message: 'Bill not found' });
        }
        return response.status(200).json(bill);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ messege: error.message })
    }
});

app.put('/api/bills/:id', async (request, response) => {
    try {
        const { id } = request.params;
        if (
            !request.body.billID ||
            !request.body.numCustomer ||
            !request.body.customerName ||
            !request.body.storeName ||
            !request.body.updateAccount

        ) {
            return response.status(400).send({
                message: 'Send all required fields: billID, numCustomer, customerName, storeName'
            });
        }
        const updatedBill = {
            billID: request.body.billID,
            numCustomer: request.body.numCustomer,
            customerName: request.body.customerName,
            storeName: request.body.storeName,
            drinks: request.body.drinks,
            updateAccount: request.body.updateAccount
        };

        const bill = await Bill.findOneAndUpdate({ billID: id }, updatedBill, { new: true });
        if (!bill) {
            return response.status(404).json({ message: 'Bill not found' });
        }

        return response.status(200).send({ message: "Success" })


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ messege: error.message })
    }
});

app.get('/api/drinks', async (request, response) => {
    try {
        const drinks = await Drink.find({});
        return response.status(200).json(drinks);

    } catch (error) {
        console.log(error.message);
    }
})

app.post('/api/drinks', async (request, response) => {
    try {
        const { name, price } = request.body;

        if (!name || !price) {
            return response.status(400).send({
                message: 'Send all required fields: name, price'
            });
        }

        const existingDrink = await Bill.findOne({ name });
        if (existingDrink) {
            return response.status(409).send({
                message: 'A drink with the same billID already exists.'
            });
        }

        const newDrink = {
            name, price
        };

        const drink = await Drink.create(newDrink);
        return response.status(201).send(drink);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

app.get('/api/records', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const fromDate = new Date(startDate);
        const toDate = new Date(endDate);
        toDate.setUTCHours(23, 59, 59, 999);

        const query = {
            createdAt: { $gte: fromDate, $lte: toDate }
        };

        const records = await Bill.find(query);

        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const secretKey = JWT_SECRET_KEY;

app.post('/api/auth/login', async (req, res) => {
    const { account, password } = req.body;

    try {
        const user = await User.findOne({ account });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key');

        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

app.post('/api/auth/register', async (req, res) => {
    const { account, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ account });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            account,
            password: hashedPassword,
            name
        });

        await newUser.save();

        res.status(201).json({ message: 'Tài khoản đã được tạo thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

app.put('/api/auth/update', async (req, res) => {
    const { account, role } = req.body;

    try {
        const existingUser = await User.findOne({ account });
        if (!existingUser) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại' });
        }
        if (
            !req.body.account ||
            !req.body.role 
        ) {
            return res.status(400).send({
                message: 'Send all required fields: account, role'
            });
        }
        existingUser.role = role;
        await existingUser.save();
        res.status(200).json({ message: 'Tài khoản đã được cập nhật thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

app.get('/api/users', async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json(users);

    } catch (error) {
        console.log(error.message);
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("connect to db success")
    })
    .catch((error) => {

    });
