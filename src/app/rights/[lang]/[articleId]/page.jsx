"use client";
import { useParams } from "next/navigation";
import rights from "../../../../data/rights.json";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";

export default function ArticleDetail() {
  const params = useParams();
  const lang = params?.lang;
  const articleId = params?.articleId;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (lang && articleId && rights[lang]?.articles?.[articleId]) {
      setArticle(rights[lang].articles[articleId]);
    }
  }, [lang, articleId]);

  if (!article) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  return (
    <main className="relative h-screen w-screen  ">
      <section className="w-full flex justify-center">
        <Navbar />
      </section>

      <section className="w-full h-full flex flex-col items-center justify-start px-4 pt-24 md:pt-32 backgroundContainer text-white overflow-y-auto relative">
        {/* Optional background overlay */}
        <div className="backgroundImage absolute inset-0 -z-10 "></div>

        {/* Back Button */}
        <Link href="/rights">
          <button className="fixed cursor-pointer top-24 left-4 md:left-10 text-white text-base md:text-xl font-medium bg-white/10 px-4 py-2 rounded-md shadow-md hover:scale-105 hover:bg-white/20 transition duration-200 backdrop-blur-md z-20">
            ← Back
          </button>
        </Link>

        {/* Article Card */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-lg px-6 py-8 md:px-10 md:py-12 overflow-y-auto max-h-[75vh] mt-8">
          <h1 className="text-3xl font-bold text-center mb-6 overflow-y-hidden text-white">
            Article {articleId}: {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-center text-gray-200 whitespace-pre-line">
            {article.explanation}
          </p>
        </div>
      </section>
    </main>
  );
}
