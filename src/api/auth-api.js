import { HttpResponse, HttpStatus, BASE_URL } from "./default";
import { AUTH_DEBUG } from "./default";

const getUserInfo = async (jwt) => {
    const url = `${BASE_URL}/user-info/`;
    try {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                jwt: jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        }

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            AUTH_DEBUG && console.log("AuthAPI::getUserInfo(): ", data);
            return new HttpResponse(HttpStatus.OK, data);
        } else throw new Error("Error on getUserInfo()");
    } catch (error) {
        console.warn(error)
        return new HttpResponse(HttpStatus.ERROR, null);
    }
}

const login = async (email, password) => {
    const url = `${BASE_URL}/login/`
    try {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ email, password })
        }

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            AUTH_DEBUG && console.log("AuthAPI::login(): ", data.token);
            return new HttpResponse(HttpStatus.OK, data);
        } else throw new Error("Error on login()");
    } catch (error) {
        console.warn(error)
        return new HttpResponse(HttpStatus.ERROR, null);
    }
}

const getCoursesData = async (jwt) => {
    const url = `${BASE_URL}/courses/courses`
    try {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                jwt: jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            AUTH_DEBUG && console.log("AuthAPI::getCoursesData(): ", data);
            return new HttpResponse(HttpStatus.OK, data);
        } else throw new Error("Error on getCoursesData()");
    } catch (error) {
        console.warn(error)
        return new HttpResponse(HttpStatus.ERROR, null);
    }
}

const getProfessorCourses = async(professorId, page = 1, size = 10) => {
    const url = `${BASE_URL}/courses/courses?page=${page}&size=${size}&professor=${professorId}`
    try {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                // jwt: jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            AUTH_DEBUG && console.log("AuthAPI::getProfessorCourses(): ", data);
            return new HttpResponse(HttpStatus.OK, data);
        } else throw new Error("Error on getProfessorCourses()");
     } catch (error) {
            console.warn(error)
            return new HttpResponse(HttpStatus.ERROR, null);
     }
}

const putInvite = async (userId, invite, jwt) => {
    const url = `${BASE_URL}/invitation/`;
    try {
        const options = {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({code: invite, professor: userId}),
            headers: {
                jwt: jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        }

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            AUTH_DEBUG && console.log("AuthAPI::getUserInfo(): ", data);
            return new HttpResponse(HttpStatus.OK, data);
        } else throw new Error("Error on getUserInfo()");
    } catch (error) {
        console.warn(error)
        return new HttpResponse(HttpStatus.ERROR, null);
    }
}

const getStudentCourses = async(studentId, page = 1, size = 10) => {
    const url = `${BASE_URL}/courses/courses?page=${page}&size=${size}&student=${studentId}`
    try {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                // jwt: jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            AUTH_DEBUG && console.log("AuthAPI::getStudentCourses(): ", data);
            return new HttpResponse(HttpStatus.OK, data);
        } else throw new Error("Error on getStudentCourses()");
     } catch (error) {
            console.warn(error)
            return new HttpResponse(HttpStatus.ERROR, null);
     }
}


export const AuthAPI = {
    getUserInfo,
    login,
    getCoursesData,
    getProfessorCourses,
    getStudentCourses,
    putInvite
}