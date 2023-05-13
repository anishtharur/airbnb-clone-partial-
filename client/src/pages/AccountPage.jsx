import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Account = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  const linkClasses = (type) => {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };
  const handleLogout = async () => {
    let res = await axios.post("/logout");
    if (res.data) {
      navigate("/");
      setUser(null);
    }
  };
  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center mb-6">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex flex-col  items-center mt-2 max-w-lg mx-auto">
          <div>Logged in as {user.name}</div>
          <button className="primary max-w-xs" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
