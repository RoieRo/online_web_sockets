const express = require("express");
const router = express.Router();
const codeBlockService = require("../Services/codeBlockService");
const io = require("../index").io;

// Route for getting all code blocks
router.get("/codeblocks", async (req, res) => {
  try {
    console.log("inside get");
    const allCodeBlocks = await codeBlockService.getAllCodeBlocks();
    return res.json(allCodeBlocks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Route for getting a specific code block by id
router.get("/codeblocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const codeBlock = await codeBlockService.getCodeBlockById(id);
    return res.json(codeBlock);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "Code block not found" });
  }
});

// Route for updating an existing code block by title
router.put("/codeblocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const updatedCodeBlock = await codeBlockService.updateCodeBlockById(
      id,
      code
    );

    // Emit an event to all clients that the code block was updated
    // io.emit("codeBlockUpdated", updatedCodeBlock);

    res.json(updatedCodeBlock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
