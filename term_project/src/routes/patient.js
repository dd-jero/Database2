import express  from "express";
import {selectSql,updateSql,deleteSql,insertSql} from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.cookies.user) {
        const patID = req.cookies.user
        const reservations = await selectSql.getReservation(patID);
        res.render('patient', { // 검사 정보 
            main_title: patID,
            reservations
        });
    } else{
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    const vars = req.body;

    if (req.body.insBtn_r) { // 검사 삽입
        const data = {
            ReservationID: vars.patientid + vars.did,
            ReservationDateTime: vars.time,
            DepartmentID: vars.did,
            PatientID: vars.patientid,
        };
        await insertSql.insertReservation(data);
        res.redirect('/patient')} 

    if (req.body.delBtn_r) { // 검사  삭제  
        const data = {
            ReservationID: req.body.delBtn_r,
        };
        await deleteSql.deleteReservation(data);
        res.redirect('/patient')}
});

module.exports = router;