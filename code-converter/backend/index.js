const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
      Key aspects to consider during your assessment:

      1. **Code Structure**: Evaluate the overall organization and structure of the code. Is it logically organized? Are there clear and meaningful variable/function names? Is there an appropriate use of comments and documentation?
      
      2. **Readability**: Assess the code's readability. Is it easy to understand, even for someone not familiar with the project? Is there consistent indentation and formatting?
      
      3. **Maintainability**: Consider whether the code is easy to maintain and modify. Are there any code smells or anti-patterns present? Is the code DRY (Don't Repeat Yourself) and modular?
      
      4. **Performance**: Analyze the code's performance. Does it make efficient use of resources? Are there any potential bottlenecks or areas for optimization?
      
      5. **Error Handling**: Evaluate the code's robustness in error handling. Does it gracefully handle exceptions and edge cases?
      
      6. **Security**: Assess the code for potential security vulnerabilities. Are there any common security issues, such as SQL injection or XSS vulnerabilities?
      
      7. **Scalability**: Consider the code's scalability. Is it designed to accommodate growth in data or users?
      
      8. **Testing**: Is the code adequately tested? Are there unit tests, integration tests, or other test suites in place to ensure functionality and reliability?
      
      9. **Documentation**: Look for comprehensive documentation. Are there clear explanations of functions, classes, and APIs? Is there documentation on how to use the code?
      
      10. **Best Practices**: Check if the code adheres to industry best practices and coding standards for the specific programming language.
      
      Please provide a thorough analysis of these aspects and any other relevant factors in your assessment. The more detailed and specific your feedback, the more valuable it will be for improving the code's quality.
      
      Finally, assign a quality score out of 5 and suggest improvements or changes as necessary to enhance the code's quality.

      provide a very brief summary of all the checks and show the score in a new line
`;

  // Use OpenAI GPT-3.5-turbo for code quality assessment
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a code quality checker." },
      { role: "user", content: qualityCheckPrompt },
    ],
    max_tokens: 500,
    temperature: 1,
    n: 1,
  });

  // Extract and send the quality summary and score
  const qualitySummary = response.choices[0].message.content;

  res.json({ qualitySummary });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
