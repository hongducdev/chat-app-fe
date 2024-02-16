import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, isLoading } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {isLoading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}
      {!isLoading && messages.length === 0 && (
        <p className="text-center">
          No messages yet. Start the conversation by sending a message.
        </p>
      )}
      {!isLoading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div className="" key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
