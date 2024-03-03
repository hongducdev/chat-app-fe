import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchConversation = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://chatapp-be.datdev.id.vn/api/users",
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        // const chatUserStr = localStorage.getItem("chat-user");
        // const chatUser = JSON.parse(chatUserStr);

        // const userId = chatUser._id;

        // if (response.status === 401) {
        //   const res = await fetch(
        //     `https://chatapp-be.datdev.id.vn/test/api/users?_id=${userId}`,
        //     {
        //       method: "GET",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       credentials: "include",
        //     }
        //   );

        //   const data = await res.json();
        //   console.log("🚀 ~ fetchConversation ~ data:", data);
        //   return setConversation(data);
        // }
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
