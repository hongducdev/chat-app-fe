import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchConversation = async () => {
      setIsLoading(true);
      try {
        // Fetch conversation from the server
        const response = await fetch("/api/users");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setConversation(data);
      } catch (error) {
        console.error(
          "useGetConversation -> fetchConversation -> error",
          error
        );
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    fetchConversation();
  }, []);

  return { conversation, isLoading };
};

export default useGetConversation;
