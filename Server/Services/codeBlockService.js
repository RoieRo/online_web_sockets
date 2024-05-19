const codeBlockRepository = require("../Repositories/codeBlockRepository");

class CodeBlockService {
  async getCodeBlockById(id) {
    const codeBlock = await codeBlockRepository.findById(id);
    if (!codeBlock) {
      throw new Error("Code block not found");
    }
    return codeBlock;
  }

  async getAllCodeBlocks() {
    return await codeBlockRepository.findAll();
  }

  async updateCodeBlockById(id, code) {
    const codeBlock = await codeBlockRepository.findById(id);
    if (!codeBlock) {
      throw new Error("Code block not found");
    }
    // Update the code block using the repository
    return await codeBlockRepository.updateCodeBlock(codeBlock.id, { code });
  }

  // Add more service methods as needed
}

module.exports = new CodeBlockService();
