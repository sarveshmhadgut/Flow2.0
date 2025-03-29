import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { todos } = await request.json();

    // Call OpenAI's API for chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      messages: [
        {
          role: "system",
          content: `When responding, welcome the user always as Mr.Sarvesh and say "Welcome to the Flow Todo App!" Limit the response to 200 characters.`
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, In Progress, and Done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
            todos
          )}`
        }
      ]
    });

    // Extract the message from the API response
    const message = response?.choices?.[0]?.message?.content;

    // Validate the response and return a JSON object
    if (message) {
      return NextResponse.json({ message });
    } else {
      return NextResponse.json({ error: "No response from OpenAI." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error:", error);

    // Handle errors gracefully
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
  }
}