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

const registerLesson = async (body) => {
  try {
    const url = `${BASE_URL}/lessons/lessons`
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
    throw new Error("CourseAPI::registerLesson()")
  } catch (error) {
    console.warn(error);
    return new HttpResponse(HttpStatus.ERROR, null);
  }
}

export const LessonAPI = {
  registerLesson
}