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

function watsonReply(userInput) {
  // This is where you edit Watson's "model". Swap out logic for real AI or different behavior.
  const lower = userInput.toLowerCase();
  let reply = "";

  // Example: Use systemPrompt if set
  let promptStyle = persona.systemPrompt ? `[${persona.systemPrompt}] ` : "";

  // Vibe-based logic
  const vibes = {
    friendly: [
      "That's interesting! 😊",
      "I'm here for you!",
      "Tell me more, I'm listening.",
      "What else is on your mind?"
    ],
    funny: [
      "Haha! Good one!",
      "If I had hands, I'd give you a high five!",
      "That's hilarious! 🤣",
      "Want to hear a joke? Why did the computer get cold? It left its Windows open!"
    ],
    serious: [
      "Let's think about this carefully.",
      "I take your question seriously.",
      "That's a topic worth discussing in detail.",
      "Can you elaborate?"
    ],
    curious: [
      "That's fascinating! Why do you think that?",
      "I'm curious to learn more.",
      "What makes you say that?",
      "How does that make you feel?"
    ]
  };

  if (lower.includes("hello") || lower.includes("hi")) reply = `Hello! I'm ${persona.name}.`;
  else if (lower.includes("name")) reply = `My name is ${persona.name}.`;
  else if (lower.includes("joke") && persona.vibe === "funny") reply = "Why did the web developer go broke? Because he used up all his cache!";
  else if (lower.includes("thank")) reply = "You're welcome! 😊";
  else reply = vibes[persona.vibe][Math.floor(Math.random() * vibes[persona.vibe].length)];

  return promptStyle + reply;
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
