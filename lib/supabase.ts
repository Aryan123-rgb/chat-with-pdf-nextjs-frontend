import { createClient } from "@supabase/supabase-js";
import path from "path";
import fs from "fs";

const supabaseUrl = "https://ufdpbryidfyugpmigfmh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZHBicnlpZGZ5dWdwbWlnZm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjE3NDMsImV4cCI6MjA1ODU5Nzc0M30.LDtni0uazRwotXR-YcD7q43NyouBuflsitP9__n0uNk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadToSupabase = async (file: File) => {
    // Upload file to Supabase Storage
    const filePath = `pdfs/${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { data, error } = await supabase.storage.from("pdfs").upload(filePath, fileBuffer, {
        contentType: file.type,
    });

    if (error) throw new Error(error.message);
    console.log("data", data);
    // Return uploaded file URL
    return { message: "File uploaded successfully", url: data?.path };
}

export const downloadFromSupabase = async (fileName: string): Promise<string> => {
    try {
        // Download file from Supabase Storage
        const { data, error } = await supabase.storage.from("pdfs").download(fileName);

        if (error || !data) {
            throw new Error(error?.message || "File not found");
        }

        // Define local storage path (e.g., /tmp/file.pdf)
        const storagePath = path.join("/tmp", fileName);

        // Write file to local disk
        const buffer = Buffer.from(await data.arrayBuffer());
        fs.writeFileSync(storagePath, buffer);

        console.log(`File saved at: ${storagePath}`);
        return storagePath;
    } catch (err: any) {
        throw new Error(`Failed to download file: ${err.message}`);
    }
};
