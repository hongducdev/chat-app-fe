import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};

export default useSendMessage;
