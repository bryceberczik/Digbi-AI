import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { signUp } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signUpData, setSignUpData] = useState<UserLogin>({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setGeneralError("");
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    if (!signUpData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!signUpData.username) {
      newErrors.username = "Username is required.";
    } else if (
      signUpData.username.length < 6 ||
      signUpData.username.length > 20
    ) {
      newErrors.username = "Username must be between 6 and 15 characters.";
    }

    if (!signUpData.password) {
      newErrors.password = "Password is required.";
    } else if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const data = await signUp(signUpData);
        Auth.login(data.token, true);
      } catch (err: any) {
        console.error("Failed to sign up", err);

        if (err.response?.data?.message) {
          if (err.response.data.message.includes("email")) {
            setGeneralError("Username or Email is already taken. Please try another.");
          } else if (err.response.data.message.includes("username")) {
            setGeneralError("Username or Email is already taken. Please try another.");
          } else {
            setGeneralError(err.response.data.message);
          }
        } else {
          setGeneralError("Username or Email is already taken. Please try another.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full space-y-12">
        <div>
          <h2 className="mt-6 text-center text-4xl text-gray-800">
            Create Your Account
          </h2>
          <p className="mt-4 text-center text-base text-gray-600">
            Already have an account?
            <Link to="/login" className="ml-2 underline">
              Sign in here
            </Link>
          </p>
        </div>
        <form
          className="space-y-8"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter email"
                value={signUpData.email || ""}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter username"
                value={signUpData.username || ""}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter password"
                value={signUpData.password || ""}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          {generalError && (
            <p className="text-red-500 text-sm mt-1">{generalError}</p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
