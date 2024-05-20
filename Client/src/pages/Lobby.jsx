import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Lobby() {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [selectedCodeBlock, setSelectedCodeBlock] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/codeblocks")
      .then((res) => {
        console.log(res);
        setCodeBlocks(res.data); // Assuming the array is in res.data
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCodeBlockClick = (codeBlock) => {
    setSelectedCodeBlock(codeBlock);
  };

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((codeBlock) => (
          <li key={codeBlock.id}>
            <Link
              to={`/codeblock/${codeBlock.id}`}
              onClick={() => handleCodeBlockClick(codeBlock)}>
              {codeBlock.title}
            </Link>
          </li>
        ))}
      </ul>
      {selectedCodeBlock && (
        <div>
          <h2>{selectedCodeBlock.title}</h2>
          <pre>{selectedCodeBlock.code}</pre>
        </div>
      )}
    </div>
  );
}

export default Lobby;
