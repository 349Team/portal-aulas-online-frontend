/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

import { Col, Container, Navbar, Row, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthAPI } from '../../api/auth-api'
import { HttpStatus } from '../../api/default'
import { useAuthContext } from '../../contexts/AuthContext';
import CardCourses from '../../components/CardCourses'

const StudentCoursesPage = () => {
    const [userData, setUserData] = useState({ name: "" });
    const [data, setData] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    const { logged, user } = useAuthContext();
    const [activePage, setActivePage] = useState(1);
    const [amountPages, setAmountPages] = useState(6);

    const pageSize = 6;

    const renderPagination = () => {
        let items = []
        for(let i = 1; i <= amountPages; i++){
            if(!isFetched){
                items.push(
                    <Pagination.Item key={i} active={i === activePage} disabled onClick={() => setActivePage(i)}>{i}</Pagination.Item>
                )
            }else {
                items.push(
                    <Pagination.Item key={i} active={i === activePage} onClick={() => setActivePage(i)}>{i}</Pagination.Item>
                )
            }
        }

        return (
            <div>
                <Pagination>
                    {amountPages > 1 && (
                        <>
                            {isFetched ? 
                                <Pagination.Prev onClick={() => activePage > 1 && setActivePage((prevState) => prevState - 1)}/>
                                : <Pagination.Prev disabled onClick={() => activePage > 1 && setActivePage((prevState) => prevState - 1)}/>
                            }
                            {items}
                            {isFetched ? <Pagination.Next onClick={() => activePage < 3 && setActivePage((prevState) => prevState + 1)}/>
                            : <Pagination.Next disabled onClick={() => activePage < 3 && setActivePage((prevState) => prevState + 1)}/>}      
                        </>
                    )}
                </Pagination>
            </div>
        )
    }

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if (userData != null)
            setUserData(JSON.parse(userData))
    }, [])

    useEffect(() => {
        const getStudentCourses = async () => {
            setIsFetched(false)
            try {
                const {id} = userData;
                const responseCourses = await AuthAPI.getStudentCourses(id, activePage, pageSize)
                if (responseCourses.status === HttpStatus.OK) {
                    setData(responseCourses.data)
                    const pages = Math.ceil(responseCourses.data.count / pageSize)
                    setAmountPages(pages)
                    setIsFetched(true)
                }
            } catch(err){
                console.log(err)
            }
        }

        getStudentCourses();
    }, [userData, activePage, pageSize])

    return (
        <Row>
            <Row className="home-card mt-5">
                    <div className="col">
                        <h1 className="mb-3 fs-5 fw-bold">Meus cursos</h1>

                        {isFetched && logged && !!user ? (
                            <Row className="g-4">
                                {data.results.map((course) => (
                                    <Col xs={12} lg={4} key={course.id}>
                                        <Link to={`/student/courses/${course.id}`}>
                                            <CardCourses teste={course} />
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        ) : <></>}
                    </div>
                </Row>
            <Row className='mt-5'>
                <Col className='d-flex justify-content-center'>
                    {renderPagination()}
                </Col>
            </Row>
        </Row>
    )
}

export default StudentCoursesPage;