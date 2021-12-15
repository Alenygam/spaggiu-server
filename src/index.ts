import express from 'express';
import fetch from 'node-fetch';

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 5000;

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(express.json());

const apiBaseURL : string = "https://web.spaggiari.eu/rest/v1";
const necessaryHeaders = {
    'Content-Type': 'application/json',
    'Z-Dev-ApiKey': '+zorro+',
    'User-Agent': 'zorro/1.0'
}

app.post('/auth/login', async (_req, _res) => {
    try {
        const res = await fetch(`${apiBaseURL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(_req.body),
            headers: necessaryHeaders
        });

        _res.status(res.status).json(await res.json());
    } catch (err: any) {
        _res.status(500).json({"message": err.message});
    }
})

app.listen(port, () => {
    console.log("Spaggiu server operativo su porta " + port.toString());
})