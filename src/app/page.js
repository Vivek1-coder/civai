'use client'; // Only if you're using App Router

import Navbar from '@/components/Navbar/Navbar';
import { Mic, Search, Sparkles, BrainCircuit, ImagePlus, Plus, MoreVertical, Lightbulb, FileCheck, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <main className="relative h-screen w-screen  ">
      
      <section className='w-full flex justify-center'>
        <Navbar/>
      </section>
    <section className='w-full h-full flex flex-col items-center justify-center px-4 pt-8 backgroundContainer'>
      <div className='backgroundImage'></div>
      <div className='content rounded-3xl px-10'>
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center text-white">
        How can I support you with your legal concerns?
        </h1>

      <div className="relative w-full max-w-6xl  bg-transparent bg-gradient-to-br from-black via-zinc-800 to-black text-white rounded-3xl p-4 md:px-6 shadow-2xl transition duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className={`w-full h-28 m-2 text-white bg-transparent placeholder-gray-200 outline-none text-base px-2 transition-all duration-300 ease-in-out ${
              inputFocused ? 'ring-2 ring-gray-500 rounded-xl' : ''
            }`}
            placeholder="Ask anything"
          />

          
        </div>
       <div className="flex flex-wrap gap-3 items-center justify-start md:justify-end px-10">
        <LabeledButton icon={<Lightbulb size={16} />} label="Get Advice" />
        <LabeledButton icon={<FileCheck size={16} />} label="File Review" />
        <LabeledButton icon={<Search size={16} />} label="Search Law" />
        <LabeledButton icon={<Sparkles size={16} />} label="Predict Verdict" />
        <LabeledButton icon={<BrainCircuit size={16} />} label="Similar Cases" />
        <LabeledButton icon={<FileText size={16} />} label="Compile pdf" />
        <IconButton icon={<MoreVertical size={16} />} />
        <IconButton icon={<Mic size={16} />} />
</div>

      </div>
      </div>
    </section>
      
    </main>
  );
}

function IconButton({ icon }) {
  return (
    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2b2b2b] hover:bg-[#3b3b3b] transition-all duration-200 hover:scale-105 shadow-md cursor-pointer">
      {icon}
    </button>
  );
}

function LabeledButton({ icon, label }) {
  return (
    <button className="flex items-center gap-1.5 bg-[#2b2b2b] hover:bg-[#3b3b3b] text-white px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 text-sm shadow-md cursor-pointer">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function PulseCircle() {
  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-20 animate-ping"></div>
      <div className="relative w-4 h-4 bg-blue-400 rounded-sm z-10"></div>
    </div>
  );
}
