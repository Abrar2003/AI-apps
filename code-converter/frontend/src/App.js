import "./App.css";
import { useState } from "react";
import axios from "axios";
import Codeinput from "./components/Codeinput";
import Codeoutput from "./components/Codeoutput";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [converted, setConverted] = useState("Please input your code");
  const handleLanguage = (value) => {
    setLanguage(value);
  };
  const handleChange = (value) => {
    setCode(value);
  };
  const handleConvert = async () => {
    //Convert Code post request
    setConverted("");
    const res = await axios.post(
      "https://adorable-garters-eel.cyclic.app/code-converter",
      {
        code,
        language,
      }
    );
    console.log(res.data.convertedCode);
    setConverted(res.data.convertedCode);
  };
  const handleDebug = async () => {
    console.log(code);
    //Convert Code post request
    setConverted("");
    const res = await axios.post(
      "https://adorable-garters-eel.cyclic.app/code-debugger",
      {
        code,
      }
    );
    console.log(res.data.convertedCode);
    setConverted(res.data.debuggingSummary);
  };
  const handleQuality = async () => {
    console.log(code);
    //Convert Code post request
    setConverted("");
    const res = await axios.post(
      "https://adorable-garters-eel.cyclic.app/code-quality-check",
      {
        code,
      }
    );
    console.log(res.data.convertedCode);
    setConverted(res.data.qualitySummary);
  };
  return (
    <div className="main">
      <h1>Code Converter / Debugger / Quality Checker</h1>
      <div className="App">
        <Codeinput
          handleChange={handleChange}
          handleConvert={handleConvert}
          handleDebug={handleDebug}
          handleQuality={handleQuality}
          handleLanguage={handleLanguage}
        />
        <Codeoutput code={converted} language={language? language : "javascript"} />
      </div>
    </div>
  );
}

export default App;
