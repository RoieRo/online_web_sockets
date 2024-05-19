const CodeBlock = require("../Models/CodeBlock");
const { updateCodeBlockById } = require("../Services/codeBlockService");

class CodeBlockRepository {
  async findAll() {
    try {
      const codeBlocks = await CodeBlock.findAll();
      // console.log("Found code blocks:", codeBlocks);
      return codeBlocks;
    } catch (err) {
      console.error("Error finding code blocks:", err);
      throw err;
    }
  }

  async findById(id) {
    return await CodeBlock.findByPk(id);
  }

  async updateCodeBlock(id, updeted) {
    try {
      const codeBlock = await CodeBlock.findByPk(id);
      if (!codeBlock) {
        throw new Error("Code block not found");
      }
      await codeBlock.update(updeted);
      return codeBlock;
    } catch (err) {
      console.error("Error finding code blocks:", err);
      throw err;
    }
  }
}
module.exports = new CodeBlockRepository();
