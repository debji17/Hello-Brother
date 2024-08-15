import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

function login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser]);
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const {
        user: { displayName: name, email, photoURL: profileImage },
      } = result;

      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            },
          });
          router.push("/onboarding");
        } else {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            status,
          } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            },
          });
          toast(`Welcome back`, {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
              background: '#fff4e6',
              borderRadius: '30px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            icon: '👋',
          });
          router.push("/");
        }
      }
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        toast.error("Login unsuccessfull!\nPlease try again!",{duration:3000});
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/hello.gif" height={400} width={400} alt="whatsapp" />
        <span className="text-7xl">Hello Brother</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-full"
        onClick={handleLogin}
      >
        <FcGoogle size={50} />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
  );
}

export default login;
