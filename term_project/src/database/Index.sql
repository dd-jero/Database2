CREATE INDEX idx_Examination_DP ON EXAMINATION(DoctorID, PatientID);
CREATE INDEX idx_Treatment_NP ON TREATMENT(NurseID, PatientID);
CREATE INDEX idx_Reservation_DP ON RESERVATION(DepartmentID, PatientID);
CREATE INDEX idx_Patient_DN ON Patient(DoctorID, NurseID);