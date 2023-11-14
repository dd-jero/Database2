import express from "express";
import { createSql, selectSql } from "../database/sql";
// TODO

const router = express.Router();

router.get('/', async function (req, res) {
    // TODO
    if (req.cookies.user) {
        const studentId = req.cookies.user;
        const classInformation = await selectSql.getClass(studentId); // 학생이 이미 수강중인 수업 
        const allClass = await selectSql.getCountParticipant(studentId); // 학생이 수강 할 수 있는 수업과 남은 수강 가능 인원
        res.render('select', { user: req.cookies.user, classInformation, allClass });
    } 
    else {
        res.render('/')
    }

});

router.post('/', async(req, res) => {
    // TODO
    const data = {
        cId: req.body.applyBtn,
        sId: req.cookies.user,
    };
    
    let allClass = await selectSql.getCountParticipant(data.sId); // 수강할 수 있는 수업
    const selectedClass = allClass.find(classInfo  => classInfo.Id === data.cId);
    let classInformation = await selectSql.getClass(data.sId);

    if (data.sId)
    {
        if (selectedClass && selectedClass.Remaining_participants > 0)
        {
            await createSql.addClass(data); // apply하면 해당 학생이 해당 수업을 수강하는 것으로 추가 
            const classInformation = await selectSql.getClass(data.sId); // 추가된 수업을 반영해서 학생이 수강중인 수업
            const allClass = await selectSql.getCountParticipant(data.sId); // 수강할 수 있는 수업
            res.render('select', { user: req.cookies.user, classInformation, allClass });
        }
        else
        {
            res.render('select', { message : "수강 가능 인원을 초과했습니다! ", user: req.cookies.user, classInformation, allClass });
        }
    }
    else {
        res.render('/')
    }
    
});

module.exports = router;