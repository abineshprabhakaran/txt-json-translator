import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [useFile, setUseFile] = useState();
  const [finalJson, setFinalJson] = useState();
  const [filename, setFileName] = useState();
  useEffect(() => {
    let regex = /\/*\* ([0-9]|[1-9][0-9]{1,3}|10000) \*\//gi;
    let objectIdReplaceRegex = /[A-Za-z]+\(/gi;
    let commaReplaceregex = /"\),/gi;
    let result = useFile?.replace(regex, "\n");
    let commaAddRegex = /\}/gi;
    let bottomremoveRegex = /\},\]/gi;
    let wrapper = "[" + result + "]";
    let commareplace = wrapper.replace(commaAddRegex, "},");
    let objectIdreplace = commareplace.replace(objectIdReplaceRegex, "");
    let finalReplace = objectIdreplace.replace(commaReplaceregex, '",');
    let bottomLineRemove = finalReplace.replace(bottomremoveRegex, "}]");
    setFinalJson(bottomLineRemove);
  }, [useFile]);

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      console.log(e);
      const text = e.target.result;
      setUseFile(text);
    };
    reader.readAsText(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const downloadasJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: finalJson,
      fileName: filename + ".json",
      fileType: "text/json",
    });
  };

  return (
    <div>
      <div>
        <h2>Upload TXT File</h2>
        <br />
        <div>
          <input type="file" onChange={showFile} />
          <br /> <br />
          <button onClick={downloadasJson}>Download as JSON</button>
        </div>
      </div>
    </div>
  );
}

export default App;
