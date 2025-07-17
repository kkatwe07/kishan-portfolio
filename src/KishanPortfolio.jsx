// Kishan Katwe Portfolio - React + Tailwind
// To deploy this: I'll guide you once this is confirmed.

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function KishanPortfolio() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 space-y-16">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Kishan Katwe</h1>
        <p className="text-lg text-gray-400">
          Unity Game Developer | Gameplay • UI/UX • Tools
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <p className="text-gray-300">
          I'm a Unity developer with 2+ years of experience building gameplay systems,
          polishing UI/UX, and delivering engaging player experiences. I've contributed
          to a wide range of games—from hybrid casual to match-3 and FPS. I love
          clean architecture, expressive animation, and solving gameplay challenges.
        </p>
      </section>

      {/* Skills Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          {[
            "Unity",
            "C#",
            ".NET",
            "Zenject",
            "LeanTween",
            "Firebase",
            "GameAnalytics",
            "Git / GitHub",
            "CI/CD",
            "AWS EC2",
            "Playfab",
            "Jira / Bitbucket",
          ].map((skill) => (
            <div
              key={skill}
              className="bg-gray-800 px-3 py-2 rounded-lg text-center"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Projects</h2>

        {[
          {
            title: "Mine Rescue",
            description:
              "Worked on client-side features, UI polish, and gameplay additions. Helped design a new game mode and supported live updates.",
            link: "https://play.google.com/store/apps/details?id=com.carry1st.minerescue",
          },
          {
            title: "BattleBay",
            description:
              "Supporting client/server work, release processes, and event creation. Collaborating closely with designers and engineers.",
            link: "https://battlebay.net/",
          },
          {
            title: "Yoga Quest",
            description:
              "Core contributor to gameplay + UI. Used Zenject for architecture. Helped set up CI/CD and align development with design goals.",
            link: "https://play.google.com/store/apps/details?id=com.lb.m3.yoga",
          },
          {
            title: "Survive The Dead",
            description:
              "First-person zombie shooter with wave-based survival. Built shooting mechanics, enemy AI, and game UI.",
            link: "https://kishan-katwe.itch.io/survive-the-dead",
          },
          {
            title: "Laser Defender 2D",
            description:
              "2D top-down space shooter. Designed enemy AI, player mechanics, score + health UI.",
            link: "https://github.com/kkatwe07/Laser-Defender",
          },
        ].map((project) => (
          <Card key={project.title} className="bg-gray-900 border-gray-700">
            <CardContent className="py-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-1 mb-2">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">View Project</Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-300">
          Feel free to reach out to me — I'm open to opportunities and collaborations.
        </p>
        <div className="flex justify-center gap-4 flex-wrap text-sm text-gray-400">
          <span>[Email Placeholder]</span>
          <span>[LinkedIn Placeholder]</span>
          <span>[GitHub Placeholder]</span>
          <span>[Resume Link Placeholder]</span>
        </div>
      </section>
    </div>
  );
}