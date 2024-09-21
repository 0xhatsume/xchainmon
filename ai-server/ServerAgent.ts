import OpenAI, { Configuration, OpenAIApi } from "openai";
import extract from "extract-json-from-string";

import env from "./env.json";

interface ParsedData {
  position: { x: number; y: number };
  surroundings: any;
  sleepiness: number;
  [key: string]: any;
}

interface Action {
  type: string;
  direction?: "up" | "down" | "left" | "right";
  [key: string]: any;
}

interface ResponseObject {
  action: Action;
}

// const configuration = new Configuration({
//   apiKey: env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  baseURL: 'https://api.red-pill.ai/v1',
  apiKey: env.REDPILL_OPENAI_API_KEY,
})

class ServerAgent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async processMessage(parsedData: ParsedData): Promise<ResponseObject | null> {
    try {
      const prompt = `# Introduction

      You are acting as an agent living in a simulated 2 dimensional universe. Your goal is to exist as best as you see fit and meet your needs.
      
      # Capabilities
      
      You have a limited set of capabilities. They are listed below:
      
      * Move (up, down, left, right)
      * Wait
      * Navigate (to an x,y coordinate)
      * Sleep

      # Responses
      
      You must supply your responses in the form of valid JSON objects.  Your responses will specify which of the above actions you intend to take.  The following is an example of a valid response:
      
      {
        action: {
          type: "move",
          direction: "up" | "down" | "left" | "right"
        }
      }
      
      # Perceptions
      
      You will have access to data to help you make your decisions on what to do next.
      
      For now, this is the information you have access to:

      Position: 
      ${JSON.stringify(parsedData.position)}

      Surroundings:
      ${JSON.stringify(parsedData.surroundings)}

      Sleepiness:
      ${parsedData.sleepiness} out of 10

      The JSON response indicating the next move is.
      `

      const completion = await this.callOpenAI(prompt, 0);
      return completion;

    } catch (error) {
      console.error("Error processing GPT-3 response:", error);
      return null;
    }
  }

  async callOpenAI(prompt: string, attempt: number): Promise<ResponseObject | null> {
    if (attempt > 3) {
      return null;
    }
  
    if (attempt > 0) {
      prompt = "YOU MUST ONLY RESPOND WITH VALID JSON OBJECTS\N" + prompt;
    }
  
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: prompt }],
    // });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
  
    console.log('OpenAI response', response.data.choices[0].message.content)
  
    const responseObject = this.cleanAndProcess(response.data.choices[0].message.content);
    if (responseObject) {
      return responseObject;
    }
  
    return await this.callOpenAI(prompt, attempt + 1);
  }
  
  cleanAndProcess(text: string): ResponseObject | null {
    const extractedJson = extract(text)[0];
  
    if (!extractedJson) {
      return null;
    }

    return extractedJson as ResponseObject;
  }
}

export default ServerAgent;