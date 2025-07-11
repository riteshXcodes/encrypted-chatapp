import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-[#f9f4ec] bg-gradient-to-r from-[#f9f4ec] to-[#e0d5c8] vh-100 mb-0">
        <div className="w-2/5 flex justify-center items-center">
          <img className="h-auto w-3/5 rounded-xl shadow-lg"
            src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzs6wtmcetpbv16m149cyg3c%2F1752119180_img_0.webp?st=2025-07-10T03%3A05%3A03Z&se=2025-07-16T04%3A05%3A03Z&sks=b&skt=2025-07-10T03%3A05%3A03Z&ske=2025-07-16T04%3A05%3A03Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=94bAv3L5hB10M74x0Wk99Schfk1QPqtsus%2Bc%2Bi4eb3E%3D&az=oaivgprodscus"
            alt="Chat Illustration"
          />
        </div>
      
      <div className="w-3/5 flex flex-col items-center justify-center">
      <img className="w-24 h-24" src="https://cdn-icons-png.flaticon.com/512/6995/6995660.png"></img>
          <h1 className="text-4xl font-bold mb-4">Welcome to Encrypted Chat 🔐</h1>
          <p className="mb-8 text-lg text-center">
            A privacy-first chat application with RSA + AES encryption.
          </p>
          <div className="flex space-x-4">
            <Link to="/login" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Login/Register
            </Link>
          </div>
        </div>
        </div>

    </>
  );
}

export default Home;