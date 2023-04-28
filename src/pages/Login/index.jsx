import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap';
import { AuthAPI } from "../../api/auth-api";
import { HttpStatus } from "../../api/default";

// Style
import './style.css'
import { useAuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();

    const { setToken } = useAuthContext();

    const intialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    var errorsC = 0;

    const saveTokenOnLocalStorage = (token) => {
        console.log("LoginPage::saveTokenOnLocalStorage(): ", token)
        localStorage.setItem('token', token);
    }

    const saveUserDataOnLocalStorage = () => {
        const jwt = localStorage.getItem('token')
        AuthAPI.getUserInfo(jwt).then((response) => {
            if (response.status == HttpStatus.OK) {
                localStorage.setItem('userData', JSON.stringify(response.data));
            }
        });
        //console.log(data)
        //localStorage.setItem('userData', data);
    }



    useEffect(() => {
        if (isSubmit)
            setFormErrors(validate(formValues));
    }, [formValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    useEffect(() => {
        if (Object.keys(formErrors).length !== 0 && isSubmit) { }
    }, [formErrors, isSubmit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (errorsC == 0) {
            console.log(formValues)
            const responseLogin = await AuthAPI.login(formValues.email, formValues.password)
            saveTokenOnLocalStorage(responseLogin.data.token)
            const ok = await setToken(responseLogin.data.token);
            if (ok) {
                saveUserDataOnLocalStorage()
                navigate("/")
            }

        }
    }

    const validate = (values) => {
        const errors = {};
        errorsC = 0;

        if (!values.email) {
            errors.email = "Digite um usuário";
        }

        if (!values.password) {
            errors.password = "Digite uma senha";
        } else if (values.password.length < 4) {
            errors.password = "Senha inválida";
        } else if (values.password.length > 16) {
            errors.password = "Senha inválida";
        }
        errorsC = Object.keys(errors).length;
        return errors;
    }

    return (
        <>
            <div className="container p-5 col-7">
                <div className="row">
                    <div className="col mb-5">
                        <div className="row">
                            <div className="col">
                                <img style={{ width: "11em" }} onClick={() => { window.location.href = "/" }} src="https://i.ibb.co/r3QPmSt/logo.png" alt="logo" border="0" />
                            </div>
                            <div className="col d-flex justify-content-end">
                                <p className="mt-3">Não tem uma conta?&nbsp;<Link className="fw-bold link-limpo" style={{ color: "#1dbfb0" }} to="/register">CADASTRE-SE AGORA!</Link></p>
                            </div>
                        </div>
                    </div>
                    <p className="fs-6 mb-1 ms-1">Bem-vindo(a) a plataforma da Let Cursos.</p>
                    <p className="fw-bold fs-4 ms-1">Entre para estudar!</p>
                </div>
                <div className="row ps-1 mt-2">
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={formValues.username}
                                onChange={handleChange} />
                        </div>
                        <p className="mb-3 ps-1" style={{ color: "red" }}>{formErrors.email}</p>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                className="form-control"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="mb-3 ps-1" style={{ color: "red" }}>{formErrors.password}</p>
                        <div className="row mt-3">
                            <div className="col text-start">
                                <button className="btn btn-info"><FontAwesomeIcon icon={faCheck} className="me-2" />Entrar</button>
                            </div>
                        </div>
                    </Form>
                    {/* / <button className="btn btn-info" onClick={userinfo}><FontAwesomeIcon icon={faCheck} className="me-2" />Testar</button> */}
                </div>
            </div >
        </>
    )
}

export default LoginPage
