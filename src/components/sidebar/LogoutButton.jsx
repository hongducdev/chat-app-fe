import { RiLogoutBoxLine } from "react-icons/ri";
import useLogOut from "../../hooks/useLogOut";

const LogoutButton = () => {
  const { logout, isLoading } = useLogOut();

  return (
    <>
      {isLoading ? (
        <div className="loading loading-spinner loading-xs"></div>
      ) : (
        <button
          className="mt-auto flex items-center justify-center gap-2 bg-ctp-red px-4 py-1 rounded-md text-ctp-base"
          onClick={logout}
        >
          <RiLogoutBoxLine className="h-6 w-6" />
          <span className="">Log out</span>
        </button>
      )}
    </>
  );
};

export default LogoutButton;
