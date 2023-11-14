import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', (req, res) => {
    if (req.cookies.user) {
        res.render('main', { 
            'user': req.cookies.user,
        });
    } else {
        res.render('login');
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

router.post('/', async (req, res) => {
    const vars = req.body; // 입력한 정보들 
    const users = await selectSql.getUsers(); // DB에 저장된 학생 정보들 불러오기 
    var whoAmI = 1;
    let checkLogin = false;

    users.map((user) => {
        if (vars.id == user.Id && vars.password === user.Password) { // 동일한 정보면 로그인 
            checkLogin = true;
            whoAmI = user.Id;
        }
    })

    if (checkLogin) { // 로그인 됐으면 
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

module.exports = router;