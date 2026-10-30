console.log("welcome gemini-api-chat-bot");

// Button action 
function btnSendMessageOnAction() {
    let userInputField = document.getElementById("txtUserInput");
    let userInput = userInputField.value.trim();

    // If input is empty
    if (!userInput) return;

    let chatWrapper = document.querySelector(".chat-wrapper");

    // 1. Append User Message 
    let userMessageHTML = `
        <div class="d-flex gap-3 mb-4 fade-in justify-content-end">
            <div class="msg-content flex-grow-1 text-end">
                <div class="fw-bold mb-1 title-text">You</div>
                <div class="p-3 rounded-4 d-inline-block text-start user-msg-bubble">
                    ${userInput}
                </div>
            </div>
            <div class="avatar-icon user-avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                <i class="fa-solid fa-user"></i>
            </div>
        </div>
    `;
    chatWrapper.insertAdjacentHTML('beforeend', userMessageHTML);
    
    
    userInputField.value = "";
    scrollToBottom();

    // JS Fetch Code 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-goog-api-key", CONFIG.API_KEY);

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": userInput
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

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let botReply = result.candidates[0].content.parts[0].text;
            let sanitizedHTML = DOMPurify.sanitize(marked.parse(botReply));

            // 2. Append Bot Response 
            let botMessageHTML = `
                <div class="d-flex gap-3 mb-4 fade-in">
                    <div class="avatar-icon bot-avatar text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="msg-content flex-grow-1">
                        <div class="fw-bold mb-1 title-text">Max-Chat-Bot</div>
                        <div class="text-content-custom">
                            ${sanitizedHTML}
                        </div>
                    </div>
                </div>
            `;
            chatWrapper.insertAdjacentHTML('beforeend', botMessageHTML);
            scrollToBottom();
        })
        .catch((error) => {
            console.error(error);
            let errorHTML = `
                <div class="d-flex gap-3 mb-4 fade-in">
                    <div class="avatar-icon bot-avatar text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="msg-content flex-grow-1 text-danger">
                        Failed to get response. Please try again!
                    </div>
                </div>
            `;
            chatWrapper.insertAdjacentHTML('beforeend', errorHTML);
            scrollToBottom();
        });
}

// New Chat Button Action 
function btnNewChatOnAction() {
    const chatWrapper = document.querySelector(".chat-wrapper");
    chatWrapper.innerHTML = `
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
    `;
    document.getElementById("txtUserInput").value = "";
}

// Dark Mode & Light Mode 
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

// Auto scroll chat box
function scrollToBottom() {
    const chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
}