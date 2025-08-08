import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import encesWebSite from "../../assets/images/encesWebSite.png";
import inTouchBed from "../../assets/images/inTouchBed.png";
import essaProfile from "../../assets/images/essaProfile.png";
import chapron from "../../assets/images/chapron.png";
import Sos from "../../assets/images/activeSoS.png";
import InstaCan from "../../assets/images/instaCan.png";
import GuideMe from "../../assets/images/guide_me.png";
import MemoryMag from "../../assets/images/memoryMag.png";
import RozFixx from "../../assets/images/rozFix.png";
import Webplanet from "../../assets/images/webplanet.png";
import MedicalAsth from "../../assets/images/madicalAusthetic.png";
import ScrabbleApp from "../../assets/images/scribbleapp.png";
import Unwell from "../../assets/images/unwell.png";
import PianReleif from "../../assets/images/painRelief.png";  
import BounusBreeze from "../../assets/images/bonusbreeze.png";                      
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const projects = [
  {
    title: "A sleek portfolio built with React and Tailwind CSS ",
    type: "Portfolio (React , Tailwind CSS)",
    description:
      "A sleek portfolio built with React and Tailwind CSS to showcase your skills, projects, and experience in a modern design.",
    src: essaProfile,
    link: essaProfile,
    color: "#8f89ff",
    githubLink: "https://github.com/essaehaan",
    liveLink: "#",
  },
  {
    title: "InTouch Bed",
    type: "Mobile App (Flutter)",
    description:
      "InTouch Bed is a comprehensive mobile application for hospital management system and Facility Providers designed to streamline patient care and hospital operations. It offers features like patient registration, appointment scheduling, medical records management, billing, and reporting, all in one platform.",
    src: inTouchBed,
    link: inTouchBed,
    color: "#d01b2a",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },

  {
    title: "🚀 Active SoS",
    type: "Mobile App (Flutter)",
    description:
      "Active SoS is a mobile app that sends alerts to users in case of an emergency. It is designed to be easy to use and can be accessed quickly in emergency situations. The app provides a panic button that can be used to quickly send a distress signal to emergency services, friends, and family. The app also provides a feature to send a location so that emergency services can quickly locate the user. Additionally, the app provides a feature to send a message to emergency contacts with a single tap.",
    src: Sos,
    link: Sos,
    color: "#215AC4",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },
  {
    title: "Chaperon 🔥",
    type: "Mobile App (Flutter)",
    description:
      "Chaperon is a mobile application that provides a user-friendly interface for users to view and manage their products, track orders, and access customer support. The application is designed to be easy to use and provides a seamless experience for users. 🔥",
    src: chapron,
    link: chapron,
    color: "#c4dfea",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },
  {
    title: "Guide Me 🔥",
    type: "Mobile App (Flutter)",
    description:
      "Guide Me is a mobile application that provides users with personalized guidance and support for their daily tasks and challenges. The application is designed to be intuitive and user-friendly, making it easy for users to access the help they needs. 🔥",
    src: GuideMe,
    link: GuideMe,
    color: "#f69349",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },
  {
    title: "Insta Can 🔥",
    type: "Mobile App (Flutter)",
    description:
      "Insta Can is a mobile application that provides users with a platform to create and share short videos with friends and followers. The application is designed to be intuitive and user-friendly, making it easy for users to access the help they needs. 🔥",
    src: InstaCan,
    link: InstaCan,
    color: "#89a947",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },
  {
    title: "Memory Mag 🔥",
    type: "Mobile App (Flutter)",
    description:
      "Memory Mag is a mobile application that helps users manage and organize their memories in a fun and interactive way. The application is designed to be user-friendly and provides a seamless experience for users to create, edit, and share their memories with others.🔥",
    src: MemoryMag,
    link: MemoryMag,
    color: "#125f63",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },
  {
    title: "Roz Fixx🔥",
    type: "Mobile App (Flutter)",
    description:
      "Roz Fixx is a mobile application that provides users with daily work services at homes and other daily basis. The application is designed to be user-friendly and provides a seamless experience for users to access the services they need.",
    src: RozFixx,
    link: RozFixx,
    color: "#de6602",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://github.com/essaehaan",
  },
  {
    title: "Ences Global 🔥",
    type: "Website (WordPress)",
    description:
      "At Ences Global, our mission goes beyond job placement — we are shaping the future of work. By connecting talent with opportunity, delivering tailored training and development programs, we’re not just meeting today’s labor demands; we’re building a stronger, more stable workforce for tomorrow. 💻✨",
    src: encesWebSite,
    link: encesWebSite,
    color: "#FADC42",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://encesglobal.com/",
  },
  {
    title: "The Web Planet 🔥",
    type: "Website (WordPress)",
    description:
      "The Web Planet is not just a design agency it's a symphony of innovation where pixels dance to the rhythm of creativity, giving birth to captivating digital experiences that linger in minds and hearts. We sculpt imagination into reality, pushing the boundaries of design to create immersive narratives 💻✨",
    src: Webplanet,
    link: Webplanet,
    color: "#FFFFFF",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://thewebplanet.com/",
  },
  {
    title: "Medical Aesthetics’s 🔥",
    type: "Website (WordPress)",
    description:
      "Discover Medical Aesthetics’s ultimate skin & beauty experience with a range of personalised treatments and facials designed to reveal your most confident, radiant self.💻✨",
    src: MedicalAsth,
    link: MedicalAsth,
    color: "#AB76A2",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://medicalaestheticsinstitute.co.uk/",
  },

  {
    title: "Scribble APP Web 🔥",
    type: "Website (WordPress)",
    description:
      "Welcome to Scribble, the premier social platform dedicated to empowering diverse voices in the literary world. Founded with a mission to revolutionize the publishing industry, Scribble curates an inclusive ecosystem where authors, avid readers, and publishing resources can connect, create, and thrive together. Our goal is to break down barriers in traditional publishing and offer a space where every story matters. 💻✨",
    src: ScrabbleApp,
    link: ScrabbleApp,
    color: "#E0CDff",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://thescribbleapp.com/",
  },
  {
    title: "UnWellKingdom 🔥",
    type: "Website (WordPress)",
    description:
      "The Unwell Kingdom is a fully playable set of fake Magic: the Gathering cards, designed from the ground up to celebrate a 6-year D&D campaign of the same name. Each card is mechanically unique (except for the 5 basic lands and a few familiar tokens),  geared for limited play, and features hand-drawn art.This website was created to chronicle the development of the set and showcase its cards and artists. This is a fan-made project, and is not for sale or profit.💻✨",
    src: Unwell,
    link: Unwell,
    color: "#522989",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://theunwellkingdom.com/",
  },
   {
    title: "Body Focus Innovative Healthcare 🔥",
    type: "Website (WordPress)",
    description:
      "As an integrated multidisciplinary clinic, Dr. Elena Morreale has chosen the most effective, non-surgical treatments for pain relief, aesthetics and anti-aging therapies, and have brought them together all under one roof to bring you better health and a better quality of life!💻✨",
    src: PianReleif,
    link: PianReleif,
    color: "#15803f",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://drelenamorreale.com/",
  },
     {
    title: "Bonus Breeze 🔥",
    type: "Website (WordPress)",
    description:
      "Your comprehensive directory for making money through credit card and bank account bonuses in the U.S.💻✨",
    src: BounusBreeze,
    link: BounusBreeze,
    color: "#15803f",
    githubLink: "https://github.com/essaehaan",
    liveLink: "https://bonusbreeze.com/",
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") {
      return true;
    }
    if (selectedCategory === "Mobile App") {
      return project.type.includes("Mobile App");
    }
    if (selectedCategory === "Website") {
      return project.type.includes("Website") || project.type.includes("Portfolio");
    }
    return false;
  });

  return (
    <ReactLenis root>
      <main className="bg-slate-950" ref={container}>
        <div className="sticky top-16 bg-slate-950 z-10 py-6">
          <div className="flex justify-center space-x-4">
            {["All", "Mobile App", "Website"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <section className="text-white w-full bg-slate-950">
          {filteredProjects.map((project, i) => {
            const targetScale = 1 - (filteredProjects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                type={project.type}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  type,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-9 project-container"
      style={{
        paddingTop: "15%"
      }}
    >
      <motion.div
        style={{
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Modern split card design */}
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          {/* Image section - full width on mobile, 55% on desktop */}
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <motion.img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />

            {/* Colored overlay on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />

            {/* Project number */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content section - full width on mobile, 45% on desktop */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>
            <div className="mt-4 md:mt-6 flex items-center justify-between">
              <span
                className="text-xs md:text-sm font-medium"
                style={{ color }}
              >
                Type / Technology: {type}
              </span>
            </div>
            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />

              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Code
                  </span>
                </motion.a>

                {/* Live Link */}
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Live
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add PropTypes validation
Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  liveLink: PropTypes.string.isRequired,
};
