
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Components/Home/Nav"; 

function Layout() {
  const location = useLocation(); 

  return (
    <>
      {location.pathname !== "/" && <Nav />}
      <Outlet />
    </>
  );
}

export default Layout;
