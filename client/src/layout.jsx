import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default layout;
