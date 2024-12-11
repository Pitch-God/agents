import express from "express";
import { checkpointConfig, graph } from "./index.js";


const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/api', (req, res) => {
    console.log(req.body);
    res.send('Data received successfully!');
});


app.post('/agent', async (req, res) => {

    console.log(req.body);

    const userLocation= req.body.userLocation;
    const emailSentDate= req.body.emailSentDate;
    const emailThread= req.body.emailThread;

    const result = await graph.invoke({
        emailThread:JSON.stringify(emailThread),
        userLocation: userLocation,
        emailSentDate:emailSentDate
    },checkpointConfig);

    res.send(result);


})