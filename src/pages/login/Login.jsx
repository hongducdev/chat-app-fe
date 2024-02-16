import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[25vw] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gradient-to-br from-ctp-mantle to-ctp-crust outline outline-ctp-pink">
        <h2 className="text-3xl font-semibold text-center text-ctp-text">
          Login{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-pink to-ctp-mauve">
            Chat App
          </span>
        </h2>

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn bg-gradient-to-r from-ctp-pink to-ctp-mauve w-full mt-5 text-ctp-base text-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading loading-spinner loading-xs"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-5 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-ctp-pink">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
