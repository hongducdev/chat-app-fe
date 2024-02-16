import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage({ message });
    setMessage("");
  };

  return (
    <form className="px-4 my-3 flex items-center gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input input-bordered rounded-full flex-1 bg-ctp-mantle"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="h-12 w-12 rounded-full bg-gradient-to-r from-ctp-pink to-ctp-mauve text-ctp-base flex items-center justify-center">
        {isLoading ? (
          <div className="loading loading-spinner loading-sm"></div>
        ) : (
          <RiSendPlaneFill className="w-6 h-6" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
