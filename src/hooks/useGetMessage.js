import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";

const useGetMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/messages/${selectedConversation._id}`
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedConversation._id) fetchMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, isLoading };
};

export default useGetMessage;
