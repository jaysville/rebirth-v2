"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "@/redux/slices/appSlice";
import { RootState } from "@/redux/store";
import { notifyError } from "@/lib";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const SessionWrapper: React.FC<Props> = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const sessionExpirationTime = useSelector(
    (state: RootState) => state.app.sessionExpiresAt
  );

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
  const token = useSelector((state: RootState) => state.app.token);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      if (!token || !isAdmin) {
        router.replace("/");
        return;
      }
    }

    setAuthChecked(true);
  }, [isAdmin, token, pathname]);

  useEffect(() => {
    if (sessionExpirationTime) {
      const interval = setInterval(() => {
        const currentDate = Date.now();

        if (currentDate > sessionExpirationTime) {
          notifyError("Your session has expired. Please log in again");
          dispatch(logout());
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sessionExpirationTime, dispatch]);

  if (pathname.startsWith("/admin") && !authChecked) {
    return null;
  }

  return <>{children}</>;
};

export default SessionWrapper;
