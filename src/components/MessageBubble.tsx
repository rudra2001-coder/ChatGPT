import { Message } from '../types/Message';

interface Props {
  message: Message;
}

export const MessageBubble = ({ message }: Props) => {
  const bubbleStyle = message.isUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-white text-black';
  
  return (
    <div className={`max-w-[70%] rounded-lg p-3 mb-2 ${bubbleStyle}`}>
      <p className="break-words">{message.content}</p>
      <span className="text-xs opacity-70">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
};