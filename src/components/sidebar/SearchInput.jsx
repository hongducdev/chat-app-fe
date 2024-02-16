import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import useConversation from "../../store/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Please enter at least 3 characters");
      return;
    }

    const conversationFind = conversation.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationFind) {
      setSelectedConversation(conversationFind);
      setSearch("");
    } else {
      toast.error("No user found with that name");
    }
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for a user"
        className="input input-bordered rounded-full bg-ctp-mantle"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="h-12 w-12 rounded-full bg-gradient-to-r from-ctp-pink to-ctp-mauve text-ctp-base flex items-center justify-center">
        <RiSearch2Line className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SearchInput;
