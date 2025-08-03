const axios = require("axios");

const getAIReply = async (text, lang = "en") => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/analyze', {
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
