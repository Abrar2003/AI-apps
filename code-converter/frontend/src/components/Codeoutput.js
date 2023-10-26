import "../App.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Codeoutput = ({ code }) => {
  return (
    <div className="container">
      <h1>Code Output</h1>
      <div className="output">
        <SyntaxHighlighter language="python" style={vscDarkPlus}>
          {code ? code : "Please wait it can take upto 1 minute"}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Codeoutput;
