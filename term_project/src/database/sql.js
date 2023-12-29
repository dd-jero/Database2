import mysql from 'mysql2';

const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'hospital_jy',
        password: 'dfy4r6wn@',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

const promisePool = pool.promise();

export const selectSql = {
    getUser: async () => {
        const sql = `SELECT * FROM user`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getDoctor: async () => {
        const sql = `SELECT * FROM doctor`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getNurse: async () => {
        const sql = `SELECT * FROM nurse`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getExamination: async (DoctorId) => {
        const sql = `SELECT e.ExaminationID, e.ExaminationDateTime, e.ExaminationDetails, e.DoctorID, e.PatientID 
        FROM examination AS e
        where e.DoctorID = ${DoctorId}`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getTreatment: async (NurseID) => {
        const sql = `SELECT t.TreatmentID, t.TreatmentDateTime, t.TreatmentDetails, t.NurseID, t.PatientID 
        FROM treatment AS t
        where t.NurseID = ${NurseID}`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getReservation: async (PatientID) => {
        const sql = `SELECT r.ReservationID, r.ReservationDateTime, r.DepartmentID,  r.PatientID 
        FROM reservation AS r
        where r.PatientID = ${PatientID}`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    searchPatient: async (DoctorId) => {
        const sql = `SELECT p.PatientID, p.PName, p.SocialSecurityNumber,  p.PGender , p.PAddr, p.DoctorId,
        p.BloodType, p.Height, p.Weight, p.PPhonenum
        FROM patient AS p
        where p.DoctorId = ${DoctorId}`;
        console.log(sql)
        const [result] = await promisePool.query(sql);
        return result;
    },
    searchPatient2: async (NurseID) => {
        const sql = `SELECT p.PatientID, p.PName, p.SocialSecurityNumber,  p.PGender , p.PAddr, p.DoctorId,
        p.BloodType, p.Height, p.Weight, p.PPhonenum
        FROM patient AS p
        where p.NurseID = ${NurseID}`;
        console.log(sql)
        const [result] = await promisePool.query(sql);
        return result;
    }
};

export const updateSql = {
    updateUser: async (id, password) => {
        const sql = `UPDATE user 
            SET Id = ${id},
                Password = "${password}"
            WHERE Id = ${id}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateDoctor: async (data) => {
        const sql = `UPDATE doctor 
            SET DoctorID = ${data.DoctorID}, DName = "${data.DName}", 
                DAddr = "${data.DAddr}", DPhonenum = "${data.DPhonenum}",
                DPassword = "${data.DPassword}", DepartmentID = ${data.DepartmentID}
            WHERE DoctorID = ${data.DoctorID}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateNurse: async (data) => {
        const sql = `UPDATE nurse 
            SET NurseId = ${data.NurseID}, NName = "${data.NName}", 
                NAddr = "${data.NAddr}", NPhonenum = "${data.NPhonenum}",
                NPassword = "${data.NPassword}", DepartmentID = ${data.DepartmentID}
            WHERE NurseID = ${data.NurseID}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateExmination: async (data) => {
        const sql = `UPDATE Examination 
            SET ExaminationID = ${data.ExaminationID}, ExaminationDateTime = "${data.ExaminationDateTime}", 
                ExaminationDetails = "${data.ExaminationDetails}", DoctorID = "${data.DoctorID}",
                PatientID = "${data.PatientID}"
            WHERE ExaminationID = ${data.ExaminationID}`;
        console.log(sql);
        await promisePool.query(sql);
    },
    updateTreatment: async (data) => {
        const sql = `UPDATE Treatment 
            SET TreatmentID = ${data.TreatmentID}, TreatmentDateTime = "${data.TreatmentDateTime}", 
            TreatmentDetails = "${data.TreatmentDetails}", NurseID = "${data.NurseID}",PatientID = "${data.PatientID}"
            WHERE TreatmentID = ${data.TreatmentID}`;
        console.log(sql);
        await promisePool.query(sql);
    },
};

export const deleteSql = {
    deleteUser: async (id) => {
        console.log('DELETE user id =', id);
        const sql = `DELETE FROM user WHERE Id = ${id}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteDoctor: async (data) => {
        console.log('DELETE doctor Did =', data);
        const sql = `DELETE FROM doctor WHERE DoctorID = ${data.DoctorID}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteNurse: async (data) => {
        console.log('DELETE nurse Nid =', data);
        const sql = `DELETE FROM Nurse WHERE NurseID = ${data.NurseID}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteExmination: async (data) => {
        console.log('DELETE examination Eid = ', data);
        const sql = `DELETE FROM Examination WHERE ExaminationID = ${data.ExaminationID}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteTreatment: async (data) => {
        console.log('DELETE treatment tid = ', data);
        const sql = `DELETE FROM treatment WHERE TreatmentID = ${data.TreatmentID}`
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteReservation: async (data) => {
        console.log('DELETE reservation rid = ', data);
        const sql = `DELETE FROM reservation WHERE ReservationID = ${data.ReservationID}`
        console.log(sql);
        await promisePool.query(sql);
    }
};

export const insertSql = {
    insertUser: async (id,password,role) => {
        const sql = `INSERT INTO user VALUES (
            ${id}, "${password}", "${role}")`
        console.log(id,password,role);
        await promisePool.query(sql);
    },
    insertDoctor: async (data) => {
        const sql = `INSERT INTO doctor VALUES (
            ${data.DoctorID}, "${data.DName}", "${data.DAddr}", 
            "${data.DPhonenum}", "${data.DPassword}", ${data.DepartmentID})`
        console.log(data);
        await promisePool.query(sql);
    },
    insertNurse: async (data) => {
        const sql = `INSERT INTO nurse VALUES (
            ${data.NurseID}, "${data.NName}", "${data.NAddr}", 
            "${data.NPhonenum}", "${data.NPassword}", ${data.DepartmentID})`
        console.log(data);
        await promisePool.query(sql);
    },
    insertExamination: async (data) => {
        const sql = `INSERT INTO examination VALUES (
            ${data.ExaminationID}, "${data.ExaminationDateTime}", "${data.ExaminationDetails}", 
            ${data.DoctorID}, ${data.PatientID})`
        console.log(data);
        await promisePool.query(sql);
    },
    insertTreatment: async (data) => {
        const sql = `INSERT INTO treatment VALUES (
            ${data.TreatmentID}, "${data.TreatmentDateTime}", "${data.TreatmentDetails}", 
            ${data.NurseID}, ${data.PatientID})`
        console.log(data);
        await promisePool.query(sql);
    },
    insertReservation: async (data) => {
        const sql = `INSERT INTO reservation VALUES (
            ${data.ReservationID}, "${data.ReservationDateTime}", "${data.DepartmentID}", 
            ${data.PatientID})`
        console.log(data);
        await promisePool.query(sql);
    }
    
};