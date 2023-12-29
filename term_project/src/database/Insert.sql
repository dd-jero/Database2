START TRANSACTION;
    -- 의료 전문 분야
INSERT INTO USER (Id, Password, Role) VALUES
(100, '100', 'manager'),
(1000, '1000', 'doctor'),
(1001, '1001', 'doctor'),
(1002, '1002', 'doctor'),
(1003, '1003', 'doctor'),
(2000, '2000', 'nurse'),
(2001, '2001', 'nurse'),
(2002, '2002', 'nurse'),
(2003, '2003', 'nurse'),
(10000, '10000', 'patient'),
(10001, '10001', 'patient');

INSERT INTO MEDICAL_SPECIALTY (DepartmentID, DepartmentName, PhoneNumber)
VALUES
(1, 'Neurosurgery', '032-000-0000'),
(2, 'Thoracic Surgery', '032-001-0001'),
(3, 'Orthopedics', '032-002-0002'),
(4, 'Dentist', '032-003-0003'),
(5, 'Otorhinolaryngology', '032-004-0004');

-- 관리자
INSERT INTO MANAGER (ManagerID, Name, Password)
VALUES
(100, 'LEE', '100'),
(101, 'KIM', '101');

-- 의료진
INSERT INTO DOCTOR (DoctorID, DName, DAddr, DPhonenum, DPassword, DepartmentID)
VALUES
(1000, 'JY', 'Seoul', '010-000-0000', '1000', 1),
(1001, 'TW', 'Seoul', '010-001-0001', '1001', 1),
(1002, 'DM', 'Seoul', '010-002-0002', '1002', 2),
(1003, 'KW', 'Seoul', '010-003-0003', '1003', 3);

-- 간호사
INSERT INTO NURSE (NurseID, NName, NAddr, NPhonenum, NPassword, DepartmentID)
VALUES
(2000, 'jaeone', 'incheon', '011-000-0000', '2000', 1),
(2001, 'jaetwo', 'incheon', '011-001-0001', '2001', 2),
(2002, 'jaesam', 'incheon', '011-002-0002', '2002', 3),
(2003, 'jaesa', 'incheon', '011-003-0003', '2003', 4);

-- 환자
INSERT INTO PATIENT (PatientID, PName, SocialSecurityNumber, PGender, PAddr, BloodType, Height, Weight, PPhonenum,PPassword, DoctorID, NurseID)
VALUES
(10000, 'jisung', '000101-1234567', 'Male', 'incheon', 'A', 180, 70, '010-1111-1111', '10000',1000, 2000),
(10001, 'heungmin', '990101-2345678', 'Male', 'incheon', 'B', 180, 70, '010-1111-1112','10001', 1002, 2001);

-- 검사
INSERT INTO EXAMINATION (ExaminationID, ExaminationDateTime, ExaminationDetails, DoctorID, PatientID)
VALUES
(2312121, '23.12.12', 'Good', 1000, 10000),
(2312122, '23.12.12', 'Bad', 1002, 10001);

INSERT INTO TREATMENT (TreatmentID, TreatmentDateTime, TreatmentDetails, NurseID, PatientID)
VALUES
(231212100, '23.12.12', 'Drug', 2000, 10000),
(231212200, '23.12.12', 'shot', 2002, 10001);

COMMIT;
