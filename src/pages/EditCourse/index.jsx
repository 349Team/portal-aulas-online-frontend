/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Col, Row, Form, Button, Alert, Card } from 'react-bootstrap';
import { HttpStatus, CourseAPI } from "./api";
import noImage from './no-image.png'
import './style.css'
import { useAuthContext } from "../../contexts/AuthContext";
import { cut } from "../../tools/string";

const PostFormStatus = {
    ENVIADO: 'ENVIADO',
    ENVIANDO: 'ENVIANDO',
    ERRO: 'ERRO',
    NULL: 'NULL'
}

export const EditCourseScreen = () => {
    const [courseExists, setCourseExists] = useState(undefined)

    const resetValores = () => {
        return {
            title: "",
            description: "",
            files: [],
            content: "",
        };
    };

    const { id } = useParams();

    const { user } = useAuthContext();

    const [estado, setEstado] = useState({
        title: undefined,
        description: undefined,
        files: undefined,
        content: undefined
    });

    const [formValores, setFormValores] = useState(resetValores());
    const [postFormSuccess, setPostFormStatus] = useState(PostFormStatus.NULL);
    const [editable, setEditable] = useState(false);
    const [learnings, setLearnings] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [learningInput, setLearningInput] = useState("");
    const [allowLearnings, setAllowLearnings] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => { setTimeout(() => window.alert("Usando professor.id = 2 até finalização da tarefa de login"), 1000) }, [])

    useEffect(

        () =>
            setEstado({
                ...estado,
                files: formValores.files.length > 0 ? true : undefined,
            }),
        [formValores.files]
    );

    useEffect(() => { if (id) refreshLearnings() }, [id]);

    const setDescription = (e) => {
        setEstado({ ...estado, description: undefined })
        setFormValores({ ...formValores, description: e?.target?.value })
    }

    const setTitle = (e) => {
        setEstado({ ...estado, title: undefined })
        setFormValores({ ...formValores, title: e?.target?.value })
    }

    const setContent = (e) => {
        setEstado({ ...estado, content: undefined })
        setFormValores({ ...formValores, content: e?.target?.value })
    }

    const sendForm = async () => {
        var estadoAux = {
            title: formValores.title.trim().length >= 3,
            description: formValores.description.trim().length >= 2,
            files: formValores.files.length > 0,
            content: formValores.content.trim().length >= 3
        };

        setEstado({ ...estadoAux });

        for (let [, value] of Object.entries(estadoAux)) if (!value) return;

        setPostFormStatus(PostFormStatus.ENVIANDO);

        var post = new FormData();

        post.append("title", formValores.title);
        post.append("description", formValores.description);
        post.append("banner", formValores.files[0]);
        post.append("content", formValores.content);
        post.append("professor", user.id);


        CourseAPI.registerCourse(post).then(response => {
            setEditable(false)

            setTimeout(() => {
                setPostFormStatus(response.status === HttpStatus.OK ? PostFormStatus.ENVIADO : PostFormStatus.ERRO)
                if (response.status === HttpStatus.OK && !!response.data) {
                    setAllowLearnings(true)
                    setTimeout(() => setPostFormStatus(PostFormStatus.NULL), 5000)
                    setEstado({})
                }
            }, 1500)
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

    const addLearning = async (json) => {
        console.log(json)
        if (!json.name || !json.name.length) return
        const response = await CourseAPI.registerLearning(json)
        if (response.status === HttpStatus.OK) refreshLearnings()
    }

    const rmLearning = async (id) => {
        const response = await CourseAPI.deleteLearning(id)
        if (response.status === HttpStatus.OK)
            refreshLearnings()
    }

    const refreshLearnings = async () => {
        const response = await CourseAPI.getCourse(id)
        if (response.status === HttpStatus.OK && !!response.data) {
            const course = response.data
            setFormValores({
                title: course.title,
                description: course.description,
                content: course.content,
                files: [course.banner]
            })
            setLearnings([...course.learnings]);
            setLessons([...course.lessons])
            setAllowLearnings(true);
            setCourseExists(true)
        } else setCourseExists(false)
    }

    return (courseExists === false) ? <CourseNotFound /> : courseExists && !!user ? (
        <section className="box-course pb-1 pt-1">
            <Container fluid className="container-new-course container-course mb-5">
                <Form>
                    <Row>
                        <Col lg={12} className="mt-2">
                            <h2>Editar curso</h2>
                        </Col>
                        <Col xs={12} lg={7}>
                            <Container fluid>
                                <Row>
                                    <Col xs={12} className="pl0">
                                        <Form.Label className="w-100 mt-3">
                                            Titulo do curso
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
                                            Descrição do curso
                                            <Form.Control
                                                className="input-description"
                                                spellCheck="false"
                                                required
                                                as="textarea"
                                                value={formValores.description}
                                                onChange={setDescription}
                                                isValid={estado.description}
                                                disabled={!editable}
                                                isInvalid={estado.description !== undefined ? !estado.description : undefined}
                                                onBlur={() => setEstado({ ...estado, description: formValores.description.trim().length >= 3 })}
                                            />
                                        </Form.Label>
                                    </Col>
                                    <Col xs={12} className="pl0">
                                        <Form.Label className="w-100 mt-3">
                                            Conteudo do curso
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
                                        <span >Imagem do curso</span>
                                        <label htmlFor="input-files-ftc" style={{ width: "100%" }}>
                                            <img
                                                className={`image-for-input-file ${estado.files === false ? "error" : ""}`}
                                                src={formValores.files.length ? formValores.files[0] : noImage}
                                                style={{ width: "100%", objectFit: "contain", objectPosition: "center", cursor: "pointer", backgroundColor: "white" }}
                                            />
                                        </label>
                                    </Col>
                                    <InvisibleInputFile />
                                </Row>
                                <Row>
                                    <Col lg={12} className="mt-3 pr0" style={{ display: postFormSuccess !== PostFormStatus.NULL ? "none" : "block", paddingBottom: "5px" }}>
                                        <Button className="submit-form register-btn w-100"
                                            onClick={() => sendForm()}
                                            style={{ height: "60px" }}
                                            disabled={!editable}
                                        >
                                            {!editable && "Cadastrado" || "Cadastrar"}
                                        </Button>
                                    </Col>
                                    <Col lg={12} className="col-form-status pr0" style={{ display: postFormSuccess === PostFormStatus.NULL ? "none" : "block" }}>
                                        <Alert className="alert mt-3 form-status"
                                            variant={
                                                postFormSuccess === PostFormStatus.ENVIADO ? 'success' : postFormSuccess === PostFormStatus.ENVIANDO ? 'primary' : 'danger'}>
                                            {postFormSuccess === PostFormStatus.ENVIADO ? 'Curso cadastrado com sucesso !' :
                                                postFormSuccess === PostFormStatus.ENVIANDO ? 'Enviando ...' : 'Houve um erro ao cadastrar curso, por favor, tente novamente mais tarde!'}
                                        </Alert>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Form>
            </Container>
            {allowLearnings &&
                <Container fluid className="container-learnings-metadados container-course">
                    <Row>
                        <Col xs={12} lg={6}>
                            <Container fluid className="pl0 pr0">
                                <Col xs={12}>
                                    <h2>Aprendizados</h2>
                                </Col>
                                <Row>
                                    {learnings?.map((learning) => (
                                        <Col xs={12} className="mt-2" style={{ display: "flex", flexDirection: "row" }} key={learning.id}>
                                            <Form.Control
                                                className="input-learning"
                                                value={learning.name}
                                                disabled={true}
                                                style={{ width: "90%" }}
                                            />
                                            <Button className="remove-learning"
                                                onClick={() => rmLearning(learning.id)}
                                            >
                                                -
                                            </Button>
                                        </Col>
                                    ))}
                                    <Col xs={12}>
                                        <Form>
                                            <Form.Label className="label-submit-learning mt-3" style={{ width: "80%" }}>
                                                <span>Adicionar novo aprendizado</span>
                                                <Form.Control
                                                    className="input-learning w-100"
                                                    spellCheck={false}
                                                    required
                                                    type="text"
                                                    placeholder=""
                                                    value={learningInput}
                                                    onChange={(e) => setLearningInput(cut(e?.target?.value ?? learningInput, 128))}
                                                />
                                            </Form.Label>
                                            <Button className="submit-form-learning"
                                                onClick={() => {
                                                    addLearning({ name: learningInput, course: id })
                                                    setLearningInput("")
                                                }}
                                            >
                                                +
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} style={{ paddingTop: '3rem' }}>
                            <Container fluid className="pl0 pr0">
                                <Row>
                                    <Col xs={12}>
                                        <h2>Aulas</h2>
                                    </Col>
                                    {
                                        lessons.map((lesson, idx) => (
                                            <Col xs={12} lg={4} key={idx} className="mb-3">
                                                <Lesson data={lesson} />
                                            </Col>
                                        ))
                                    }
                                    <Col xs={12}>
                                        <Button className="submit-add-lesson"
                                            onClick={() => navigate(`/professor/courses/${id}/lessons/create`)}
                                        >
                                            +
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            }
        </section >
    ) : <></>;
}

export default EditCourseScreen;

const CourseNotFound = () => < h2 className="w-100 vh-100 d-flex flex-row justify-content-center align-items-center font-weight-bold-important">Ops! Você está perdido?<br />Este curso não existe</h2>;

const Lesson = ({ data }) => {

    return <Link to={`/professor/lessons/edit/${data.id}`} style={{textDecoration: "none", color: "black"}}>
        <Card style={{ width: '100%' }}>
            <Card.Img variant="left" src={data.banner} style={{ height: "30vh", objectFit: "fill" }} />
            <Card.Body>
                <Card.Title style={{display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "22px", height: "calc(3 * 22px)", fontSize: "18px", marginBottom: "1rem"}} >{data.title}</Card.Title>
                <Card.Text style={{display: "-webkit-box", WebkitLineClamp: 10, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "20px", height: "calc(10 * 20px)", fontSize: "16px"}}>{data.content}</Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    </Link>

}

/*
display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 20px;
    height: calc(3 * 20px);
*/