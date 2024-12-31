import { useState } from 'react';
import { Message } from './types/Message';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { sendMessage as sendToOpenAI } from './services/openai';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Get AI response
    const response = await sendToOpenAI(content);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">ChatGPT App</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </main>

      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;