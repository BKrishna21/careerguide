
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (err) {
        console.error("Generation error:", err);
        return "Sorry, something went wrong.";
    }
};

app.post('/api/chat', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).send({ error: "Prompt is required" });

    const answer = await generate(prompt);
    res.send({ response: answer });
});

app.post('/api/analysis', async (req, res) => {
    const { prompt } = req.body;
    try {
      const result = await generate(prompt);
      res.json({ response: result });
    } catch (error) {
      res.status(500).send("Error generating suggestion.");
    }
  });
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
