import { motion } from "framer-motion";
import Image from "next/image";

interface Theme {
  name: string;
  description: string;
  bgColor: string;
  image: string;
  url?: string;
}

const themes: Theme[] = [
  {
    name: "Culture",
    description: "Cinéma, livres, art & expos.",
    bgColor: "#f9fafb",
    url: "/culture",
    image:
      "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284292/cinema_pk6obn.jpg",
  },
  {
    name: "Voyage",
    description: "Découvertes et coins de paradis.",
    bgColor: "#f9fafb",
    url: "/voyage",
    image:
      "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284300/voyage_rvhiar.jpg",
  },
  {
    name: "Science & technologie",
    description: "Recherche, innovation et impact",
    bgColor: "#f9fafb",
    url: "/science-technologie",
    image:
      "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753787089/science_techno_xsfrvu.jpg",
  },
  {
    name: "Voiture",
    description: "Tuning, lifestyle & mécaniques.",
    bgColor: "#f9fafb",
    url: "/voiture",
    image:
      "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284291/car_tzhyf2.jpg",
  },
];
const ThemeSection: React.FC = () => {
  return (
    <section className="bg-white py-12 px-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative shadow-xl rounded-2xl p-4 text-center overflow-hidden group flex flex-col justify-between"
            style={{ backgroundColor: theme.bgColor }}
          >
            {/* photo /} */}
            <a href={theme.url}>
            <div className="grow flex items-center justify-center mb-4">
              <Image
                src={theme.image}
                alt={theme.name}
                className="w-full h-auto rounded-xl filter grayscale transition-all duration-500 group-hover:filter-none object-cover aspect-video"
              />
            </div>
            </a>

            {/*text */}
            <div className="px-2 pb-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {theme.name}
              </h3>
              <p className="text-gray-600">{theme.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ThemeSection;
