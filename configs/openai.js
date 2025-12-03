import OpenAI from "openai";

export const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY,
  base_url: process.env.OPENAI_BASE_URL,
});
