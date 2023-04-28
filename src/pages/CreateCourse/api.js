export const HttpStatus = {
  OK: 200,
  ERROR: 400
}

export class HttpResponse {
  status = HttpStatus.ERROR;
  data = null;

  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}

const BASE_URL = `https://portal-aulas-api.fly.dev`

const registerCourse = async (body) => {
  try {
    const url = `${BASE_URL}/courses/courses`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: body
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      return new HttpResponse(HttpStatus.OK, data)
    }
    throw new Error("CourseAPI::registerCourse()")
  } catch (error) {
    console.warn(error);
    return new HttpResponse(HttpStatus.ERROR, null);
  }
}

const registerLearning = async (body) => {
  try {
    const url = `${BASE_URL}/courses/learnings`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      return new HttpResponse(HttpStatus.OK, data)
    }
    throw new Error("CourseAPI::registerLearning()")
  } catch (error) {
    console.warn(error);
    return new HttpResponse(HttpStatus.ERROR, null);
  }
}

const getCourse = async (id) => {
  try {
    const url = `${BASE_URL}/courses/courses/${id}`
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      return new HttpResponse(HttpStatus.OK, data)
    }
    throw new Error("CourseAPI::getCourse()")
  } catch (error) {
    console.warn(error);
    return new HttpResponse(HttpStatus.ERROR, null);
  }
}

const deleteLearning = async (id) => {
  try {
    const url = `${BASE_URL}/courses/learnings/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    }
    const response = await fetch(url, options)
    if (response.ok)
      return new HttpResponse(HttpStatus.OK, null)
    throw new Error("CourseAPI::deleteLearning()")
  } catch (error) {
    console.warn(error);
    return new HttpResponse(HttpStatus.ERROR, null);
  }
}

export const CourseAPI = {
  registerCourse,
  registerLearning,
  getCourse,
  deleteLearning
}