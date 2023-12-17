import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const appid = 'c400cbacedc8ddaea226aae8727f8f1c';

app.post("/check-weather", async (req, res) => {
    const latitude = req.body.latitude || -35.280937;
    const longitude = req.body.longitude || 149.130005;

    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${appid}&lat=${latitude}&lon=${longitude}`;

    try {
        const result = await axios.get(apiUrl);
        res.render("index.ejs", { condition: result.data.list[0].weather[0].description });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get("/", async (req, res) => {
    const latitude = req.body.latitude || -35.280937;
    const longitude = req.body.longitude || 149.130005;

    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${appid}&lat=${latitude}&lon=${longitude}`;

    try {
        const result = await axios.get(apiUrl);
        res.render("index.ejs", { condition: result.data.list[0].weather[0].description });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
