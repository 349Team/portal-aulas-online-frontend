import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import './LoginsScreen.css'
import { Form } from 'react-bootstrap';

export default function LoginScreen() {
    const intialValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formErrors);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = "Digita um usuário";
        }

        if (!values.password) {
            errors.password = "Digita uma senha";
        } else if (values.password.length < 4) {
            errors.password = "Senha inválida";
        } else if (values.password.length > 16) {
            errors.password = "Senha inválida";
        }
        return errors;
    }




    return (
        <>

            <div className="container-fluid p-5 col-11 col-sm-9 col-md-9 col-lg-10">
                <div className="row">
                    <div className="col mb-5">
                        <div className="row">
                            <div className="col">
                                <img style={{ width: "7em" }} src="https://i.ibb.co/DfGzNpM/logo.png" alt="logo" border="0" />
                            </div>
                            <div className="col d-flex justify-content-end">
                                <p>Não tem uma conta?</p>&nbsp; <a className="link-limpo" href="https://www.google.com.br"><p style={{ color: "#1dbfb0" }} className="fw-bold">CADASTRE-SE AGORA!</p></a>
                            </div>
                        </div>
                    </div>
                    <p className="fs-6 mb-1 ms-1">Bem-vindo(a) a plataforma da Let Cursos.</p>
                    <p className="fw-bold fs-4 ms-1">Entre para estudar!</p>
                </div>

                <div className="row ps-1 mt-2">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="username"
                                placeholder="Usuário"
                                className="form-control"
                                value={formValues.username}
                                onChange={handleChange} />
                        </div>
                        <p style={{ color: "red" }}>{formErrors.username}</p>
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
                        <p style={{ color: "red" }}>{formErrors.password}</p>
                        <div className="row mt-3">
                            <div className="col text-start">
                                <button className="btn btn-info"><FontAwesomeIcon icon={faCheck} className="me-2" />Entrar</button>
                            </div>
                            {/* <div className="col text-end">
                                    <button className="btn btn-outline-info"><FontAwesomeIcon icon={faCheck} className="me-2" />Entrar</button>
                                </div> */}
                        </div>
                    </Form>
                </div>
            </div >
            {/* <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <img style={{ width: "30%" }} src="https://i.ibb.co/DfGzNpM/logo.png" alt="logo" border="0" />
                    </div>
                    <div className="col">
                        <div class="p-2">
                            <p class="btn btn-outline-primary float-start">Float left</p>
                            <p class="btn btn-outline-primary float-right">Float right</p>
                            <br />
                        </div>

                    </div>
                </div>
                <div className="col p-3">
                    <div className="row justify-content-center">
                        <div className="col-9 col-sm-8 col-md-6 col-lg-4">

                            <div className="mb-3">
                                <label className="form-label">Nome:</label><br />
                                <input type="text" className="form-control" />
                            </div>
                            <div>
                                <label className="form-label">Telefone:</label><br />
                                <input type="text" className="form-control" />
                            </div>

                            <div className="row mt-3">
                                <div className="col text-start">
                                    <button className="btn btn-outline-warning"><FontAwesomeIcon icon={faTrash} className="me-2" /> Limpar Lista</button>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-outline-info"><FontAwesomeIcon icon={faCirclePlus} className="me-2" />Adicionar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}