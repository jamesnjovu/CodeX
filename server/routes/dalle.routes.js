import express from 'express';
import * as dotenv from 'dotenv';

import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({message: "Api V1"})
})
router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        
        const text_resp = response.data.choices[0].text;
        res.status(200).json({bot: text_resp });
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})

export default router;