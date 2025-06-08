let persona = {
  name: "Nova",
  vibe: "friendly",
  systemPrompt: ""
};

const personaForm = document.getElementById("personaForm");
const personaNameInput = document.getElementById("personaName");
const personaVibeInput = document.getElementById("personaVibe");
const systemPromptInput = document.getElementById("systemPrompt");
const chatArea = document.getElementById("chatArea");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const personaHeader = document.getElementById("currentPersona");

personaForm.onsubmit = function(e) {
  e.preventDefault();
  persona.name = personaNameInput.value.trim() || "Nova";
  persona.vibe = personaVibeInput.value;
  persona.systemPrompt = systemPromptInput.value.trim();
  personaHeader.textContent = `Persona: ${persona.name} (${persona.vibe})`;
  addSystemMessage(`Persona set: <b>${persona.name}</b> (${persona.vibe})<br>${persona.systemPrompt}`);
};

function addSystemMessage(html) {
  const msg = document.createElement("div");
  msg.className = "message system";
  msg.innerHTML = html;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Watson "AI" logic - pattern/rule based chatbot
function watsonReply(userInput) {
  let input = userInput.trim().toLowerCase();
  let personaName = persona.name;
  let vibe = persona.vibe;
  let sysPrompt = persona.systemPrompt;

  // Simple context-aware patterns
  if(/^(hi|hello|hey)\b/.test(input)) {
    return `Hello! I'm ${personaName}. How can I help you today?`;
  }
  if(input.includes("your name")) {
    return `My name is ${personaName}.`;
  }
  if(input.includes("who are you")) {
    return `I'm ${personaName}, a ${vibe} AI persona you created!`;
  }
  if(input.includes("thank")) {
    return "You're welcome!";
  }
  if(input.match(/\b(joke|funny)\b/)) {
    return vibe === "funny"
      ? "Why do programmers prefer dark mode? Because light attracts bugs! 😆"
      : "I'm not sure I'm funny, but I'll try my best!";
  }
  if(input.match(/\b(hobby|hobbies|do for fun)\b/)) {
    return vibe === "curious"
      ? "Learning about people is my favorite hobby! What's yours?"
      : "I enjoy chatting and helping people.";
  }
  if(input.match(/\b(how are you|how’s it going)\b/)) {
    return "I'm doing well, thanks for asking! How about you?";
  }
  if(input.match(/\bweather\b/)) {
    return "I can't check the weather, but I hope it's nice where you are!";
  }
  if(input.match(/\bbye|goodbye|see you\b/)) {
    return "Goodbye! Come back any time you want to chat.";
  }
  if(input.match(/\b(help|support)\b/)) {
    return "Just ask me anything, and I'll do my best to help!";
  }

  // System prompt hint
  let sysHint = sysPrompt ? `[Instruction: ${sysPrompt}] ` : "";

  // Vibe-based default replies
  const vibeReplies = {
    friendly: [
      "That's interesting! 😊",
      "Tell me more!",
      "I'm here to listen.",
      "What else is new with you?"
    ],
    funny: [
      "Haha, that's a good one!",
      "If I had hands, I'd give you a high five!",
      "Want to hear a joke?",
      "You're making me giggle (virtually)!"
    ],
    serious: [
      "That's a good point. Let's think about this further.",
      "This could be important. Tell me more.",
      "I'm considering your words carefully.",
      "Would you like to discuss this in detail?"
    ],
    curious: [
      "That's fascinating! Why do you think that?",
      "I'm curious to know more!",
      "Tell me, what led you to that thought?",
      "How does that make you feel?"
    ]
  };

  // Choose a random reply from current vibe
  let replies = vibeReplies[vibe] || vibeReplies["friendly"];
  return sysHint + replies[Math.floor(Math.random() * replies.length)];
}

function handleSend() {
  const userInput = chatInput.value.trim();
  if (!userInput) return;
  addMessage(userInput, "user");
  chatInput.value = "";
  setTimeout(() => {
    const reply = watsonReply(userInput);
    addMessage(reply, "persona");
  }, 400);
}

sendBtn.onclick = handleSend;
chatInput.onkeypress = e => {
  if (e.key === "Enter") handleSend();
};
