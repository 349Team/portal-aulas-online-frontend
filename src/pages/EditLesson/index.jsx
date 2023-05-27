/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import { Container, Col, Row, Form, Button, Alert, Modal } from 'react-bootstrap';
import { HttpStatus, LessonAPI } from "./api";
import { cut } from "../../tools/string";
import { useAuthContext } from "../../contexts/AuthContext";
import noImage from './no-image.png'
import './style.css'

const PostFormStatus = {
    ENVIADO: 'ENVIADO',
    ENVIANDO: 'ENVIANDO',
    ERRO: 'ERRO',
    NULL: 'NULL'
}

const isString = value => typeof value === 'string' || value instanceof String;
const imageBeUpdated = value => !(isString(value) && value.slice(0, 5).includes('http'))
const videoBeUpdated = value => !(isString(value) && value.slice(0, 5).includes('http'))

export const EditLessonScreen = () => {
    const [lessonExists, setLessonExists] = useState(undefined);

    const resetValores = () => {
        return {
            title: "",
            files: [],
            content: "",
            videos: [],
            useBannerFromVideo: false,
            course: null,
        };
    };

    const { id } = useParams();

     const { user } = useAuthContext();

    const [estado, setEstado] = useState({
        title: undefined,
        files: undefined,
        content: undefined,
        videos: undefined,
    });

    const [formValores, setFormValores] = useState(resetValores());
    const [postFormSuccess, setPostFormStatus] = useState(PostFormStatus.NULL);
    const [editable, setEditable] = useState(false);

    const navigate = useNavigate();

    useEffect(

        () =>
            setEstado({
                ...estado,
                files: formValores.files.length > 0 ? true : undefined,
            }),
        [formValores.files]
    );

    useEffect(() => { if (id) refreshLesson() }, [id]);

    const setTitle = (e) => {
        setEstado({ ...estado, title: undefined })
        setFormValores({ ...formValores, title: cut(e?.target?.value ?? "", 64) })
    }

    const setContent = (e) => {
        setEstado({ ...estado, content: undefined })
        setFormValores({ ...formValores, content: cut(e?.target?.value, 1024) })
    }

    const sendForm = async () => {
        var estadoAux = {
            title: formValores.title.trim().length >= 3,
            files: formValores.files.length > 0 || formValores.useBannerFromVideo,
            content: formValores.content.trim().length >= 3,
            videos: formValores.videos.length > 0 || (formValores.files.length > 0 && !formValores.useBannerFromVideo),
        };

        setEstado({ ...estadoAux });

        for (let [, value] of Object.entries(estadoAux)) if (!value) return;

        setPostFormStatus(PostFormStatus.ENVIANDO);

        var post = new FormData();

        console.log('ToSend: ', formValores)

        post.append("title", formValores.title);
        post.append("content", formValores.content);

        if (!formValores.useBannerFromVideo && formValores.files.lenght && imageBeUpdated(formValores.files[0]))
            post.append("banner", formValores.files[0]);

        if (formValores.videos.length && videoBeUpdated(formValores.videos[0]))
            post.append("video", formValores.videos[0]);

        console.log(formValores)

        LessonAPI.updateLesson(post, id).then(response => {
            setEditable(false)
            setTimeout(() => {
                setPostFormStatus(response.status === HttpStatus.OK ? PostFormStatus.ENVIADO : PostFormStatus.ERRO)
                if (response.status === HttpStatus.OK && !!response.data) {
                    setTimeout(() => setPostFormStatus(PostFormStatus.NULL)
                        , 2000)
                    setEstado({})
                }
            }, 1500)
            refreshLesson()
        })
    }

    const FileListToFileArray = (fileList) => {
        var files = []
        for (let idx = 0; idx < fileList.length; idx++) {
            files.push(fileList[idx])
        }
        return files
    }

    const InvisibleInputFile = () => (
        <input id='input-files-ftc'
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
                setFormValores({
                    ...formValores,
                    files: FileListToFileArray(e.target.files ?? new FileList())
                })
                setEstado({ ...estado, files: true })
            }}
            accept='.png,.jpeg,.jpg,.webp'
            disabled={!editable}
        />
    );

    const InvisibleVideoInputFile = () => (
        <input id='input-files-video-ftc'
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
                setFormValores({
                    ...formValores,
                    videos: FileListToFileArray(e.target.files ?? new FileList())
                })
                setEstado({ ...estado, videos: true })
            }}
            accept='.mp4,.webm'
            disabled={!editable}
        />
    );

    const refreshLesson = async () => {
        const response = await LessonAPI.getLesson(id)
        if (response.status === HttpStatus.OK && !!response.data) {
            const lesson = response.data
            setFormValores({
                title: lesson.title,
                content: lesson.content,
                files: [lesson.banner],
                videos: [lesson.video],
                course: lesson.course
            })
            setLessonExists(true)
        } else setLessonExists(false)
    }

    const rmlesson = async (id) => {
        const response = await LessonAPI.deleteLesson(id)
        if (response.status === HttpStatus.OK)
            navigate(`/professor/courses/edit/${formValores.course}`)()
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (lessonExists === false) ? <LessonNotFound /> : lessonExists && !!user ? (
        <section className="box-course pb-1 pt-1">
            <Container fluid className="container-new-lesson container-lesson mb-5">
                <Form>
                    <Row>
                        <Col lg={12} className="mt-4">
                            <Row>
                                <Col xs={10}>
                                    <Button className="submit-add-lesson mt-3"
                                        onClick={() => navigate(`/professor/courses/edit/${formValores.course}`)}
                                    >
                                        Voltar
                                    </Button>
                                </Col>
                                <Col xs={2}>
                                    <Button className="submit-form mt-3 remove-bnt w-100" onClick={handleShow}>
                                        Excluir aula
                                    </Button>

                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirmar exclusão de aula?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Row >
                                                <Col xs={6}>
                                                    <Button onClick={handleClose} className="mt-3 cancel-modal-btn w-100">
                                                        Cancelar
                                                    </Button>
                                                </Col>

                                                <Col xs={6}>
                                                    <Button 
                                                        className="mt-3 remove-modal-btn w-100"
                                                        onClick={() => rmlesson(id)}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Modal.Body>
                                    </Modal>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} className="mt-3">
                            <h2>Editar aula</h2>
                        </Col>
                        <Col xs={12} lg={7}>
                            <Container fluid>
                                <Row>
                                    <Col xs={12} className="pl0">
                                        <Form.Label className="w-100 mt-3">
                                            Titulo da aula
                                            <Form.Control
                                                className="input-title"
                                                spellCheck={false}
                                                required
                                                type="text"
                                                placeholder=""
                                                value={formValores.title}
                                                onChange={setTitle}
                                                isValid={estado.title}
                                                disabled={!editable}
                                                isInvalid={estado.title !== undefined ? !estado.title : undefined}
                                                onBlur={() => setEstado({ ...estado, title: formValores.title.trim().length >= 3 })}
                                            />
                                        </Form.Label>
                                    </Col>
                                    <Col xs={12} className="pl0">
                                        <Form.Label className="w-100 mt-3">
                                            Conteudo da aula
                                            <Form.Control
                                                className="input-content"
                                                spellCheck="false"
                                                required
                                                as="textarea"
                                                value={formValores.content}
                                                onChange={setContent}
                                                isValid={estado.content}
                                                disabled={!editable}
                                                isInvalid={estado.content !== undefined ? !estado.content : undefined}
                                                onBlur={() => setEstado({ ...estado, content: formValores.content.trim().length >= 3 })}
                                            />
                                        </Form.Label>
                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} lg={5}>
                            <Container fluid className="h-100 d-flex flex-column justify-content-between">
                                <Row>
                                    <Col xs={12} className='mt-3 pr0'>
                                        <span >Thumbnail da aula</span>
                                        <label htmlFor="input-files-ftc" style={{ width: "100%" }}>
                                            <img
                                                className={`image-for-input-file ${estado.files === false ? "error" : ""}`}
                                                src={!!formValores.files.length && !imageBeUpdated(formValores.files[0]) ? formValores.files[0] : formValores.files.length ? URL.createObjectURL(formValores.files[0]) : noImage}
                                                style={{ width: "100%", objectFit: "contain", objectPosition: "center", cursor: "pointer", backgroundColor: "white" }}
                                            />
                                        </label>
                                    </Col>
                                    <Col xs={12} className='file-input-span mb-3'>
                                        <span className={`${!!estado.files ? 'ok' : estado.files === false ? 'error' : ''}`}>
                                            {formValores.files.length > 0 ? `${formValores.files.length} ${formValores.files.length > 1 ? 'imagens selecionadas' : 'imagem selecionada'}` : 'Nenhuma imagem selecionada'}
                                        </span>
                                    </Col>
                                    <Col xs={12} className='mt-3 pr0'>
                                        <Form.Check
                                            type="checkbox"
                                            id='use-frame-as-banner-checkbox'
                                            aria-label="radio 2"
                                            label="Usar 1º frame do video como thumbnail"
                                            onChange={(e) => {
                                                setFormValores({ ...formValores, useBannerFromVideo: e.target.checked })
                                            }}
                                            checked={formValores.useBannerFromVideo}
                                        />
                                    </Col>
                                    <Col xs={12} className='mt-3 pr0'>
                                        <label htmlFor="input-files-video-ftc" className='label-to-use-frame-as-banner-input'>
                                            <span>Selecionar video</span>
                                        </label>
                                    </Col>
                                    <Col xs={12} className='file-input-span mb-3'>
                                        <span className={`${!!estado.videos ? 'ok' : estado.videos === false ? 'error' : ''}`}>
                                            {formValores.videos.length > 0 ? `${formValores.videos.length} ${formValores.videos.length > 1 ? 'videos selecionados' : 'video selecionado'}` : 'Nenhum video selecionado'}
                                        </span>
                                    </Col>
                                    <InvisibleInputFile />
                                    <InvisibleVideoInputFile />
                                </Row>
                                <Row>
                                    <Col lg={12} className="mt-3 pr0" style={{ display: postFormSuccess !== PostFormStatus.NULL ? "none" : "block", paddingBottom: "5px" }}>
                                        {editable &&
                                            <Button className="submit-form mb-2 cancel-btn w-100"
                                                onClick={() => setEditable(false)}
                                                style={{ height: "60px" }}
                                            >
                                                Cancelar
                                            </Button>
                                        }
                                        {!editable ? (
                                            <Button className="submit-form register-btn w-100"
                                                onClick={() => setEditable(true)}
                                                style={{ height: "60px" }}
                                            >
                                                Editar
                                            </Button>
                                        ) : (
                                            <Button className="submit-form register-btn w-100"
                                                onClick={() => sendForm()}
                                                style={{ height: "60px" }}
                                            >
                                                Salvar
                                            </Button>
                                        )}
                                    </Col>
                                    <Col lg={12} className="col-form-status pr0" style={{ display: postFormSuccess === PostFormStatus.NULL ? "none" : "block" }}>
                                        <Alert className="alert mt-3 form-status"
                                            variant={
                                                postFormSuccess === PostFormStatus.ENVIADO ? 'success' : postFormSuccess === PostFormStatus.ENVIANDO ? 'primary' : 'danger'}>
                                            {postFormSuccess === PostFormStatus.ENVIADO ? 'Alteração da aula realizada com sucesso !' :
                                                postFormSuccess === PostFormStatus.ENVIANDO ? 'Enviando ...' : 'Houve um erro ao editar aula, por favor, tente novamente mais tarde!'}
                                        </Alert>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </section >
    ) : <></>;
}

export default EditLessonScreen

const LessonNotFound = () => < h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Ops! Você está perdido?<br />Esta aula não existe</h2>;