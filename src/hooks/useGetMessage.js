import { useEffect, useState } from 'react';
import useConversation from '../store/useConversation';

const useGetMessage = () => {
   const [isLoading, setIsLoading] = useState(false);
   const { messages, setMessages, selectedConversation } = useConversation();

   useEffect(() => {
      const fetchMessages = async () => {
         setIsLoading(true);
         try {
            const response = await fetch(
               `https://chatapp-be.datdev.id.vn/api/messages/${selectedConversation._id}`,
               {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  credentials: 'include',
               }
            );

            const data = await response.json();
            console.log('🚀 ~ fetchMessages ~ response:', response);

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
