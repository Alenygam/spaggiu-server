import express, {Request, Response} from 'express';
import Api from './api.js';

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 5000;

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(express.json());

const api = new Api();

async function loginRequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path, 'POST', {
        body: req.body
    })

    res.status(statusCode).json(response);
}

async function POSTrequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path, 'POST', {
        body: req.body,
        extraHeaders: {
            'Z-Auth-Token': req.header('Z-Auth-Token') || "",
        }
    })

    res.status(statusCode).json(response);
}

async function GETrequest(req: Request, res: Response, next: Function) {
    const [statusCode, response] = await api.fetch(req.path, 'POST', {
        body: req.body,
        extraHeaders: {
            'Z-Auth-Token': req.header('Z-Auth-Token') || "",
        }
    })

    res.status(statusCode).json(response);
}


app.listen(port, () => {
    console.log("Spaggiu server operativo su porta " + port.toString());
})