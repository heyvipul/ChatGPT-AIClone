import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from 'openai'; 


dotenv.config();

const configuration = {
    apiKey: process.env.OPENAI_API_KEY
};

const openai = new OpenAI(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "hello from codex"
    });
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.completions.create({
            model: "gpt-3.5-turbo",
            prompt: `${prompt}`,
            temperature: 0.5, // Adjusted temperature for better responses
            max_tokens: 100, // Adhering to Free tier TPM limit
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
});