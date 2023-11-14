import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'inha_week11',
    password: 'dfy4r6wn@',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// selec query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from student`);
    return rows;
  },
  getStudent: async (Id) => {
      const sql = `select * from student where student.Id = ${Id}`;
      const [result] = await promisePool.query(sql);
      return result;
  },
  getClass: async (studentId) => {
      const sql = `select c.Id, c.Name, c.Professor, c.Number_of_participants, d.Name AS dname from class as c 
      join student_has_class as shc on c.Id = shc.Class_Id
      JOIN Department as d on c.Department_Id = d.Id 
      where shc.Student_Id = ${studentId}`;
      const [result] = await promisePool.query(sql);
      const res = result.map(classInfo => ({
        ...classInfo,
        Opening_departments: classInfo.dname,
      }));
      return res;
  },

  getCountParticipant: async (studentId) => {
    const sql = `SELECT c.Id, c.Name, c.Professor, c.Number_of_participants, d.Name AS dname, 
    COALESCE(COUNT(shc.Class_Id), 0) AS enrolledStudents 
    FROM class AS c 
    LEFT JOIN student_has_class AS shc ON c.Id = shc.Class_Id 
    JOIN Department AS d ON c.Department_Id = d.Id
    WHERE NOT EXISTS (
        SELECT 1
        FROM student_has_class AS shc2
        WHERE shc2.Student_Id = ${studentId} AND shc2.Class_Id = c.Id
      )
    GROUP BY c.Id`;

    const [result] = await promisePool.query(sql);
    const allClass = result.map(classInfo => ({
      ...classInfo,
      Opening_departments: classInfo.dname,
      Remaining_participants: classInfo.Number_of_participants - classInfo.enrolledStudents
    }));

    return allClass;
  }
}

export const createSql = {
  addClass: async (data) => {
    const uid = await promisePool.query(`select Id from Student where Id=${data.sId}`);
    console.log(uid);
    const results = await promisePool.query (
      `insert into student_has_class values (${uid[0][0].Id}, "${data.cId}");`
    )

    return results[0];
  }
}

