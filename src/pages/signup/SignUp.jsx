import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const { signup, isLoading } = useSignUp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[25vw] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gradient-to-br from-ctp-mantle to-ctp-crust outline outline-ctp-pink">
        <h2 className="text-3xl font-semibold text-center text-ctp-text">
          SignUp{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ctp-pink to-ctp-mauve">
            Chat App
          </span>
        </h2>

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="fullName" className="label">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Enter your password again"
              className="input input-bordered w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 flex items-center gap-5">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="male"
                name="gender"
                className="radio"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="female"
                name="gender"
                className="radio"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <button
            className="btn bg-gradient-to-r from-ctp-pink to-ctp-mauve w-full mt-5 text-ctp-base text-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading loading-spinner loading-xs"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-5 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-ctp-pink">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
