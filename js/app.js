console.log("welcome gemini-api-chat-bot");

// 1. Original Button Action Function (Unchanged)
function btnSendMessageOnAction(){

// JS Fetch Code 
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-goog-api-key", CONFIG.API_KEY);

let userInput = document.getElementById("txtUserInput").value;

const raw = JSON.stringify({
  "contents": [
    {
      "parts": [
        {
          "text":  userInput
        }
      ]
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    document.getElementById("lblRespond").innerHTML = DOMPurify.sanitize(marked.parse(result.candidates[0].content.parts[0].text));
  })
  .catch((error) => console.error(error));
}

// 2. New Chat Button Action (Clears chat box and starts a new session)
function btnNewChatOnAction() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = `
        <div class="chat-wrapper mx-auto">
            <div class="d-flex gap-3 mb-4 fade-in">
                <div class="avatar-icon bot-avatar text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="msg-content flex-grow-1">
                    <div class="fw-bold mb-1 title-text">Max-Chat-Bot</div>
                    <div class="text-secondary-custom">
                        Hello! 👋 I'm <strong>Max-Chat-Bot</strong>. New chat started! How can I help you today?
                    </div>
                </div>
            </div>
            <div class="d-flex gap-3 mb-4 fade-in">
                <div class="avatar-icon bot-avatar text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="msg-content flex-grow-1">
                    <div class="fw-bold mb-1 title-text">Max-Chat-Bot</div>
                    <div id="lblRespond" class="text-content-custom"></div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("txtUserInput").value = "";
}

// 3. Dark Mode & Light Mode Toggle Function
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    const isDarkMode = body.classList.contains("dark-mode");
    const iconClass = isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon";

    document.getElementById("themeIcon").className = iconClass;
    const mobileIcon = document.getElementById("mobileThemeIcon");
    if (mobileIcon) {
        mobileIcon.className = iconClass;
    }
}