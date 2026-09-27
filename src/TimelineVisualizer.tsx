"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, ShieldCheck, ChevronRight } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  title: string;
  category: "Career" | "Health" | "Wealth" | "Personal";
  probability: number;
  description: string;
  actionStep: string;
}

const mockMilestones: Milestone[] = [
  {
    id: "m-1",
    year: "वर्ष १ (२०२५)",
    title: "AI & Full-Stack Mastery",
    category: "Career",
    probability: 94,
    description: "Next.js, E2EE Security आणि AI Integration मधील उच्च कौशल्य प्राप्त कराल.",
    actionStep: "दररोज २ तास नवीन AI Architecture शिकण्यासाठी द्या."
  },
  {
    id: "m-2",
    year: "वर्ष ३ (२०२७)",
    title: "Financially Independent Tech Lead",
    category: "Wealth",
    probability: 88,
    description: "स्वतंत्र प्रोजेक्ट्स आणि SaaS प्लॅटफॉर्मवरून स्थिर Passive Revenue प्राप्त होईल.",
    actionStep: "महिना १०,००० रु. Systematic Tech Equity मध्ये इनव्हेस्ट करा."
  },
  {
    id: "m-3",
    year: "वर्ष ५ (२०२९)",
    title: "LifeLine Future AI Expansion",
    category: "Career",
    probability: 81,
    description: "तुमचा फ्लॅगशिप प्लॅटफॉर्म १०,००० हून अधिक सक्रिय युझर्सपर्यंत पोहोचेल.",
    actionStep: "ग्लोबल युझर्ससाठी Web3 auth आणि DID सिस्टीम जोडा."
  },
  {
    id: "m-4",
    year: "वर्ष १० (२०३४)",
    title: "Holistic Peak Balance & Freedom",
    category: "Personal",
    probability: 76,
    description: "आर्थिक स्वातंत्र्य, उत्तम आरोग्य आणि कौटुंबिक स्थैर्य यांचा आदर्श समतोल साधला जाईल.",
    actionStep: "दररोज मानसिक शांती आणि वर्क-लाईफ बॅलन्स ट्रॅक करा."
  }
];

export const TimelineVisualizer: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(mockMilestones[0]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#00F2FE]/20 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.1)] text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#9D00FF] bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#00F2FE]" />
            १०-वर्षीय फ्युचर टाइमलाईन व्हिज्युअलायझर
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            AI-Predicted Strategic Milestones (Encrypted & Adaptive)
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#00F2FE] bg-[#00F2FE]/10 px-3 py-1.5 rounded-full border border-[#00F2FE]/30">
          <ShieldCheck className="w-4 h-4" /> E2E Verified
        </div>
      </div>

      {/* Interactive Horizontal Line Track */}
      <div className="relative my-12 px-4">
        {/* Background Glowing Bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#131B2E] -translate-y-1/2 rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#00F2FE] to-[#9D00FF] -translate-y-1/2 rounded-full opacity-50 blur-[2px]" />

        {/* Timeline Nodes */}
        <div className="relative flex justify-between items-center z-10">
          {mockMilestones.map((m) => {
            const isSelected = selectedMilestone.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMilestone(m)}
                className="group relative flex flex-col items-center focus:outline-none"
              >
                {/* Node Orb */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "bg-[#00F2FE] shadow-[0_0_20px_#00F2FE] border-2 border-white"
                      : "bg-[#0F172A] border border-[#00F2FE]/40 group-hover:border-[#00F2FE]"
                  }`}
                >
                  <Target className={`w-5 h-5 ${isSelected ? "text-[#05070E]" : "text-[#00F2FE]"}`} />
                </motion.div>

                {/* Year Label */}
                <span className={`mt-3 text-xs md:text-sm font-semibold transition-colors duration-300 ${isSelected ? "text-[#00F2FE] font-bold" : "text-gray-400 group-hover:text-white"}`}>
                  {m.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMilestone.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-6 bg-[#0F172A]/90 border border-[#9D00FF]/30 rounded-xl relative overflow-hidden"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#9D00FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4 mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#9D00FF]/20 text-[#9D00FF] font-semibold border border-[#9D00FF]/30">
                {selectedMilestone.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{selectedMilestone.title}</h3>
            </div>
            <div className="flex items-center gap-2 bg-[#05070E] px-4 py-2 rounded-lg border border-gray-800">
              <span className="text-xs text-gray-400">संभाव्यता (Probability):</span>
              <span className="text-lg font-bold text-[#00F5D4]">{selectedMilestone.probability}%</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">{selectedMilestone.description}</p>

          <div className="p-4 bg-[#05070E]/60 border border-[#00F2FE]/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChevronRight className="w-5 h-5 text-[#00F2FE]" />
              <div>
                <span className="text-xs text-[#00F2FE] font-semibold block">आजच करायची प्राथमिक कृती (Action Step):</span>
                <span className="text-sm text-gray-200">{selectedMilestone.actionStep}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
