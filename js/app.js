console.log("welcome gemini-api-chat-bot");

//button action
function btnSendMessageOnAction(){

//js fetch code 
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

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    document.getElementById("lblRespond").innerHTML = DOMPurify.sanitize(marked.parse(result.candidates[0].content.parts[0].text));
  })
  .catch((error) => console.error(error));
}