import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userData = { email, password };

    try {
      setLoading(true);
      const responce = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await responce.json();
      setCookie("access_token", data.token, { path: "/" });
      localStorage.setItem("userId", data.user);
      // if (responce.ok) emailRef.current.value = passwordRef.current.value = "";

      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className=" w-full max-w-[1240px] 
  mx-auto  py-20 px-5 overflow-hidden
bg-slate-100 flex items-center justify-center"
    >
      <form
        className="bg-white p-11 shadow-lg rounded-xl w-full max-w-[450px] "
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-2xl font-bold mb-5">Login</h1>
        <div className="flex flex-col  w-full gap-5 ">
          <div className=" p-1  flex flex-col  ">
            <label
              htmlFor="username"
              className="text-lg block font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              autoComplete="true"
              id="username"
              name="username"
              ref={emailRef}
              required
              className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
            />
          </div>
          <div className=" p-1  flex flex-col  ">
            <label
              htmlFor="password"
              className="text-lg block font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="true"
              ref={passwordRef}
              required
              className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
            />
          </div>
        </div>
        <button
          className={`mx-auto flex  bg-black text-white w-[70%] py-3  justify-center mt-6 hover:rounded-lg hover:bg-[#00df9a] hover:font-bold`}
          type="submit"
        >
          Submit
        </button>
        <div className="flex  justify-center ">
          {loading && <img src="/Assets/loader.svg" alt="" />}
        </div>
      </form>
    </div>
  );
}

export default Login;
