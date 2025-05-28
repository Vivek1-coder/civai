"use client";
import { useState } from "react";
import duties from "../../data/duties.json";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";

export default function Home() {
  const [lang, setLang] = useState("en");
  const content = duties[lang];

  return (
    <main className="relative h-screen w-screen  ">
      <section className="w-full flex justify-center">
        <Navbar />
      </section>

      <section className="w-full h-full flex flex-col items-center justify-center px-4  backgroundContainer text-white overflwo-y-scroll">
        <div className="backgroundImage"></div>
        <h1 className="text-xl font-bold ">{content.title}</h1>
        <label className="mt-1 mb-3 tex-lg">
          {content.language} : &nbsp;
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent">
            <option value="en" className="bg-transparent text-black">English</option>
            <option value="hi" className="bg-transparent text-black">हिन्दी</option>
          </select>
        </label>

        <div className="flex justify-center items-center flex-wrap">
          {Object.entries(content.articles).map(([articleId, article]) => (
            <Link
              key={articleId}
              href={`/duties/${lang}/${articleId}`}
              passHref
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  margin: "0.5rem",
                  width: "250px",
                  cursor: "pointer",
                }}
                className="bg-[rgba(61,58,58,0.50)]  hover:scale-105 hover:bg-[rgba(61,58,58,0.85)] text-white h-32 overflow-clip text-center"
              >
                <h3 className="text-lg font-bold z-50 brightness-150 shadow-sm shadow-gray-400 mb-2">Article 51A ({articleId})</h3>
                <p className="text-sm">{article.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
