"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="m-10"></div>
      <div className="inset-1 bg-[url('/bgform.jpg')] bg-no-repeat bg-cover bg-center min-h-125 sm:min-h-150 md:min-h-175 lg:min-h-200">
        <div className="inset-0 bg-black/60 min-h-125 sm:min-h-150 md:min-h-175 lg:min-h-200">
          <div className="z-10 flex flex-col items-center justify-center text-center text-white px-6 min-h-125 sm:min-h-150 md:min-h-175 lg:min-h-200">
            <h2 className="relative text-4xl pb-2 font-bold mb-6 drop-shadow-md">
              Votre post a bien été envoyé
              <motion.div
                layoutId="underline"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-1/2 bg-white rounded-full"
              />
            </h2>

            </div>
        </div>
      </div>

      {/* Bloc texte animé au scroll */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 pt-8 font-montserrat text-justify text-gray-800 leading-relaxed text-lg"
      >
      </motion.div>
      <Footer />
    </main>
  );
}






  
      
      
       

 
      