import { useState, useEffect } from "react";
import { setupAuthListener, auth } from "./auth"; 
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import Logo from "../../components/ui/logo";


function LogInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const SignIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          setErrorMessage(
            "Invalid login credentials. Please check your email and password."
          );
        } else {
          console.log(error);
        }
      });
  };

  const GoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          navigate("/dashboard");
        }
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  }, [auth, navigate]);

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="max-w-sm mx-auto w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <div className="w-14">
            <Logo />
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Learn more with Empa
          </h2>
        </div>
        <button className="w-full group h-12 mt-5 mb-2 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-lightPurple">
          <div className="relative flex items-center space-x-4 justify-center">
            <img
              src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
              className="absolute left-0 w-5"
              alt="google logo"
            />
            <span className="block w-max font-semibold tracking-wide text-black text-sm transition duration-300 group-hover:text-lightPurple sm:text-base">
              Continue with Google
            </span>
          </div>
        </button>
        <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center text-inter font-semibold">or</p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={SignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="pl-2 block w-full rounded-md border-2 py-1.5 bg-white text-black shadow-sm placeholder:text-gray-400 focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="pl-2 block w-full rounded-md border-2 py-1.5 bg-white text-black shadow-sm placeholder:text-gray-400 focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Sign in
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogInComponent;