import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type InstructionMessage = {
    role: 'system';
    content: string;
};
const instMessage: InstructionMessage = {
    role: 'system',
    content: "You are code generator. You must answer in concise, clear markdown code snippets. You can use code comments to explain. "
}

export async function POST(req: Request) {

    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("unauthorized", { status: 401 });
        };

        if (!openai) {
            return new NextResponse("OpenAI Key not configured", { status: 500 });
        };

        if (!messages) {
            return new NextResponse("messages are required", { status: 400 });
        };

        const freeTrial = await checkApiLimit();


        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 });
        };

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instMessage, ...messages]
        });

        await increaseApiLimit();

        return NextResponse.json(response.choices[0].message);


    } catch (error) {
        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    };
};