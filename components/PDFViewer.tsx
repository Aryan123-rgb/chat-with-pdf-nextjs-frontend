"use client";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function PDFViewer() {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("/api/create-chat", formData);
      console.log("Response:", response.data);
      // const response = await axios.post("/api/upload", formData);

      // if (response.status !== 200) throw new Error("Upload failed");

      // const url = response.data.url;
      // const completeUrl = `https://ufdpbryidfyugpmigfmh.supabase.co/storage/v1/object/public/pdfs/${url}`;

      // console.log("Uploaded PDF URL:", completeUrl);
      // setCurrentPdfUrl(completeUrl);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="h-full w-full relative">
      {currentPdfUrl ? (
        <div className="h-full w-full overflow-auto">
          <iframe
            src={currentPdfUrl}
            className="w-full h-full"
            title="PDF Document"
          />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="pdf-upload"
              className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:scale-105 transition-transform text-foreground bg-background hover:bg-accent hover:text-accent-foreground shadow-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload PDF
            </label>
            <input
              type="file"
              accept=".pdf"
              id="pdf-upload"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {selectedFile && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-green-500" />
                {selectedFile.name}
              </div>
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform cursor-pointer"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
