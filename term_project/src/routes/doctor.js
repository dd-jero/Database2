import express  from "express";
import {selectSql,updateSql,deleteSql,insertSql} from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.cookies.user) {
        const docID = req.cookies.user
        const examinations = await selectSql.getExamination(docID);
        const patients = await selectSql.searchPatient(docID);
        res.render('doctor', { // 검사 정보 
            main_title: docID,
            examinations,
            patients
        });
    } else{
        res.redirect('/');
    }

});

router.post('/', async (req, res) => {
    const vars = req.body;

    if (req.body.insBtn_e) { // 검사 삽입
        const data = {
            ExaminationID: vars.eid,
            ExaminationDateTime: vars.time,
            ExaminationDetails: vars.details,
            DoctorID: vars.doctorid,
            PatientID: vars.patientid,
        };
        await insertSql.insertExamination(data);
        res.redirect('/doctor')} 

    if (req.body.delBtn_e) { // 검사  삭제  
        const data = {
            ExaminationID: req.body.delBtn_e,
        };
        await deleteSql.deleteExmination(data);
        res.redirect('/doctor')}

    if (req.body.modBtn_e) { // 검사 수정 
        const data = {
            ExaminationID: vars.eid,
            ExaminationDateTime: vars.time,
            ExaminationDetails: vars.details,
            DoctorID: vars.doctorid,
            PatientID: vars.patientid,
        };
        await updateSql.updateExmination(data);
        res.redirect('/doctor')}

});

module.exports = router;