import "../App.css";

const Codeinput = ({handleChange, handleConvert, handleDebug, handleQuality, handleLanguage}) => {
  return (
    <div className="container">
      <h1>Code Input</h1>
      <textarea className="input" onChange={(e) => handleChange(e.target.value)} placeholder="Please enter your code here" />
      <div className="btn-container">
        <button onClick={handleConvert}>Convert Code</button>
        <select onChange={(e) => handleLanguage(e.target.value)}>
            <option value="">Select A Language</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="JavaScript">JavaScript</option>
        </select>
        <button onClick={handleDebug}>Debug</button>
        <button onClick={handleQuality}>Quality Check</button>
      </div>
    </div>
  );
};

export default Codeinput;
