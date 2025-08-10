
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Components/Home/Nav"; 
import { useAxiosInterceptors } from "./hooks/useAxiosInterceptors";

function Layout() {
  const location = useLocation(); 
  
  // Setup axios interceptors for automatic loading
  useAxiosInterceptors();

  return (
    <>
      {location.pathname !== "/" && <Nav />}
      <Outlet />
    </>
  );
}

export default Layout;
