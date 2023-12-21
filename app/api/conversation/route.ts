import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        return NextResponse.json(response.choices[0].message);


    } catch (error) {
        console.log("conversation error", error);
        return new NextResponse("internal error", { status: 500 });
    };
};