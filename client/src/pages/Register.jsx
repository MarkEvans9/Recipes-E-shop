import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userDetail = { username, email, password };

    try {
      setLoading(true);
      const responce = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userDetail),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setLoading(!loading);
      const data = await responce.json();
      if (responce.ok) navigate("/auth/sign-in");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className=" w-full max-w-[1240px] 
      mx-auto  py-10 px-5 overflow-hidden
    bg-slate-100 flex items-center justify-center"
    >
      <div>
        <p></p>
      </div>
      <form
        className="bg-white p-11 shadow-lg rounded-xl w-full max-w-[450px]"
        onSubmit={handleRegister}
      >
        <h1 className="text-center text-2xl font-bold mb-5">Register</h1>
        <div className="flex flex-col  w-full gap-5 ">
          <div className=" p-1  flex flex-col  ">
            <label
              htmlFor="username"
              className="text-lg block font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              ref={usernameRef}
              className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
            />
          </div>
          <div className=" p-1  flex flex-col  ">
            <label
              htmlFor="email"
              className="text-lg block font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              ref={emailRef}
              className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
            />
          </div>
          <div className=" p-1  flex flex-col  ">
            <label
              htmlFor="password"
              className="text-lg block font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password1"
              required
              ref={passwordRef}
              className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
            />
          </div>
        </div>
        <button
          className={`mx-auto flex bg-black text-white w-[70%] py-3  justify-center mt-6 hover:rounded-lg hover:bg-[#00df9a] hover:font-bold `}
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

export default Register;
