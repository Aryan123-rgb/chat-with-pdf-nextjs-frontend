'use client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PDFViewer from "@/components/PDFViewer";

/*
https://tobbjcvcsxtfihyoqbel.supabase.co/storage/v1/object/public/flask-form-project/fee8141c-d392-4fe0-8963-beef925f9464_aryan_srivastava_resume%20.pdf

api_key_pinecone = pcsk_6QxULK_MgmY6BaRQrut6HRHN5JbeBBBRu2vJ3cgMzw8BTpPm2qS2RZdRzvZF8bf9PStCsW

*/

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50/10 via-blue-100/20 to-blue-50/10">
      {/* Left Panel - PDF Viewer */}
      <div className="w-1/2 border-r border-border">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">PDF Viewer</h2>
          </div>
          <div className="h-[calc(100vh-120px)] overflow-y-auto border rounded-lg">
            <PDFViewer/>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="w-1/2">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Chat Interface</h2>
            <Button variant="outline" className="hover:scale-105 transition-transform">
              Clear Chat
            </Button>
          </div>
          <div className="h-[calc(100vh-120px)] flex flex-col">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto pr-4 shadow-sm rounded-lg">
              <div className="space-y-4 p-4">
                {/* Messages will go here */}
                <div className="text-center text-muted-foreground animate-fade-in">
                  Start chatting by uploading a PDF
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="border-t border-border pt-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[60px] shadow-sm"
                  />
                </div>
                <Button className="w-24 bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}