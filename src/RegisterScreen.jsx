import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCirclePlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import './LoginsScreen.css'

export default function RegisterScreen() {
    return (
        <>
            <div className="container-fluid p-5 col-5">
                <div className="row">
                    <div className="col">
                        <img style={{ width: "11em" }} src="https://i.ibb.co/DfGzNpM/logo.png" alt="logo" border="0" />
                    </div>
                    <div className="col d-flex justify-content-end">
                        <p className="mt-3">Já tem conta? <a className="fw-bold link-termos" href="https://www.google.com.br">ENTRE AGORA!</a></p>
                    </div>
                    <p className="fw-bold fs-4 ms-1 mt-5">Estude Gratuitamente!</p>
                </div>

                <div className="row ps-1 mt-2">
                    <div className="col-4">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Primeiro nome *" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Sobrenome *" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="E-mail *" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Senha *" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="CPF *" />
                    </div>
                    <p style={{ fontSize: "13px" }}>Ao me cadastrar, concordo com os <a href="http://www.google.com.br" className="link-termos">Termos de uso e Política de privacidade</a></p>


                    <div className="row mt-3">
                        <div className="col text-start">
                            <button className="btn btn-success"><FontAwesomeIcon icon={faCheck} className="me-2" />CRIAR CONTA</button>
                        </div>
                        {/* <div className="col text-end">
                                    <button className="btn btn-outline-info"><FontAwesomeIcon icon={faCheck} className="me-2" />Entrar</button>
                                </div> */}
                    </div>
                </div>
                <div className="row"></div>
            </div >


        </>
    )
}