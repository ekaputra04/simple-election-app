"use client";
import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthMiddleware } from "@/app/auth/middleware/useAuthMiddleware";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Upload file ke Firebase Storage
      const storageRef = ref(storage, `candidates/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Tambahkan dokumen baru ke Firestore dengan ID yang di-generate secara otomatis
          const docRef = await addDoc(collection(db, "candidates"), {
            name,
            description,
            photoURL: downloadURL,
          });

          console.log("Document written with ID: ", docRef.id);

          // Reset state setelah berhasil menyimpan data
          setUploading(false);
          setName("");
          setDescription("");
          setFile(null);
        }
      );
    } catch (error) {
      console.error("Error saving candidate:", error);
      setUploading(false);
    }
  };

  // =================================

  const { user, loading, isAdmin } = useAuthMiddleware();

  if (loading) return <h1>Loading...</h1>; // Tampilkan spinner jika loading

  if (!user || isAdmin === false) return null;

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Candidate Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Candidate Description"
      ></textarea>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={uploading}>
        {uploading ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
}
