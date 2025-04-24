import { NextRequest, NextResponse } from "next/server";
import { uploadToSupabase } from "@/lib/supabase";

export const POST = async (req: NextRequest) => {
    try {
        const formData = req.formData();
        const file = (await formData).get('file') as File

        const { message, url } = await uploadToSupabase(file)

        console.log(url);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
};