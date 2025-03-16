import { Request, Response } from "express";
import ollama from 'ollama';

export async function pullModel(req: Request, res: Response) {
    try {
        const {query} = req;
        let model = 'deepseek-r1';
        if (query?.model && typeof query?.model === 'string') {
            model = query?.model;
        }
        const result = await ollama.pull({ model, insecure: true, stream: false });
        res.status(200).json(result.status);
    } catch (error) {
        console.log('error pulling model: ', error);
        return res.status(200).json("no model returned");
    }
};

export async function ask(req: Request, res: Response) {
    try {
        const {query} = req;

        if (query?.msg && typeof query?.msg === 'string') {
            const msg = query?.msg;

            let model = 'deepseek-r1';

            if (query?.model && typeof query?.model === 'string') {
                model = query?.model;
            }
    
            res.status(200);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Transfer-Encoding', 'chunked');
            
            const message = { role: 'user', content: msg };
            const result = await ollama.chat({ model, messages: [message], stream: true});
    
            for await (const part of result) {
                res.write(part.message.content);
            }

            res.end();

        } else throw 'no message sent from client';
    } catch (error) {
        console.log('error chatting with model: ', error);
        return res.status(200).json("no msg response returned");
    }
};