import express, {Request, Response} from 'express';
import Api from './api.js';

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 5000;

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Auth-Token");
    next();
})
app.use(express.json());

// Auth
app.post('/auth/login', loginRequest);
app.get('/auth/avatar', GETrequest);
app.get('/auth/status', GETrequest);
app.get('/auth/ticket', GETrequest);

// Absence
app.get('/students/:studentID/absences/details', GETrequest);
app.get('/students/:studentID/absences/details/:begin', GETrequest);
app.get('/students/:studentID/absences/details/:begin/:end', GETrequest);

// Agenda
app.get('/students/:studentID/agenda/all/:begin/:end', GETrequest);
app.get('/students/:studentID/agenda/:eventCode/:begin/:end', GETrequest);

// Didactics
app.get('/students/:studentID/didactics', GETrequest);
app.get('/students/:studentID/didactics/item/:contentID', GETrequest);

// Notice Board
app.get('/students/:studentID/noticeboard', GETrequest);
app.post('/students/:studentID/noticeboard/read/:eventCode/:pubId/101', POSTrequest);
app.get('/students/:studentID/noticeboard/attach/:eventCode/:pubId/101', GETrequest);

// Schoolbooks (this isn't a thing wtf)
app.get('/students/:studentID/schoolbooks', GETrequest);

// Calendar (bro this is utterly useless)
app.get('/students/:studentID/calendar/all');

// Card
app.get('/students/:studentID/card', GETrequest);
app.get('/students/:studentID/cards', GETrequest);

// Grades
app.get('/students/:studentID/grades', GETrequest);

// Lessons
app.get('/students/:studentID/lessons/today', GETrequest);
app.get('/students/:studentID/lessons/:day', GETrequest);
app.get('/students/:studentID/lessons/:start/:end', GETrequest);

// Notes
app.get('/students/:studentID/notes/all', GETrequest);
app.post('/students/:studentID/notes/:type/read/:note', POSTrequest);

// Periods
app.get('/students/:studentID/periods', GETrequest);

// Subjects
app.get('/students/:studentID/subjects', GETrequest);

// Documents
// TODO: not all responses are json. This is a must fix
app.post('/students/:studentID/documents', POSTrequest)
app.post('/students/:studentID/documents/check/:hash', POSTrequest)
app.post('/students/:studentID/documents/read/:hash', POSTrequest)

const api = new Api();

async function loginRequest(req: Request, res: Response, next: Function) {
    console.log(req.path);
    const [statusCode, response] = await api.fetch(req.path, 'POST', {
        body: JSON.stringify(req.body)
    })

    res.status(statusCode).json(response);
}

async function POSTrequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path, 'POST', {
        body: JSON.stringify(req.body),
        extraHeaders: {
            'Z-Auth-Token': req.header('Z-Auth-Token') || "",
        }
    })

    res.status(statusCode).json(response);
}

async function GETrequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path, 'GET', {
        extraHeaders: {
            'Z-Auth-Token': req.header('Z-Auth-Token') || "",
        }
    })

    res.status(statusCode).json(response);
}


app.listen(port, () => {
    console.log("Spaggiu server operativo su porta " + port.toString());
})