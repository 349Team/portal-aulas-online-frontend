/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import LoginPage from "../pages/Login";
import RegisterScreen from "../pages/Register";
import NewCourseScreen from "../pages/CreateCourse";
import Home from "../pages/Home/Home";
import SideNav from '../components/NavBar';
import { AuthProvider, useAuthContext } from '../contexts/AuthContext';
import { StrictRoute } from '../contexts/StrictRoute';
import { Roles } from '../api/default';
import UserProfileScreen from '../pages/UserProfile'

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
            <Route path="/perfil" element={<UserProfileScreen />} />
            <Route path="/professor/courses/create" element={<StrictRoute roles={[Roles.PROFESSOR]}><NewCourseScreen /></StrictRoute>} />
            <Route path="/professor/courses/:courseId/lessons/create" element={<StrictRoute roles={[Roles.PROFESSOR]}><PageLessonRegister /></StrictRoute>} />
            <Route path='/test/student' element={<StrictRoute roles={[Roles.STUDENT]} children={<PageForStudent />} />} />
            <Route path='/test/professor' element={<StrictRoute roles={[Roles.PROFESSOR]} children={<PageForProfessor />} />} />
            <Route path='/test/admin' element={<StrictRoute roles={[Roles.ADMIN]} children={<PageForAdmin />} />} />
            <Route path='/test/any' element={<PageForNotLogged />} />
            <Route path='/logout' element={<StrictRoute roles={[Roles.STUDENT, Roles.PROFESSOR, Roles.ADMIN]} children={<Logout />} />} />
            <Route path="*" element={< h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Ops! Você está perdido ?!<br />Esta rota não existe ;(</h2>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default DefaultRoutes

const Logout = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const exec = async () => {
      localStorage.removeItem('token');
      await setToken(null);
      navigate('/');
    }
    exec();
  }, [])

  return <></>
}

const PageLessonRegister = () => <h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Página de cadastro de aula.<br /> Implementação em andamento!</h2>

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