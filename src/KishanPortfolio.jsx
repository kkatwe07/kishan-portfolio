import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";

export default function KishanPortfolio() {
  const projects = [
    {
      title: "Mine Rescue",
      description:
        "Worked on client-side features, UI polish, and gameplay additions. Helped design a new game mode and supported live updates.",
      link: "https://play.google.com/store/apps/details?id=com.carry1st.minerescue",
      detailedRole: "As a Unity developer on Mine Rescue, I was responsible for implementing core gameplay mechanics including the mining system, resource management, and player progression. I worked closely with the design team to balance game difficulty and create engaging user experiences. My contributions included optimizing performance for mobile devices, implementing analytics tracking, and maintaining code quality through regular refactoring.",
      images: [
        "/projects/mine_rescue/MR_1.png",
        "/projects/mine_rescue/MR_2.png",
        "/projects/mine_rescue/MR_3.png",
        "/projects/mine_rescue/MR_4.png",
        "/projects/mine_rescue/MR_5.png",
      ],
      videos: [
        "https://www.youtube.com/embed/exx4lkuNlB0"
      ]
    },
    {
      title: "BattleBay",
      description:
        "Supporting client/server work, release processes, and event creation. Collaborating closely with designers and engineers.",
      link: "https://battlebay.net/",
      detailedRole: "In BattleBay, I focused on multiplayer networking and real-time gameplay synchronization. I implemented the client-server communication protocol, handled player matchmaking, and optimized network performance for smooth gameplay. I also contributed to the event system, creating dynamic in-game events that kept players engaged. My work involved debugging complex multiplayer issues and ensuring cross-platform compatibility.",
      images: [
        "/projects/battlebay/BB_1.png",
        "/projects/battlebay/BB_2.png",
        "/projects/battlebay/BB_3.png",
        "/projects/battlebay/BB_4.png",
        "/projects/battlebay/BB_5.png",
      ],
      videos: [
        "https://www.youtube.com/embed/hu5zBg-s-zI"
      ]
    },
    {
      title: "Yoga Quest",
      description:
        "Core contributor to gameplay + UI. Used Zenject for architecture. Helped set up CI/CD and align development with design goals.",
      link: "https://play.google.com/store/apps/details?id=com.lb.m3.yoga",
      detailedRole: "As a core developer on Yoga Quest, I implemented the match-3 puzzle mechanics and yoga-themed gameplay elements. I used Zenject for dependency injection to create a clean, maintainable architecture. I was responsible for the UI/UX implementation, ensuring smooth animations and intuitive user interactions. I also set up the CI/CD pipeline for automated testing and deployment, which significantly improved our development workflow.",
      images: [
        "/projects/yoga_quest/YQ_1.png",
        "/projects/yoga_quest/YQ_2.png",
        "/projects/yoga_quest/YQ_3.png",
        "/projects/yoga_quest/YQ_4.png",
      ],
      videos: []
    },
    {
      title: "Survive The Dead",
      description:
        "First-person zombie shooter with wave-based survival. Built shooting mechanics, enemy AI, and game UI.",
      link: "https://kishan-katwe.itch.io/survive-the-dead",
      detailedRole: "Survive The Dead was my personal project where I developed all aspects from concept to completion. I implemented first-person shooting mechanics with realistic weapon handling and recoil systems. The zombie AI features pathfinding, different behavior states, and wave-based spawning. I created the UI system for health, ammo, and score tracking. The project taught me valuable lessons about game design, performance optimization, and player experience.",
      images: [
        "/projects/survive_the_dead/S_1.png",
        "/projects/survive_the_dead/S_2.png",
        "/projects/survive_the_dead/S_3.png",
        "/projects/survive_the_dead/S_4.png",
      ],
      videos: [
        "https://www.youtube.com/embed/o54MXzHX9UY"
      ]
    },
    {
      title: "Laser Defender",
      description:
        "2D top-down space shooter. Designed enemy AI, player mechanics, score + health UI.",
      link: "https://github.com/kkatwe07/Laser-Defender",
      detailedRole: "Laser Defender 2D was my first major game development project. I designed and implemented the 2D shooting mechanics, enemy AI with different attack patterns, and player movement systems. I created a scoring system that rewarded skilled gameplay and implemented health/ammo management. The project helped me understand fundamental game development concepts and sparked my passion for creating engaging gameplay experiences.",
      images: [],
      videos: [
        "https://www.youtube.com/embed/hAyP7UT86dY"
      ]
    },
  ];
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const carouselRef = useRef(null);

  // Swipe gesture handlers
  let touchStartX = null;
  let touchEndX = null;
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const onTouchMove = (e) => {
    touchEndX = e.changedTouches[0].screenX;
  };
  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      setDirection(1);
      setTimeout(() => {
        setCurrent(current === projects.length - 1 ? 0 : current + 1);
      }, 0);
    } else if (distance < -minSwipeDistance) {
      setDirection(-1);
      setTimeout(() => {
        setCurrent(current === 0 ? projects.length - 1 : current - 1);
      }, 0);
    }
    touchStartX = null;
    touchEndX = null;
  };

  // Update the navigation functions to implement circular navigation with immediate direction setting
  const goToNext = () => {
    setDirection(1);
    setTimeout(() => {
      setCurrent((c) => c === projects.length - 1 ? 0 : c + 1);
    }, 0);
  };

  const goToPrev = () => {
    setDirection(-1);
    setTimeout(() => {
      setCurrent((c) => c === 0 ? projects.length - 1 : c - 1);
    }, 0);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e) => {
      if (modalOpen) return;
      if (e.key === "ArrowRight") {
        setDirection(1);
        setTimeout(() => {
          setCurrent(current === projects.length - 1 ? 0 : current + 1);
        }, 0);
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setTimeout(() => {
          setCurrent(current === 0 ? projects.length - 1 : current - 1);
        }, 0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, modalOpen, projects.length]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 space-y-16">
      {/* Header */}
      <motion.header 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="relative"
        >
          <img
            src="/profile.jpg"
            alt="Kishan Katwe"
            className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-blue-400 shadow-2xl"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Kishan Katwe
          </h1>
          <div className="text-xl text-blue-300 font-semibold mt-2 tracking-wide">
            Unity Game Developer
          </div>
          <div className="text-lg text-gray-300 mt-1 font-light tracking-wider">
            Associate Software Engineer at Longbow Games
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Hi, I'm <span className="text-blue-400">Kishan</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-4 font-light">
              A <span className="text-blue-400 font-semibold">Unity Developer</span> with 2+ years of experience 
              building polished mobile & live-ops games. I love turning game ideas into smooth, engaging player experiences.
            </p>
            <p className="text-gray-400 text-sm font-medium tracking-wide">
              Currently working as Associate Software Engineer at Longbow Games
            </p>
          </div>
        </motion.div>


      </motion.header>

      {/* Experience Section */}
      <motion.section 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-white"
          whileHover={{ scale: 1.05 }}
        >
          Experience
        </motion.h2>
        
        <div className="space-y-6">
          <motion.div
            className="bg-gray-900 border border-gray-700 rounded-xl p-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400 text-sm font-semibold">2023–Present</span>
              </div>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                Current
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Associate Software Engineer</h3>
            <p className="text-gray-300 mb-3 text-lg">Longbow Games</p>
            <div className="text-gray-400 text-base space-y-3">
              <p>
                🎮 <span className="text-white font-semibold">Full-Stack Game Development : </span> 
                Built both client and server-side Unity features for major studios like Carry1st and Rovio Entertainment
              </p>
              <p>
                👥 <span className="text-white font-semibold">Team Leadership : </span> 
                Led small development teams (3-5 members), collaborating with Game Designers, Artists, QA, and Data Analysts for smooth feature delivery
              </p>
              <p>
                🚀 <span className="text-white font-semibold">Release Management : </span> 
                Managed release cycles and CI/CD pipelines for consistent internal and external build distribution
              </p>
              <p>
                ☁️ <span className="text-white font-semibold">Cloud Infrastructure : </span> 
                Maintained and administered AWS EC2 environments to support scalable build and deployment processes
              </p>
              <p>
                📊 <span className="text-white font-semibold">Analytics Integration : </span> 
                Integrated Firebase and GameAnalytics to track user behavior and support data-informed design decisions
              </p>
              <p>
                🏗️ <span className="text-white font-semibold">Architecture & Code Quality : </span> 
                Applied MVC architecture and Zenject for structured, maintainable Unity codebases
              </p>
              <p>
                ✨ <span className="text-white font-semibold">Feature Development : </span> 
                Contributed to 5+ game features that increased player engagement and monetization
              </p>
              <p>
                🔧 <span className="text-white font-semibold">Code Optimization : </span> 
                Refactored legacy codebases to improve maintainability and performance
              </p>
              <p>
                🎯 <span className="text-white font-semibold">Live Game Support : </span> 
                Provided ongoing support including bug fixes, optimizations, and monthly update rollouts
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>



      {/* Skills Section */}
      <motion.section 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-white tracking-tight"
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              category: "Programming Languages",
              skills: ["C#", "C++", "Java", "Python"]
            },
            {
              category: "Game Development",
              skills: ["Unity", "Zenject", "MVC Architecture", "Game Design"]
            },
            {
              category: "Tools & Services",
              skills: ["GitHub", "Jenkins", "AWS EC2", "PlayFab", "Firebase", "GameAnalytics"]
            }
          ].map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-blue-400 mb-4 tracking-wide">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        className="max-w-4xl mx-auto space-y-6" 
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Projects
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide">
            Professional and personal game development projects
          </p>
        </motion.div>
        <div
          className="relative flex items-center justify-center min-h-[400px]"
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ perspective: "1000px" }}
        >
          {/* Previous Button - Remove disabled state for circular navigation */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white z-10 shadow-lg"
            onClick={goToPrev}
            aria-label="Previous project"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Project Card Container */}
          <div className="w-full max-w-2xl flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[current].title}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600 p-8 rounded-2xl w-full cursor-pointer shadow-lg relative overflow-hidden group"
                initial={{ 
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.95
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeInOut"
                }}
                onClick={() => setModalOpen(true)}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === "Enter") setModalOpen(true); }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center"
                }}
              >
                {/* Project Card Header */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 h-1"></div>
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {projects[current].title === "Mine Rescue" && "Professional"}
                  {projects[current].title === "BattleBay" && "Professional"}
                  {projects[current].title === "Yoga Quest" && "Professional"}
                  {projects[current].title === "Survive The Dead" && "Personal"}
                  {projects[current].title === "Laser Defender" && "Personal"}
                </div>
                {/* Project Title & Employer */}
                <motion.div 
                  className="mt-6 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <h3 className="text-3xl font-bold mb-2 text-white tracking-tight">
                    {projects[current].title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-300 text-sm font-semibold tracking-wide">
                      {projects[current].title === "Mine Rescue" && "Longbow Games"}
                      {projects[current].title === "BattleBay" && "Longbow Games"}
                      {projects[current].title === "Yoga Quest" && "Longbow Games"}
                      {projects[current].title === "Survive The Dead" && "Personal Project"}
                      {projects[current].title === "Laser Defender" && "Personal Project"}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm font-medium tracking-wide">
                    {projects[current].title === "Mine Rescue" && "Mobile Puzzle Game • Unity • Firebase"}
                    {projects[current].title === "BattleBay" && "Multiplayer Battle Arena • Unity • CI/CD"}
                    {projects[current].title === "Yoga Quest" && "Match-3 Game • Unity • Zenject"}
                    {projects[current].title === "Survive The Dead" && "Zombie Survival FPS • Unity • Navmesh"}
                    {projects[current].title === "Laser Defender" && "Classic Space Shooter • Unity • 2D Physics"}
                  </p>
                </motion.div>
                
                {/* Project Description */}
                <motion.div 
                  className="text-gray-300 text-base mb-6 leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="mb-3">
                    {projects[current].description}
                  </p>
                  <div className="text-sm text-gray-400 font-light leading-relaxed">
                    <div className="font-semibold text-yellow-400 mb-1">Key Contributions:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {projects[current].title === "Mine Rescue" && (
                        <>
                          <li>Designed and implemented new game mode</li>
                          <li>UI tweaks for feedback & responsiveness</li>
                          <li>Integrated Firebase & GameAnalytics</li>
                          <li>Regular bug fixes & optimizations</li>
                        </>
                      )}
                      {projects[current].title === "BattleBay" && (
                        <>
                          <li>Managed release processes (CI/CD, Jenkins)</li>
                          <li>Created live events using internal deployer tools</li>
                          <li>Day-to-day debugging & feature rollouts</li>
                          <li>Client/server-side development</li>
                        </>
                      )}
                      {projects[current].title === "Yoga Quest" && (
                        <>
                          <li>Implemented gameplay & UI systems</li>
                          <li>Applied Zenject for architecture</li>
                          <li>Supported CI/CD pipeline for deployments</li>
                          <li>Client-side and server-side development</li>
                        </>
                      )}
                      {projects[current].title === "Survive The Dead" && (
                        <>
                          <li>FPS mechanics, zombie AI, wave survival</li>
                          <li>Health, ammo UI, level design</li>
                          <li>Solo development from concept to completion</li>
                          <li>AI behavior and gameplay systems</li>
                        </>
                      )}
                      {projects[current].title === "Laser Defender" && (
                        <>
                          <li>2D top-down shooter mechanics</li>
                          <li>UI for score, health, transitions</li>
                          <li>Solo development project</li>
                          <li>2D physics and collision systems</li>
                        </>
                      )}
                    </ul>
                  </div>
                </motion.div>
                
                {/* Tech Stack Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {projects[current].title === "Mine Rescue" && (
                    <>
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">💻 Unity</span>
                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">🎮 C#</span>
                      <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold">🔥 Firebase</span>
                      <span className="bg-pink-600 px-3 py-1 rounded-full text-sm font-semibold">✨ UI/UX</span>
                    </>
                  )}
                  {projects[current].title === "BattleBay" && (
                    <>
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">💻 Unity</span>
                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">🎮 C#</span>
                      <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">🚀 Jenkins</span>
                      <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">⚡ CI/CD</span>
                    </>
                  )}
                  {projects[current].title === "Yoga Quest" && (
                    <>
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">💻 Unity</span>
                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">🎮 C#</span>
                      <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold">🔧 Zenject</span>
                      <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">⚡ CI/CD</span>
                      <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">✨ UI/UX</span>
                    </>
                  )}
                  {projects[current].title === "Survive The Dead" && (
                    <>
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">💻 Unity</span>
                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">🎮 C#</span>
                      <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">🤖 Enemy AI</span>
                      <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">🎯 FPS</span>
                      <span className="bg-pink-600 px-3 py-1 rounded-full text-sm font-semibold">✨ UI/UX</span>
                    </>
                  )}
                  {projects[current].title === "Laser Defender" && (
                    <>
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">💻 Unity</span>
                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">🎮 C#</span>
                      <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm font-semibold">📐 2D Physics</span>
                      <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">🚀 Shooter</span>
                      <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">✨ UI/UX</span>
                    </>
                  )}
                </motion.div>

                {/* Preview Media with Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mb-6 relative group/media"
                >
                  {projects[current].images && projects[current].images.length > 0 && (
                    <div className="relative overflow-hidden rounded-xl border-2 border-yellow-400/30">
                      <img
                        src={projects[current].images[0]}
                        alt={`${projects[current].title} preview`}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover/media:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-white text-sm font-semibold">🎮 Gameplay Preview</div>
                          <div className="text-yellow-300 text-xs">Click to explore more screenshots & videos</div>
                        </div>
                      </div>
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity duration-300">
                        <div className="bg-yellow-500/90 backdrop-blur-sm rounded-full p-4">
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  {projects[current].videos && projects[current].videos.length > 0 && !projects[current].images?.length && (
                    <div className="relative overflow-hidden rounded-xl border-2 border-yellow-400/30">
                      {projects[current].videos[0].includes('youtube') ? (
                        <iframe
                          width="100%"
                          height="240"
                          src={projects[current].videos[0]}
                          title={`${projects[current].title} preview`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-xl"
                        />
                      ) : (
                        <video
                          width="100%"
                          height="240"
                          controls
                          className="rounded-xl"
                        >
                          <source src={projects[current].videos[0]} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                  <motion.a
                    href={projects[current].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button - Remove disabled state for circular navigation */}
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white z-10 shadow-lg"
            onClick={goToNext}
            aria-label="Next project"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Project Indicator Dots */}
        <motion.div 
          className="flex justify-center gap-2 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => {
                const newDirection = index > current ? 1 : index < current ? -1 : 0;
                setDirection(newDirection);
                setTimeout(() => {
                  setCurrent(index);
                }, 0);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        <ProjectModal
          project={projects[current]}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPrev={() => setCurrent((c) => Math.max(0, c - 1))}
          onNext={() => setCurrent((c) => Math.min(projects.length - 1, c + 1))}
          hasPrev={current > 0}
          hasNext={current < projects.length - 1}
        />
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="max-w-4xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Contact Box */}
        <motion.div
          className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
              Let's Connect
            </h2>
            <p className="text-gray-300 text-lg mb-6 font-light tracking-wide leading-relaxed">
              I'm always excited to work on new challenges and create amazing gaming experiences.
            </p>
            
            {/* Main Contact Button - Resume Only */}
            <div className="flex justify-center mb-6">
              <motion.a
                href="/Kishan_Katwe_Resume.pdf"
                download={true}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white/20 inline-flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-lg">💾</div>
                <div className="text-lg font-semibold tracking-wide">Download Resume</div>
              </motion.a>
            </div>
            
            {/* Additional Contact Options */}
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { href: "mailto:kishan.r.katwe.work@gmail.com", text: "Email", color: "hover:bg-green-600" },
                { href: "https://www.linkedin.com/in/kk7-02", text: "LinkedIn", color: "hover:bg-blue-600" },
                { href: "https://github.com/kkatwe07", text: "GitHub", color: "hover:bg-gray-700" },
                { href: "https://kishan-katwe.itch.io/", text: "Itch.io", color: "hover:bg-orange-600" }
              ].map((link, index) => (
                <motion.a
                  key={link.text}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${link.color} text-sm tracking-wide`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.text}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="mt-6 text-gray-400 text-sm font-light tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Available for new opportunities and collaborations
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
