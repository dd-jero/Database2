import express  from "express";
import {selectSql,updateSql,deleteSql,insertSql} from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.cookies.user) {
        const doctorInformation = await selectSql.getDoctor();
        const nurseInformation = await selectSql.getNurse();
        res.render('manager', { // 의사와 간호사 정보 확인
            doctorInformation, nurseInformation
        });
    } else{
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    const vars = req.body;

    if (req.body.modBtn_d) { // 의사 정보 수정 버튼 클릭 시 
        const data = {
            DoctorID: vars.id,
            DName: vars.name,
            DAddr: vars.addr,
            DPhonenum: vars.phone_number,
            DPassword: vars.passwd,
            DepartmentID: vars.did
        };
        await updateSql.updateDoctor(data);
        await updateSql.updateUser(data.DoctorID, data.DPassword);
        res.redirect('/manager')} 

    if (req.body.modBtn_n) { // 간호사 정보 수정 버튼 클릭 시 
        const data = {
            NurseID: vars.id,
            NName: vars.name,
            NAddr: vars.addr,
            NPhonenum: vars.phone_number,
            NPassword: vars.passwd,
            DepartmentID: vars.did
        };
        await updateSql.updateNurse(data);
        await updateSql.updateUser(data.NurseID, data.NPassword);
        res.redirect('/manager')}

    if (req.body.delBtn_d){ // 의사 정보 삭제
        const data = {
            DoctorID: req.body.delBtn_d,
        };
    
        await deleteSql.deleteDoctor(data);
        await deleteSql.deleteUser(data.DoctorID);
        res.redirect('/manager')
    }

    if (req.body.delBtn_n){ // 간호사 정보 삭제
        const data = {
            NurseID: req.body.delBtn_n,
        };
    
        await deleteSql.deleteNurse(data);
        await deleteSql.deleteUser(data.NurseID);
        res.redirect('/manager')
    }
    
    if(req.body.insBtn_d){ // 의사 정보 입력 
        const data = {
            DoctorID: vars.id,
            DName: vars.name,
            DAddr: vars.addr,
            DPhonenum: vars.phone_number,
            DPassword: vars.passwd,
            DepartmentID: vars.did
        };
        await insertSql.insertDoctor(data);
        await insertSql.insertUser(data.DoctorID,data.DPassword,"doctor");
        res.redirect('/manager')
    }

    if(req.body.insBtn_n){ // 간호사 정보 입력 
        const data = {
            NurseID: vars.id,
            NName: vars.name,
            NAddr: vars.addr,
            NPhonenum: vars.phone_number,
            NPassword: vars.passwd,
            DepartmentID: vars.did
        };
        await insertSql.insertNurse(data);
        await insertSql.insertUser(data.NurseID,data.NPassword,"nurse");
        res.redirect('/manager')
    }
});

module.exports = router;