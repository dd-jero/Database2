import express  from "express";
import {selectSql,updateSql,deleteSql,insertSql} from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.cookies.user) {
        const nurID = req.cookies.user
        const treatments = await selectSql.getTreatment(nurID);
        const patients = await selectSql.searchPatient2(nurID);
        res.render('nurse', { // 검사 정보 
            main_title: nurID,
            treatments,
            patients
        });
    } else{
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    const vars = req.body;

    if (req.body.insBtn_t) { // 검사 삽입
        const data = {
            TreatmentID: vars.tid,
            TreatmentDateTime: vars.time,
            TreatmentDetails: vars.details,
            NurseID: vars.nurseid,
            PatientID: vars.patientid,
        };
        await insertSql.insertTreatment(data);
        res.redirect('/nurse')} 

    if (req.body.delBtn_t) { // 검사  삭제  
        const data = {
            TreatmentID: req.body.delBtn_t,
        };
        await deleteSql.deleteTreatment(data);
        res.redirect('/nurse')}

    if (req.body.modBtn_t) { // 검사 수정 
        const data = {
            TreatmentID: vars.tid,
            TreatmentDateTime: vars.time,
            TreatmentDetails: vars.details,
            NurseID: vars.nurseid,
            PatientID: vars.patientid,
        };
        await updateSql.updateTreatment(data);
        res.redirect('/nurse')}
});

module.exports = router;