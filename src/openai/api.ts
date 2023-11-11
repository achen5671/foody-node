import OpenAI from "openai";
import { OpenAIPrompt } from "../api/helpers/constants";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

async function initAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Foody",
    instructions:
      "You are a nutritionist and a chef assistant. You will provide meals and recipes, nutrition of the meal such as calories and proteins, the step by step meal preparation and determine if the meal fits the users diet",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-3.5-turbo-1106",
  });

  return assistant;
}

// todo: uncomment
// const assistant = initAssistant();

class OpenAIClient {
  getFood = async (ingredients: string[]) => {
    // intialize assistent to when server starts?
    // const assistant = await initAssistant();
    //
    try {
      // todo:
      // add calorie limit and diet plan
      // add feature where meal is strictly the ingrediemtns provided. SOme times I only have these ingredients
      const messageContent = `Generate 2 recipe using the following ingredients: ${ingredients.join(
        ", "
      )}. Return the response as JSON Object that can be parsed with a structure like this: {recipes : [{ recipe_name: string, ingredients: { ingredient: measurements } , preparations: [], calories: number, nutritions: { protein: number, fiber: number, fat: number } } ]}
      `;

      // todo: if this is scaled to multiple users, save this thread in a database by multiple users?
      // const thread = await openai.beta.threads.create();
      // Hard code thread for now so it doesnt create a new one on ever load
      const thread = { id: "thread_oSQbMcHwBDd6Uh3jwVJjrIHP" };

      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: messageContent,
      });

      const run = await openai.beta.threads.runs.create(thread.id, {
        // assistant_id: assistant.id,
        // Hardcode existing assistent
        assistant_id: "asst_gaRDfFXpewZIzZ4uBQIxOeUX",
      });

      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );

      // Make more robust:
      //  * kill if this never succeeds
      //  * check other status
      // See: https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
      // todo: move to own function
      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      const messages = await openai.beta.threads.messages.list(thread.id);

      const lastMessage = messages.data
        .filter(
          (message) => message.run_id === run.id && message.role === "assistant"
        )
        .pop();

      if (lastMessage) {
        const content = lastMessage.content[0] as MessageContentText;
        const response = content.text.value;

        //this is kinda terrible. Im assuming this is always true
        const startIndex = response.indexOf("{");
        const endIndex = response.lastIndexOf("}") + 1;

        // Extract the JSON object
        const jsonSubstring = response.substring(startIndex, endIndex);

        // Parse the extracted JSON
        const parsedContent = JSON.parse(jsonSubstring);

        return parsedContent;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default new OpenAIClient();
