"use client";

import Header from "@/components/Header";
import ThemeSection from "@/components/ThemeSection";
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
              Bienvenue sur FlashPost
              <motion.div
                layoutId="underline"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-1/2 bg-white rounded-full"
              />
            </h2>

            <p className="text-lg max-w-3xl text-white/90 drop-shadow">
              Ici, on mixe culture, science & technologie, voyages inspirants et passion
              pour l’automobile. Un espace où l’on partage des découvertes, des
              réflexions, et des instants de vie… toujours avec style,
              curiosité, et un soupçon d’adrénaline.
            </p>
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
        <p>
          Nous sommes des étudiant·e·s qui sont passionné·e·s réuni·e·s grâce à notre formation à Ada Tech School.
          Ensemble, nous avons décidé de créer ce microblogging pour partager ce
          qui nous fait vibrer, chacun·e dans son univers.
        </p>
        <br/>
        Vanessa vous emmène en voyage, à la découverte de paysages, de cultures
        locales et de petits coins de paradis.
        <br />
        <br />
        Daniela explore la culture sous toutes ses formes : cinéma, littérature,
        expos, tendances et coups de cœur artistiques.
        <br />
        <br />
        Petronela explore les croisements entre science et technologie,
         à travers les découvertes qui ont façonné et transforment notre monde.
        <br />
        <br />
        Renaud, lui, vit à fond sa passion pour le tuning et l’univers
        automobile – entre performances mécaniques, esthétique et lifestyle
        motorisé.
        <p>
          <br />
          Ce projet est né de notre envie commune de créer un espace vivant,
          libre et inspirant. <strong>FlashPost</strong> est notre terrain
          d’expression, un endroit où chaque voix trouve sa place, et où
          chacun·e peut s’identifier, découvrir et s’évader, même le temps d’un
          éclair
        </p>
      </motion.div>

      <ThemeSection />
      <Footer />
    </main>
  );
}
