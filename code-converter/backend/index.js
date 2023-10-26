const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const openai = new OpenAI({
  apiKey: process.env.OPNEAI_API_KEY
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("hello"));

app.post("/code-converter", async (req, res) => {
  try {
    const code = req.body.code;
    const preferredLanguage = req.body.language;

    // Use OpenAI GPT-3.5-turbo to convert the code
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a code conversion assistant." },
        {
          role: "user",
          content: `Convert the following code to ${preferredLanguage}: ${code}. don't tell anything other than code`,
        },
      ],
      temperature: 1,
      n: 1,
    });

    // Extract and send the converted code
    const convertedCode = response.choices[0].message.content;
    res.json({ convertedCode });
  } catch (error) {
    console.log(error);
  }
});

app.post("/code-debugger", async (req, res) => {
  try {
    const code = req.body.code;

    // Use OpenAI GPT-3.5-turbo for debugging
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a code debugging assistant." },
        {
          role: "user",
          content: `Debug the following code: ${code} and give a very breif summary about bug and complete correct code`,
        },
      ],
      temperature: 1,
      n: 1,
    });

    // Extract and send the debugging summary
    const debuggingSummary = response.choices[0].message.content;
    res.json({ debuggingSummary });
  } catch (error) {
    console.log(error);
  }
});

app.post("/code-quality-check", async (req, res) => {
  const code = req.body.code;

  // Define the code quality assessment prompt
  const qualityCheckPrompt = `
      You are a highly experienced code quality assessor with a deep understanding of industry best practices. Your task is to assess the quality of the provided code snippet. Your analysis should cover various aspects, including but not limited to code structure, readability, maintainability, performance, and adherence to coding standards.
  
      Please thoroughly review the following code and provide a detailed quality assessment along with a score out of 5, where 5 represents exceptionally high quality and 1 represents extremely poor quality. Additionally, please offer specific recommendations for improvement wherever possible.
  
      ---
  
      ${code}
  
      ---

Finally, assign a quality score out of 5 and suggest improvements or changes as necessary to enhance the code's quality.
`;

  // Use OpenAI GPT-3.5-turbo for code quality assessment
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a code quality checker." },
      { role: "user", content: qualityCheckPrompt },
    ],
  });

  // Extract and send the quality summary and score
  const qualitySummary = response.choices[0].message.content;
  
  res.json({ qualitySummary });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
