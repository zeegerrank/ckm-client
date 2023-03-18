import { Outlet } from "react-router-dom";import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const persist = JSON.parse(localStorage.getItem("persist"));
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { inUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshTokenMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        console.log("verify refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (persist !== true) {
    /**persist: no */
    console.log("No Persist");
    content = <Outlet />;
  } else if (isLoading) {
    /**persist: no, token: no */
    console.log("Loading");
    content = <div>Loading...</div>;
  } else if (isError) {
    /**persist: no, token: no */
    console.log("Error", error.message);
    content = <Outlet />;
  } else if (isSuccess && trueSuccess) {
    /**persist: yes, token: yes */
    console.log("Success");
    content = <Outlet />;
  } else if (inUninitialized) {
    /**persist: yes, token: no */
    console.log("Uninitialized");
    content = <Outlet />;
  } else if (!persist && !token) {
    /**persist: no, token: no */
    console.log("No Persist and No Token");
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
