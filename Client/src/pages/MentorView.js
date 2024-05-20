// MentorView.js
import React from "react";

function MentorView({ codeBlock }) {
  return (
    <div>
      <h1> {codeBlock.title} </h1> <p> You are the mentor </p>{" "}
      <pre readOnly> {codeBlock.code} </pre>{" "}
    </div>
  );
}

export default MentorView;
