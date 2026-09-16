import { streamText, convertToModelMessages } from 'ai'

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const modelMessages = await convertToModelMessages(messages);

        const response = await streamText({
            model: "openai/gpt-5-mini",
            messages: modelMessages,
        });

        return response.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error in POST /api/chat:", error.message);
    }
}