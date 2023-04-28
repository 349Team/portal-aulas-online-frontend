import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";

import "./card_details.css"
import { useAuthContext } from '../../contexts/AuthContext';

function CardDetails({ image, course }) {

    const { logged, user } = useAuthContext();

    const alertClicked = () => {
        alert('Erro ao realizar inscrição, tente novamente mais tarde!');
    };
    const alertClickedLooged = () => {
        setButtonDisabled(true);
        alert('Para realizar inscrição é necessário efetuar login!');
    };

    const [dados, setDados] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [cardText, setcardText] = useState('');
    const [cardText2, setcardText2] = useState('');
    const [buttonText, setButtonText] = useState('');
    const { id: courseId } = useParams();

    const verificaInsc = () => {
        const student = course?.students?.find((student) => student.id === user.id);
        console.log("student verifica: ", student);
        return (student !== undefined) || user.id === course.professor.id;
    }

    useEffect(() => {
        if (!!user) {
            const isStudentInscrito = verificaInsc();
            console.log("isStident: ", isStudentInscrito)
            setButtonDisabled(isStudentInscrito);
            setcardText(isStudentInscrito ? 'Oba! As aula estão disponíveis!' : 'Gostou do conteúdo do curso?');
            setcardText2(isStudentInscrito ? 'Aproveite!' : 'Inscreva-se já!');
            setButtonText(isStudentInscrito ? 'Inscrito' : 'Inscrever-se');
        }
    }, [user]);

    const inscricaoCursoAPI = () => {
        const url = `https://portal-aulas-api.fly.dev/courses/courses/enroll-student/${courseId}/${user.id}`;
        const requestOptions = {
            method: 'POST'
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                setButtonDisabled(true);
                setcardText('Oba! As aula estão disponíveis!');
                setcardText2('Aproveite!');
                setButtonText('Inscrito');
            })
            .catch(error => {
                console.log(error);
                alertClicked();
            });
    };

    return logged && !!user && courseId ? (
        <div className="card-css text-center">
            <Card style={{ width: '14rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title className='text-color'>
                        {cardText}
                    </Card.Title>
                    <Card.Text className='text-color'>
                        {cardText2}
                    </Card.Text>
                    <Button onClick={inscricaoCursoAPI} disabled={buttonDisabled} className="btn-success">
                        {buttonText}
                    </Button>
                </Card.Body>
            </Card>
        </div>
    ) : <>
        <div className="card-css text-center">
            <Card style={{ width: '14rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title className='text-color'>
                            Gostou do conteúdo do curso?
                        </Card.Title>
                        <Card.Text className='text-color'>
                            inscreva-se ja!
                        </Card.Text>
                        <Button onClick={alertClickedLooged} disabled={buttonDisabled} className="btn-success">
                            Inscreva-se
                        </Button>
                    </Card.Body>
            </Card>
        </div>
    </>;
};

export default CardDetails;