// CodeBlock.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSocket from "./useSocket";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import MentorView from "./MentorView";
import StudentView from "./StudentView";

function CodeBlock() {
  const [codeBlock, setCodeBlock] = useState(null);
  const [isMentor, setIsMentor] = useState(false);
  //const [mentorCodeBlockId, setMentorCodeBlockId] = useState(null);
  const { id } = useParams();
  const socket = useSocket();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/codeblocks/${id}`)
      .then((res) => {
        setCodeBlock(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      setIsMentor(false);
    };
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connect to socket");
        socket.emit("join", id);
        //socket.join(id);
      });
      socket.on("mentorStatus", (isMentor) => {
        setIsMentor(isMentor);
      });
      socket.on("codeChange", (data) => {
        console.log("the data is : ", data);
        setCodeBlock(data);
      });
    }

    return () => {
      if (socket) {
        socket.off("mentorStatus");
        socket.off("codeChange");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (codeBlock) {
      hljs.highlightAll();
    }
  }, [codeBlock]);

  const handleCodeChange = async (newCode) => {
    try {
      if (!isMentor && socket) {
        socket.emit("codeChange", {
          id,
          title: codeBlock.title,
          code: newCode,
        });
        console.log("the id : ", id);
        await axios.put(`http://localhost:3001/api/codeblocks/${id}`, {
          code: newCode,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!codeBlock) {
    return <div> Loading... </div>;
  }

  return (
    <div>
      {" "}
      {isMentor ? (
        <MentorView codeBlock={codeBlock} />
      ) : (
        <StudentView
          codeBlock={codeBlock}
          handleCodeChange={handleCodeChange}
          socket={socket}
        />
      )}{" "}
    </div>
  );
}

export default CodeBlock;
