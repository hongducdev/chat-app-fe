import PropTypes from "prop-types";
import useConversation from "../../store/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <section
      className="group"
      onClick={() => setSelectedConversation(conversation)}
    >
      <div
        className={`flex items-center gap-4 group-hover:bg-ctp-pink rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-ctp-pink"
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt={conversation.username} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <span
            className={`font-semibold text-xl group-hover:text-ctp-mantle ${
              isSelected && "text-ctp-mantle"
            }`}
          >
            {conversation.fullName}
          </span>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </section>
  );
};

export default Conversation;

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};
