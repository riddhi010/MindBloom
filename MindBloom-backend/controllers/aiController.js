const axios = require("axios");

const getAIReply = async (text, lang = "en") => {
  try {
    const response = await axios.post('https://rijjjaaaa-mindbloom-ai-microservice.hf.space/analyze', {
      text,
      lang,
    });
    return response.data.reply;
  } catch (err) {
    console.error("AI microservice error:", err.message);
    return "I'm here for you. Please try again later 💛";
  }
};

module.exports = { getAIReply };
