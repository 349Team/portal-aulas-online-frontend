/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginPage from "../pages/Login";
import RegisterScreen from "../pages/Register";
import NewCourseScreen from "../pages/CreateCourse";
import NewLessonScreen from '../pages/CreateLesson';
import EditCourseScreen from '../pages/EditCourse';
import Home from "../pages/Home/Home";
import SideNav from '../components/NavBar';
import { AuthProvider, useAuthContext } from '../contexts/AuthContext';
import { StrictRoute } from '../contexts/StrictRoute';
import { Roles } from '../api/default';
import UserProfileScreen from '../pages/UserProfile'
import ProfessorCoursesPage from '../pages/ProfessorCourses';
import CourseDetails from '../pages/CourseDetails/course_details';
import AdministrationPage from '../pages/AdminPage';
import StudentCoursesPage from '../pages/StudentCourses/student_courses';

import "../global.css"

const SidebarLayout = () => (
  <>
    <SideNav />
    <Container>
      <Row>
        <div className="col-2" />
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
)

const CSSBaseline = () => (
  <>
    <div className="baseline" />
  </>
)

function DefaultRoutes() {
  const authContext = useAuthContext();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route element={<SidebarLayout />}>
            <Route path='/' element={<Home />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/student/courses/:id" element={<StrictRoute roles={[Roles.STUDENT]}><CourseDetails /></StrictRoute>} />
            <Route path="/student/lessons/:id" element={<StrictRoute roles={[Roles.STUDENT]}><PageLessonStudent /></StrictRoute>} />
            <Route path="/professor/courses" element={<StrictRoute roles={[Roles.PROFESSOR]}><ProfessorCoursesPage /></StrictRoute>} />
            <Route path="/student/enrolled-courses" element={<StrictRoute roles={[Roles.STUDENT]}><StudentCoursesPage /></StrictRoute>} />
            <Route path="/professor/courses/create" element={<StrictRoute roles={[Roles.PROFESSOR]}><NewCourseScreen /></StrictRoute>} />
            <Route path="/professor/courses/edit/:id" element={<StrictRoute roles={[Roles.PROFESSOR]}><EditCourseScreen /></StrictRoute>} />
            <Route path="/professor/courses/:courseId/lessons/create" element={<StrictRoute roles={[Roles.PROFESSOR]}><NewLessonScreen /></StrictRoute>} />
            <Route path="/professor/lessons/edit/:id" element={<StrictRoute roles={[Roles.PROFESSOR]}><LessonEditScreen /></StrictRoute>} />
            <Route path="/perfil" element={<StrictRoute roles={[Roles.STUDENT, Roles.PROFESSOR, Roles.ADMIN]}><UserProfileScreen /></StrictRoute>} />
            <Route path="/admin/generate-invite" element={<StrictRoute roles={[Roles.ADMIN]}><AdministrationPage /></StrictRoute>} />
            <Route path='/logout' element={<StrictRoute roles={[Roles.STUDENT, Roles.PROFESSOR, Roles.ADMIN]} children={<Logout />} />} />
            <Route path="*" element={< h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Ops! Você está perdido ?!<br />Esta rota não existe ;(</h2>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default DefaultRoutes

const LessonEditScreen = () => < h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Ops! Pagina de edição de aula!<br />Recurso em implementação</h2>;

const Logout = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const exec = async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      await setToken(null);
      navigate('/');
    }
    exec();
  }, [])

  return <></>
}

const PageLessonStudent = () => <h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Página de aula do aluno.<br /> Implementação em andamento!</h2>

const PageForProfessor = () => {
  const { logged, user } = useAuthContext();
  return <h1>Pagina de Professor - {user?.name}</h1>
}

const PageForStudent = () => {
  const { logged, user } = useAuthContext();
  return <h1>Pagina de Aluno - {user?.name}</h1>
}

const PageForAdmin = () => {
  const { logged, user } = useAuthContext();
  return <h1>Pagina de Admin - {user?.name}</h1>
}

const PageForNotLogged = () => {
  return <h1>Pagina geral, não precisa estar logado</h1>
}
