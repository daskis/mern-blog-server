import User from "../models/user.js";
import bcrypt from "bcryptjs"
import user from "../models/user.js";
import jwt from "jsonwebtoken"
// reg
export const register = async (req, res) => {
    // req приходит на бек, а отдаем res на фронт
    try {
        const { username, password } = req.body
        const isUsed = await User.findOne({username})


        if (isUsed) {
            return res.json({
                message: `Пользователь с псевдонимом ${username} уже существует`
            })
        }
        // шифровка пароля
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password, salt)

        const newUser = await new User({
            username: username,
            password: hash
        })

        const token = jwt.sign({
                id: newUser._id
            },
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        // отправка на фронт
        await newUser.save()

        res.json({
            newUser,
            message: "Регистрация прошла успешно"
        })

    } catch (e) {
        res.json({message: `Ошибка при авторизации ${e.message}`})
    }
}

// login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})


        if (!user) {
            return res.json({
                message: `Пользователя с псевдонимом ${username} не существует`
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({
                message: "Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            id: user._id
        },
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
    )
        res.json({
            token,
            user,
            message: "Вы вошли в свой аккаунт"
        })



    } catch (e) {
        res.json({message: `Ошибка при авторизации ${e.message}`})
    }
}
// get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: "Такого пользователя не существует"
            })
        }
        const token = jwt.sign({
                id: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        res.json({
            user,
            token
        })

    } catch (e) {
        res.json({message: `Нет доступа`})
    }
}