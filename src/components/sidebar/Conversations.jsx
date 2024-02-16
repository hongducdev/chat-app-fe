import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = () => {
  const { conversation, isLoading } = useGetConversation();

  return (
    <div className="py-2 flex flex-col overflow-y-auto">
      {isLoading ? (
        <div className="loading loading-spinner mx-auto"></div>
      ) : (
        conversation.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))
      )}
    </div>
  );
};

export default Conversations;
