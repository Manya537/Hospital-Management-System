import express from  "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated,
    isPatientAuthenticated
} from "../middlewares/auth.js";

const router=express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/Admin/Addnew",isAdminAuthenticated,addNewAdmin);
router.get("/doctors",getAllDoctors);
router.get("/Admin/me",isAdminAuthenticated, getUserDetails);
router.get("/patient/me",isPatientAuthenticated,getUserDetails);
router.get("/Admin/logout",isAdminAuthenticated,logoutAdmin);
router.get("/patient/logout",isPatientAuthenticated,logoutPatient);
router.post("/Doctor/AddNew",isAdminAuthenticated,addNewDoctor);

export default router;