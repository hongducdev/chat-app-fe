import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <section className="flex flex-col p-4">
      <SearchInput />
      <div className="divider"></div>
      <Conversations />
      <LogoutButton />
    </section>
  );
};

export default Sidebar;
