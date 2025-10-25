import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, isOpen, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      if (selectedImage) {
        setSelectedImage(null);
      } else {
        onClose();
      }
    }
    if (e.key === "ArrowLeft" && hasPrev) onPrev();
    if (e.key === "ArrowRight" && hasNext) onNext();
  }, [onClose, onPrev, onNext, hasPrev, hasNext, selectedImage]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  // Combine all media (images and videos) into one array
  const allMedia = [
    ...(project.images || []).map(img => ({ type: 'image', src: img })),
    ...(project.videos || []).map(vid => ({ type: 'video', src: vid }))
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ 
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)"
            }}
            onClick={onClose}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative"
              initial={{ 
                scale: 0.8, 
                opacity: 0,
                y: 50,
                rotateX: -15
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: 0,
                rotateX: 0
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0,
                y: 50,
                rotateX: 15
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200"
                onClick={onClose}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 flex items-center z-10">
                {hasPrev && (
                  <motion.button
                    onClick={onPrev}
                    className="ml-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center z-10">
                {hasNext && (
                  <motion.button
                    onClick={onNext}
                    className="mr-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh] p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {/* Project Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                      {project.title}
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-blue-300 text-base font-semibold">
                        {project.title === "Mine Rescue" && "Longbow Games"}
                        {project.title === "BattleBay" && "Longbow Games"}
                        {project.title === "Yoga Quest" && "Longbow Games"}
                        {project.title === "Survive The Dead" && "Personal Project"}
                        {project.title === "Laser Defender" && "Personal Project"}
                      </span>
                    </div>
                    <p className="text-gray-300 text-base font-medium">
                      {project.title === "Mine Rescue" && "Mobile Puzzle Game • Unity + Firebase"}
                      {project.title === "BattleBay" && "Multiplayer Battle Arena • Unity + CI/CD"}
                      {project.title === "Yoga Quest" && "Match-3 Yoga Game • Unity + Zenject"}
                      {project.title === "Survive The Dead" && "Zombie Survival FPS • Unity + AI"}
                      {project.title === "Laser Defender" && "Classic Space Shooter • Unity + 2D Physics"}
                    </p>
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-center text-xl leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Key Contributions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-semibold mb-3 text-center text-white">Key Contributions</h3>
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-base text-gray-400">
                      <div className="font-semibold text-yellow-400 mb-2">Technical Achievements:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {project.title === "Mine Rescue" && (
                          <>
                            <li>Designed and implemented new game mode</li>
                            <li>UI tweaks for feedback & responsiveness</li>
                            <li>Integrated Firebase & GameAnalytics</li>
                            <li>Regular bug fixes & optimizations</li>
                          </>
                        )}
                        {project.title === "BattleBay" && (
                          <>
                            <li>Managed release processes (CI/CD, Jenkins)</li>
                            <li>Created live events using internal deployer tools</li>
                            <li>Day-to-day debugging & feature rollouts</li>
                            <li>Client/server-side development</li>
                          </>
                        )}
                        {project.title === "Yoga Quest" && (
                          <>
                            <li>Implemented gameplay & UI systems</li>
                            <li>Applied Zenject for architecture</li>
                            <li>Supported CI/CD pipeline for deployments</li>
                            <li>Client-side and server-side development</li>
                          </>
                        )}
                        {project.title === "Survive The Dead" && (
                          <>
                            <li>FPS mechanics, zombie AI, wave survival</li>
                            <li>Health, ammo UI, level design</li>
                            <li>Solo development from concept to completion</li>
                            <li>AI behavior and gameplay systems</li>
                          </>
                        )}
                        {project.title === "Laser Defender" && (
                          <>
                            <li>2D top-down shooter mechanics</li>
                            <li>UI for score, health, transitions</li>
                            <li>Solo development project</li>
                            <li>2D physics and collision systems</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-semibold mb-3 text-center text-white">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.title === "Mine Rescue" && (
                      <>
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-500 transition-colors">💻 Unity</span>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-500 transition-colors">🎮 C#</span>
                        <span className="bg-orange-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-orange-500 transition-colors">🔥 Firebase</span>
                        <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-purple-500 transition-colors">📊 GameAnalytics</span>
                        <span className="bg-pink-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-pink-500 transition-colors">✨ UI/UX</span>
                      </>
                    )}
                    {project.title === "BattleBay" && (
                      <>
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-500 transition-colors">💻 Unity</span>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-500 transition-colors">🎮 C#</span>
                        <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-500 transition-colors">🚀 Jenkins</span>
                        <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-500 transition-colors">⚡ CI/CD</span>
                        <span className="bg-cyan-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-cyan-500 transition-colors">🎪 PlayFab</span>
                      </>
                    )}
                    {project.title === "Yoga Quest" && (
                      <>
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-500 transition-colors">💻 Unity</span>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-500 transition-colors">🎮 C#</span>
                        <span className="bg-orange-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-orange-500 transition-colors">🔧 Zenject</span>
                        <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-500 transition-colors">⚡ CI/CD</span>
                        <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-purple-500 transition-colors">✨ UI/UX</span>
                      </>
                    )}
                    {project.title === "Survive The Dead" && (
                      <>
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-500 transition-colors">💻 Unity</span>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-500 transition-colors">🎮 C#</span>
                        <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-500 transition-colors">🤖 AI</span>
                        <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-purple-500 transition-colors">🎯 FPS</span>
                        <span className="bg-pink-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-pink-500 transition-colors">✨ UI/UX</span>
                      </>
                    )}
                    {project.title === "Laser Defender" && (
                      <>
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-500 transition-colors">💻 Unity</span>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-500 transition-colors">🎮 C#</span>
                        <span className="bg-cyan-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-cyan-500 transition-colors">📐 2D Physics</span>
                        <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-500 transition-colors">🚀 Shooter</span>
                        <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-purple-500 transition-colors">✨ UI/UX</span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Combined Media Gallery */}
                {allMedia.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="text-2xl font-semibold mb-3 text-center text-white">Project Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {allMedia.map((media, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05, z: 10 }}
                          style={{ transformStyle: "preserve-3d" }}
                          className="rounded-lg overflow-hidden shadow-lg"
                        >
                          {media.type === 'image' ? (
                            <img
                              src={media.src}
                              alt={`${project.title} media ${i + 1}`}
                              className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => setSelectedImage(media.src)}
                            />
                          ) : (
                            <div className="w-full h-48">
                              {media.src.includes('youtube') ? (
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={media.src}
                                  title={`${project.title} video ${i + 1}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full"
                                />
                              ) : (
                                <video
                                  width="100%"
                                  height="100%"
                                  controls
                                  className="w-full h-full object-cover"
                                >
                                  <source src={media.src} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Project Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="text-center"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                  >
                    View Project
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Full size image"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 