import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCirclePlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import './style.css'
import { Form, Row, Toast, ToastHeader, ToastBody } from "react-bootstrap";

export default function RegisterScreen() {
    const intialValues = { name: "", email: "", password: "", cpf: "", about: "nothing", photo: "null", role: [1] };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e.target);
        const { name, value } = e.target;

        if (name === "cpf") {
            // Remove tudo que não é número
            if (value.length > 14) {
                return;
            }
            const formattedValue = value.replace(/\D/g, '');

            // Adiciona pontos e traço nos locais corretos
            function formatCPF(cpf) {
                return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            }
            setFormValues({ ...formValues, [name]: formatCPF(formattedValue) });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }

    }

    useEffect(() => {
        //console.log(formValues);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            //console.log(JSON.stringify(formValues))// CAHAMAR A FUNÇÃO DE CADASTRO AQUI ======================================================================================
            
                fetch('https://portal-aulas-api.fly.dev/user/', {
                    method: 'POST',
                    body: JSON.stringify(
                        formValues
                    ),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                         //console.log("OLHA O ERRO")
                         alert("Falha ao se comunicar com o servidor.");
                        }else{
                            navigate('/login')
                            alert("Registrado com sucesso!")
                        }
                        return response.json();
                      })
                    .then((data) => {
                        //console.log("erro 400", data);
                        //setToast(true)
                    })
                    .catch((err) => {
                        //console.log("catch", err.message);
                        //setToast(true)
                    });
            
           
        }
    }, [isSubmit]);

    useEffect(() => {
        //console.log(formValues);
        if (isSubmit)
            setFormErrors(validate(formValues));
    }, [formValues]);

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formErrors);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length !== 0 && isSubmit) {
           // console.log("TEM ERROS");
        }
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("submit: ", formValues);
            
            fetch('https://portal-aulas-api.fly.dev/user/', {
                method: 'POST',
                body: JSON.stringify(
                    formValues
                ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                     //console.log("OLHA O ERRO")
                     console.log(response)
                     alert("Falha ao se comunicar com o servidor.");
                    }
                    return response.json();
                  })
                .then((data) => {

                   // console.log("erro 400", data);
                    //setToast(true)
                })
                .catch((err) => {
                    //console.log("catch", err.message);
                    //setToast(true)
                });
            
        }
    }

    const validate = (values) => {
        const errors = {};
        const regexemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexcpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

        if (!values.name) {
            errors.name = "Digite um nome!";
        }

        if (!values.email && isSubmit) {
            errors.email = "Digita um email!";
        } else if (!regexemail.test(values.email)) {
            errors.email = "Digite um email com formato válido!";
        }

        if (!values.password) {
            errors.password = "Digite uma senha!";
        } else if (values.password.length < 4) {
            errors.password = "Senha precisa ter mais de 4 caracteres!";
        } else if (values.password.length > 16) {
            errors.password = "Senha não pode ter mais que 16 caracteres!";
        }

        if (!values.cpf) {
            errors.cpf = "Digite um cpf!";
        } else if (!regexcpf.test(values.cpf)) {
            errors.cpf = "Digite um cpf com formato válido!";
        }

        return errors;
    }







    return (
        <>



            <div className="container-fluid p-5 col-sm-7 col-md-8 col-lg-10">
                <div className="row">
                    <div className="col">
                        <img style={{ width: "11em" }} src="https://i.ibb.co/r3QPmSt/logo.png" alt="logo" border="0" />
                    </div>
                    <div className="col d-flex justify-content-end">
                    <p className="mt-3">Já tem conta?&nbsp;<Link className="fw-bold link-termos" to="/login">ENTRE AGORA!</Link></p>
                        
                    </div>
                    <p className="fw-bold fs-4 ms-1 mt-5">Estude Gratuitamente!</p>
                </div>

                <div className="row ps-1 mt-2">
                    <Form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome e Sobrenome"
                            className="form-control"
                            value={formValues.name}
                            onChange={handleChange} />
                        <p className="ps-2" style={{ color: "red" }}>{formErrors.name}</p>

                        <div className="mt-3">
                            <input
                                name="email"
                                placeholder="Email *"
                                className="form-control"
                                value={formValues.email}
                                onChange={handleChange} />
                        </div>
                        <p className="ps-2" style={{ color: "red" }}>{formErrors.email}</p>
                        <div className="mt-3">
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha *"
                                className="form-control"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="ps-2" style={{ color: "red" }}>{formErrors.password}</p>
                        <div className="mt-3">
                            <input
                                type="text"
                                name="cpf"
                                placeholder="CPF *"
                                className="form-control"
                                value={formValues.cpf}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="ps-2" style={{ color: "red" }}>{formErrors.cpf}</p>
                        <p className="ps-1" style={{ fontSize: "13px" }}>Ao me cadastrar, concordo com os <a href="http://www.google.com.br" className="link-termos">Termos de uso e Política de privacidade</a></p>


                        <div className="row mt-3">
                            <div className="col text-start">
                                <button className="fbtn btn btn-success"><FontAwesomeIcon icon={faCheck} className="me-2" />CRIAR CONTA</button>
                            </div>
                            {/* <div className="col text-end">
                                    <button className="btn btn-outline-info"><FontAwesomeIcon icon={faCheck} className="me-2" />Entrar</button>
                                </div> */}
                        </div>
                    </Form>
                </div>
            </div >


        </>
    )
}
