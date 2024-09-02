import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const useAuthMiddleware = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user && !loading) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.isAdmin || false);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(null);
      }
    };

    checkAdminStatus();
  }, [user, loading]);

  useEffect(() => {
    if (!loading) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      if (user && currentPath === "/auth/login") {
        router.push("/");
      } else if (user && currentPath === "/auth/register") {
        router.push("/");
      } else if (user && isAdmin === false && currentPath === "/dashboard") {
        router.push("/");
      } else if (!user && currentPath === "/dashboard") {
        router.push("/");
      }
    }
  }, [user, loading, router, isAdmin]);

  return { user, loading, isAdmin };
};
