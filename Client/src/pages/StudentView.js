import React, { useState, useEffect } from "react";

function StudentView({ codeBlock, handleCodeChange, socket }) {
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (codeBlock) {
      setTextValue(codeBlock.code);
    }
  }, [codeBlock]);

  const handleChange = (event) => {
    setTextValue(event.target.value);
    handleCodeChange(event.target.value);
  };

  return (
    <div>
      <h1> {codeBlock.title} </h1> <p> You are the student </p>{" "}
      <textarea
        value={textValue}
        onChange={handleChange}
        style={{ width: "100%", minHeight: "300px" }}>
        {" "}
      </textarea>{" "}
    </div>
  );
}

export default StudentView;
