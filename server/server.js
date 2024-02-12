import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from 'openai'; 


dotenv.config();

const configuration = {
    apiKey: "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"
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
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // more risk model takes
            max_tokens: 3000, //pretty long response
            top_p: 1,
            frequency_penalty: 0.5, // not repeat similar sentence
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
