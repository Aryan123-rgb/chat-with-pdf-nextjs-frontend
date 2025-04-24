import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/10 via-blue-100/20 to-blue-50/10">
      <div className="w-full max-w-4xl px-4">
        {/* Hero Section */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            <span className="text-foreground">Chat with Your PDFs</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your PDF documents into interactive conversations. Get instant answers, insights, and summaries from your documents.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card className="shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
            <CardHeader>
              <CardTitle className="text-blue-500">Smart Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get intelligent insights and answers from your PDF documents.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
            <CardHeader>
              <CardTitle className="text-blue-500">Real-Time Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interact with your documents in real-time using natural language.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
            <CardHeader>
              <CardTitle className="text-blue-500">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your data stays private - we never store your documents.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
