import os
import json
from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
PERSIST_DIR = "./chroma_store"

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-2.0-pro-exp-02-05", temperature=0.3)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

def extract_text_from_pdf(pdf_file):
    pdf_reader = PdfReader(pdf_file)
    extracted_text = "".join(page.extract_text() or "" for page in pdf_reader.pages)
    return extracted_text.strip() if extracted_text.strip() else None

def split_text_into_chunks(text, chunk_size=1000, chunk_overlap=200):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap, separators=["\n\n", "\n", " ", ""]
    )
    return text_splitter.split_text(text)

def create_embeddings(text_chunks):
    vector_store = Chroma.from_texts(texts=text_chunks, embedding=embeddings, persist_directory=PERSIST_DIR)
    return "PDF processed and stored!"

@app.route("/process_pdf", methods=["POST"])
def process_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    pdf_file = request.files["file"]
    text = extract_text_from_pdf(pdf_file)
    if not text:
        return jsonify({"error": "No text extracted from PDF"}), 400
    text_chunks = split_text_into_chunks(text)
    message = create_embeddings(text_chunks)
    return jsonify({"message": message})

@app.route("/ask", methods=["POST"])
def ask_question():
    if not os.path.exists(PERSIST_DIR) or not os.listdir(PERSIST_DIR):
        return jsonify({"error": "Vector database not found. Process a PDF first."}), 400
    data = request.json
    user_input = data.get("question", "")
    
    vector_store = Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)
    retriever = vector_store.as_retriever(search_kwargs={"k": 10}, search_type="similarity")

    system_message = """
    You are a helpful AI assistant. Use retrieved context to generate accurate responses.
    If the answer is not in the context, say you don't know.
    {context}
    """
    
    chat_template = ChatPromptTemplate([
        ("system", system_message),
        ("human", "{input}"),
    ])
    
    rag_chain = (
        {
            "context": retriever | RunnableLambda(lambda docs: "\n\n".join(doc.page_content for doc in docs)),
            "input": RunnablePassthrough()
        }
        | chat_template
        | model
        | StrOutputParser()
    )
    
    response = rag_chain.invoke(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True,port=8000)
