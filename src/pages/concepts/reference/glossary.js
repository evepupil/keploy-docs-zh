import React, {useState, useMemo} from "react";
import Layout from "@theme/Layout";

import {glossaryEntries} from "../../../../static/data/glossaryEntries";
import GlossaryCard from "../../../components/GlossaryCard";

function Glossary() {
  const [selectedletter, setselectedletter] = useState([]);

  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const availableLetters = Object.keys(glossaryEntries);

  const handleLetterClick = (letter) => {
    setselectedletter((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  // 重置筛选
  const handleResetFilter = () => {
    setselectedletter([]);
  };

  // 使用useMemo缓存筛选结果避免重复计算
  const filteredEntrie = useMemo(() => {
    if (selectedletter.length === 0) {
      return Object.values(glossaryEntries).flat();
    }
    return selectedletter
      .map((letter) => glossaryEntries[letter] || [])
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedletter]);

  return (
    <Layout
      title="术语表"
      permalink="/reference/glossary"
      description="软件测试与开发相关术语表"
    >
      <main className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            术语表
          </h1>
          <p className="mt-4 text-lg text-[var(--ifm-color-emphasis-700)]">
            现代软件测试与开发术语指南
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="navigation"
          aria-label="字母导航"
        >
          {allLetters.map((letter) => {
            const isAvailable = availableLetters.includes(letter);
            const isSelected = selectedletter.includes(letter);

            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={!isAvailable}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)] focus:ring-offset-2 sm:h-12 sm:w-12
                  ${
                    isAvailable
                      ? isSelected
                        ? "scale-110 bg-[var(--ifm-color-primary)] text-white shadow-lg"
                        : "bg-[var(--ifm-card-background-color)] text-[var(--ifm-color-primary)] shadow-md hover:bg-[var(--ifm-color-primary-lightest)] hover:text-[var(--ifm-color-primary-darker)]"
                      : "cursor-not-allowed bg-transparent text-[var(--ifm-color-emphasis-300)]"
                  }
                `}
                aria-pressed={isSelected}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {selectedletter.length > 0 && (
          <div className="mb-10 text-center">
            <button
              onClick={handleResetFilter}
              className="rounded-full border-2 border-[var(--ifm-color-primary)] bg-transparent px-6 py-2 font-semibold text-[var(--ifm-color-primary)] transition-colors hover:bg-[var(--ifm-color-primary)] hover:text-white"
            >
              重置筛选
            </button>
          </div>
        )}

        <div className="mt-12">
          {selectedletter.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEntrie.map((entry, index) => (
                <GlossaryCard key={`${entry.name}-${index}`} {...entry} />
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(glossaryEntries).map(([letter, entries]) => (
                <section key={letter} id={`letter-${letter}`}>
                  <h2 className="mb-6 border-b-2 border-[var(--ifm-color-emphasis-300)] pb-3 text-4xl font-bold text-[var(--ifm-color-primary)]">
                    {letter}
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {entries.map((entry, index) => (
                      <GlossaryCard key={`${entry.name}-${index}`} {...entry} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {filteredEntrie.length === 0 && selectedletter.length > 0 && (
            <div className="py-16 text-center">
              <p className="text-2xl font-semibold text-[var(--ifm-color-emphasis-800)]">
                未找到相关术语
              </p>
              <p className="mt-2 text-[var(--ifm-color-emphasis-600)]">
                请尝试选择其他字母或重置筛选条件
              </p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default Glossary;