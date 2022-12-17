import express, {Request, Response} from 'express';
import Api from './api.js';

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 5000;

app.use(express.json());

// Auth
app.post('/api/auth/login', loginRequest);
app.get('/api/auth/avatar', GETrequest);
app.get('/api/auth/status', GETrequest);
app.get('/api/auth/ticket', GETrequest);

// Absence
app.get('/api/students/:studentID/absences/details', GETrequest);
app.get('/api/students/:studentID/absences/details/:begin', GETrequest);
app.get('/api/students/:studentID/absences/details/:begin/:end', GETrequest);

// Agenda
app.get('/api/students/:studentID/agenda/all/:begin/:end', GETrequest);
app.get('/api/students/:studentID/agenda/:eventCode/:begin/:end', GETrequest);

// Didactics
app.get('/api/students/:studentID/didactics', GETrequest);
app.get('/api/students/:studentID/didactics/item/:contentID', GETrequest);

// Notice Board
app.get('/api/students/:studentID/noticeboard', GETrequest);
app.post('/api/students/:studentID/noticeboard/read/:eventCode/:pubId/101', POSTrequest);
app.get('/api/students/:studentID/noticeboard/attach/:eventCode/:pubId/101', GETrequest);

// Schoolbooks (this isn't a thing wtf)
app.get('/api/students/:studentID/schoolbooks', GETrequest);

// Calendar (bro this is utterly useless)
app.get('/api/students/:studentID/calendar/all');

// Card
app.get('/api/students/:studentID/card', GETrequest);
app.get('/api/students/:studentID/cards', GETrequest);

// Grades
app.get('/api/students/:studentID/grades', GETrequest);

// Lessons
app.get('/api/students/:studentID/lessons/today', GETrequest);
app.get('/api/students/:studentID/lessons/:day', GETrequest);
app.get('/api/students/:studentID/lessons/:start/:end', GETrequest);

// Notes
app.get('/api/students/:studentID/notes/all', GETrequest);
app.post('/api/students/:studentID/notes/:type/read/:note', POSTrequest);

// Periods
app.get('/api/students/:studentID/periods', GETrequest);

// Subjects
app.get('/api/students/:studentID/subjects', GETrequest);

// Documents
// TODO: not all responses are json. This is a must fix
app.post('/api/students/:studentID/documents', POSTrequest)
app.post('/api/students/:studentID/documents/check/:hash', POSTrequest)
app.post('/api/students/:studentID/documents/read/:hash', POSTrequest)

const api = new Api();

async function loginRequest(req: Request, res: Response, next: Function) {
    console.log(req.path);
    const [statusCode, response] = await api.fetch(req.path.substr(4), 'POST', {
        body: JSON.stringify(req.body)
    })

    res.status(statusCode).json(response);
}

async function POSTrequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path.substr(4), 'POST', {
        body: JSON.stringify(req.body),
        extraHeaders: {
            'Z-Auth-Token': req.header('Z-Auth-Token') || "",
        }
    })

    res.status(statusCode).json(response);
}

async function GETrequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path.substr(4), 'GET', {
        extraHeaders: {
            'Z-Auth-Token': req.header('Z-Auth-Token') || "",
        }
    })

    res.status(statusCode).json(response);
}


app.listen(port, () => {
    console.log("Spaggiu server operativo su porta " + port.toString());
})
