import { useState, useEffect } from "react";
import { setupAuthListener, auth } from "./auth"; // Adjust the path accordingly
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import Logo from "../../components/ui/logo";


function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Sign in with google
  const GoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          navigate("/signup");
        }
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  }, [auth, navigate]);

  const SignUp = (e) => {
    e.preventDefault();

    // Password check
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Clear error message
    setErrorMessage("");
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          return updateProfile(userCredential.user, { displayName: name }); // Use Firebase's function
        }
        throw new Error("User registration failed");
      })
      .then(() => {
        navigate("/setup");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("Email is already in use by another account.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Email address is not valid.");
            break;
          case "auth/operation-not-allowed":
            setErrorMessage("Email/password accounts are not enabled.");
            break;
          case "auth/weak-password":
            setErrorMessage("Password is too weak.");
            break;
          default:
            setErrorMessage(
              "An unknown error occurred. Please try again later."
            );
        }
        console.error("Error during registration:", error);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = setupAuthListener((user) => {
  //     if (user) {
  //       // User is signed in
  //       const uid = user.uid;
  //       // Do something with the authenticated user
  //     } else {
  //       // User is signed out
  //       // Redirect or show login form
  //     }
  //   });

  //   return () => {
  //     // Cleanup when the component unmounts
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="max-w-sm mx-auto w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <div className="w-14">
            <Logo />
            {/* <img className='w-1/3' src='/assets/blob1.png' alt='Image Description'/> */}
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
              Sign Up with Google
            </span>
          </div>
        </button>
        <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center text-inter font-semibold">or</p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={SignUp}>
           <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-2 block w-full rounded-md border-2 py-1.5 bg-white text-black shadow-sm placeholder:text-gray-400 focus:border-indigo-600"
                />
              </div>
            </div>

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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black"
                  >
                  Confirm password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Create Account
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

export default Registration;
