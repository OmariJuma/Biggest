(function() {
    // Create a container element for the widget
    var container = document.getElementById('chat-widget-container');
    container.innerHTML = `
    <style>
      /* Widget Button */
      #chat-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007bff;
        color: black;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 9999;
      }
      /* Chat Window */
      #chat-window {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 500px;
        max-height: 500px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: none;
        flex-direction: column;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 9999;
      }
      #chat-header {
        background: #007bff;
        color: white;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      #chat-messages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        font-size: 16px;
        color: black;
      }
      #chat-input-area {
        display: flex;
        border-top: 1px solid #ccc;
      }
      #chat-input {
        flex: 1;
        border: none;
        padding: 10px;
        color: black;
      }
        #chat-input:active,
        #chat-input:focus {
        outline: none;
        border: 1px solid #007bff;
        border-radius: 5px;
        color: black;
      }
      #chat-send {
        border: none;
        background: #007bff;
        color: black;
        padding: 0 15px;
        cursor: pointer;
      }
    </style>

    <button id="chat-button">💬</button>
    <div id="chat-window">
      <div id="chat-header">Chat with us</div>
      <div id="chat-messages"></div>
      <div id="chat-input-area">
        <input type="text" id="chat-input" placeholder="Type a message..." />
        <button id="chat-send">Send</button>
      </div>
    </div>
  `;

    // Get references to elements
    var chatButton = document.getElementById('chat-button');
    var chatWindow = document.getElementById('chat-window');
    var chatMessages = document.getElementById('chat-messages');
    var chatInput = document.getElementById('chat-input');
    var chatSend = document.getElementById('chat-send');

    // Toggle chat window visibility when clicking the button
    chatButton.addEventListener('click', function() {
        chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'flex' : 'none';
    });

    // Append a message to the chat window
    function appendMessage(sender, message) {
        var msgElem = document.createElement('div');
        msgElem.style.marginBottom = '10px';

        // Check if the message is a product response
        if (typeof message === 'object' && message.data) {
            let productsHtml = '<div style="display: flex; flex-direction: column; gap: 15px;">';
            message.data.forEach(product => {
                productsHtml += `
                    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; background: #f9f9f9;">
                        <div style="display: flex; gap: 15px;">
                            <img src="${product.image}" alt="${product.title}" style="width: 100px; height: 100px; object-fit: contain; border-radius: 4px;">
                            <div style="flex: 1;">
                                <h4 style="margin: 0 0 5px 0; color: #333;">${product.title}</h4>
                                <p style="margin: 0 0 5px 0; color: #666; font-size: 0.9em;">${product.description}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: #007bff; font-weight: bold;">$${product.price}</span>
                                    <span style="color: #666; font-size: 0.9em;">Rating: ${product.rating.rate} (${product.rating.count} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            productsHtml += '</div>';
            msgElem.innerHTML = '<strong>' + sender + ':</strong> ' + productsHtml;
        } else {
            // Convert URLs to clickable links for regular messages
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const processedMessage = message.replace(urlRegex, function(url) {
                return `<a href="${url}" target="_blank" style="color: #007bff; text-decoration: underline;">${url}</a>`;
            });
            msgElem.innerHTML = '<strong>' + sender + ':</strong> ' + processedMessage;
        }

        chatMessages.appendChild(msgElem);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle sending a message
    function sendMessage() {
        var text = chatInput.value.trim();
        if (!text) return;
        appendMessage('You', text);
        chatInput.value = '';

        fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    history: []
                })
            })
            .then(function(response) {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(function(data) {
                console.log('Response data:', data);
                if (data.response && data.response.data) {
                    appendMessage('Bot', data.response);
                } else if (data.response && data.response.response) {
                    appendMessage('Bot', data.response.response);
                } else {
                    appendMessage('Bot', 'Oops, something went wrong.');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                appendMessage('Bot', 'Error contacting chat service.');
            });
    }

    // Send message on button click
    chatSend.addEventListener('click', sendMessage);

    // Also send message when the user presses Enter in the input field
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
})();