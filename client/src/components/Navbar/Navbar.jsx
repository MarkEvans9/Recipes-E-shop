import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {}, [cookies.access_token]);

  function handleLogout() {
    removeCookie("access_token", { path: "/" });
    localStorage.removeItem("userId");
    navigate("/auth/sign-in");
  }
  return (
    <div className="h-20 flex items-center justify-between text-white max-w-[1240px] mx-auto  bg-black px-5">
      <h1 className="text-3xl font-bold text-[#00df9a] cursor-pointer">Logo</h1>
      <div className="flex items-center">
        <ul className="flex text-lg gap-5">
          <li className="p-3 cursor-pointer font-medium hover:text-[#00df9a]">
            <Link to="/">Home</Link>
          </li>
          {cookies.access_token && (
            <>
              <li className="p-3 cursor-pointer font-medium hover:text-[#00df9a]">
                <Link to="/create-new-Recepie">Create Recepie</Link>
              </li>
              <li className="p-3 cursor-pointer font-medium hover:text-[#00df9a]">
                <Link to="/saved-recepies">Saved</Link>
              </li>
            </>
          )}
          {!cookies.access_token && (
            <>
              <li className="p-3 cursor-pointer font-medium hover:text-[#00df9a]">
                <Link to="/auth/register">Register</Link>
              </li>
              <li className="p-3 cursor-pointer font-medium hover:text-[#00df9a]">
                <Link to="/auth/sign-in">Sign-in</Link>
              </li>
            </>
          )}
        </ul>
        {cookies.access_token && (
          <button
            className=" py-[6px] px-5 bg-white text-black hover:bg-[#00df9a] hover:text-white rounded-lg  font-bold ml-[20px]"
            onClick={handleLogout}
          >
            SignOut
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
