import OpenAI from "openai";
import { OpenAIPrompt } from "../api/helpers/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "", // This is also the default, can be omitted
});

class OpenAIClient {
  getFood = async (ingredients: string[]) => {
    try {
      const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `${OpenAIPrompt.SUGGEST_MEAL} ${ingredients.join(", ")}.`,
        temperature: 0.6,
      });

      return completion.choices;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new OpenAIClient();
