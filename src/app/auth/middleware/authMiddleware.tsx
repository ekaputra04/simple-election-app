import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";

export const useAuthMiddleware = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/"); // Ganti dengan rute yang sesuai
    }
  }, [user, loading, router]);

  return { user, loading };
};
