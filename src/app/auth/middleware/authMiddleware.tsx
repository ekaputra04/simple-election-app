import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";

export const useAuthMiddleware = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      // Arahkan pengguna berdasarkan autentikasi
      if (user && currentPath === "/auth/login") {
        router.push("/");
      }
      if (user && currentPath === "/auth/register") {
        router.push("/");
      }
      if (!user && currentPath === "/") {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  return { user, loading };
};
