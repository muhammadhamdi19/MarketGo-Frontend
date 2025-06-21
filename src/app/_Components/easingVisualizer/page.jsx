"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const EasingVisualizer = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const easingVisualizerEl = document.querySelector(".easing-visualizer");
      if (!easingVisualizerEl) return;

      const barsWrapperEl = easingVisualizerEl.querySelector(".bars-wrapper");
      const dotsWrapperEl = easingVisualizerEl.querySelector(".dots-wrapper");

      if (!barsWrapperEl || !dotsWrapperEl) return;

      const barsFragment = document.createDocumentFragment();
      const dotsFragment = document.createDocumentFragment();
      const numberOfBars = 91;

      for (let i = 0; i < numberOfBars; i++) {
        const barEl = document.createElement("div");
        const dotEl = document.createElement("div");

        barEl.classList.add(
          "bar",
          "w-[10px]",
          "h-[10px]",
          "bg-gradient-to-b",
          "from-[#373734]",
          "via-[#242423]",
          "to-[#0D0D0C]"
        );

        dotEl.classList.add(
          "dot",
          "w-[10px]",
          "h-[10px]",
          "bg-[#BE975B]",
          "rounded-full"
        );

        barsFragment.appendChild(barEl);
        dotsFragment.appendChild(dotEl);
      }

      barsWrapperEl.appendChild(barsFragment);
      dotsWrapperEl.appendChild(dotsFragment);

      function play() {
        const easings = Object.keys(anime.penner);
        easings.push(`steps(${anime.random(5, 20)})`);
        easings.push(`steps(${anime.random(5, 20)})`);
        easings.push("cubicBezier(0.545, 0.475, 0.145, 1)");
        const ease = easings[anime.random(0, easings.length - 1)];

        anime
          .timeline({ duration: 450, easing: ease, complete: play })
          .add({
            targets: ".easing-visualizer .bar",
            scaleY: anime.stagger([1, 44], {
              easing: ease,
              from: "center",
              direction: "reverse",
            }),
            delay: anime.stagger(7, { from: "center" }),
          })
          .add(
            {
              targets: ".easing-visualizer .dot",
              translateY: anime.stagger(["-160px", "160px"], {
                easing: ease,
                from: "last",
              }),
              delay: anime.stagger(7, { from: "center" }),
            },
            0
          );
      }

      play();
    }, 500); // تأخير بسيط لضمان تحميل الـ DOM بالكامل

    return () => clearTimeout(timeout);
  }, []);

  const [url, setUrl] = useState("");
  const [positive, setPositive] = useState(null);
  const [positiveComment, setPositiveComment] = useState([]);
  const [negative, setNegative] = useState(null);
  const [negativeComment, setNegativeComment] = useState([]);
  const [natural, setNatural] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const value = {
    comments: ["string"],
  };

  async function feedBack(event) {
    event.preventDefault();
    const encodedUrl = encodeURIComponent(url);
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/sentiment/analyze/?url=${encodedUrl}`,
        value
      );

      setPositive(response.data.summary.positive_count);
      setNegative(response.data.summary.negative_count);
      setNatural(response.data.summary.neutral_count);
      setComments(response.data.comments);

      const positiveComments = [];
      const negativeComments = [];

      response.data.comments.forEach((item) => {
        item.sentences.forEach((sentence) => {
          if (sentence.sentiment === "positive") {
            positiveComments.push(item.comment);
          } else if (sentence.sentiment === "neutral") {
            positiveComments.push(item.comment);
          }
        });
      });

      response.data.comments.forEach((item) => {
        item.sentences.forEach((sentence) => {
          if (sentence.sentiment === "negative") {
            negativeComments.push(item.comment);
          }
        });
      });

      // إزالة التكرار لو حابب (مش ضروري)
      setPositiveComment([...new Set(positiveComments)]);
      setNegativeComment([...new Set(negativeComments)]);

      setData(response);
      setLoading(false);
      console.log(response);

      return response;
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  }
  console.log(comments, positiveComment);

  const sum = positive + negative + natural;
  const positveScore = Math.floor(((positive + natural) / sum) * 100);
  const circumference = 251.2; // Circle circumference for 40 radius
  const strokeDashoffset = circumference - (positveScore / 100) * circumference;

  console.log(sum);

  const negativeScore = 100 - positveScore;
  const circumferenceNe = 251.2; // Circle circumference for 40 radius
  const strokeDashoffsetNe =
    circumference - (negativeScore / 100) * circumference;

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full bg-[#252423]">
        <div className="relative w-full max-w-[910px] mx-8">
          <div className="easing-visualizer absolute top-1/2 left-1/2 w-[910px] h-[455px] -translate-x-1/2 -translate-y-1/2 flex justify-between items-center">
            <div className="wrapper bars-wrapper absolute bottom-0 w-full h-full flex justify-between items-center" />
            <div className="wrapper dots-wrapper absolute bottom-0 w-full h-full flex justify-between items-center" />
          </div>

          <div className="text-white flex-col justify-center items-center z-50 text-center relative w-[88%] mx-auto">
            <h2 className="font-bold text-5xl">Feed Campaign</h2>
            <p className="opacity-70 mt-8 md:w-[60%] mx-auto">
              Take full control of your campaigns with powerful tools to track,
              optimize, and maximize your reach. Start managing your campaign
              effortlessly today!
            </p>

            <form onSubmit={feedBack} className="max-w-md mx-auto mt-14">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-100 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  value={url}
                  onInput={(e) => setUrl(e.target.value)}
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 opacity-85 focus:ring-[#BE975B] focus:border-[#BE975B] "
                  placeholder="Enter Post URL e.g. https://www.facebook.com/share/p/12Eg7rbpm3e/"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-[#BE975B] transition-all duration-300 hover:bg-[#a68654] font-medium rounded-lg text-sm px-4 py-2 "
                >
                  {loading ? (
                    <Oval
                      visible={true}
                      height="20"
                      width="40"
                      color="#fff"
                      secondaryColor="#ededed"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Analyze"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {data != null ? <section id="result" className=" w-full ">
      
        <div className="min-h-screen bg-gray-100 flex items-center justify-center lg:p-6 ">
          <div className="bg-white rounded-lg shadow-lg p-8  w-full mt-20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">MarketGo</h1>
              <p className="text-lg text-gray-600">Accelerate Your Growth</p>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Section */}

              <div className="flex-1">
                {/* SEO Score - Circular Progress */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="8"
                        stroke="#e5e7eb"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="8"
                        stroke="#0e9f6e"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#0e9f6e]">
                      {positveScore}
                    </div>
                  </div>
                  <span className="mt-2 font-bold text-2xl text-[#0e9f6e]">
                    {positveScore}/100
                  </span>
                  <p className="text-gray-700 mt-2 font-semibold  text-2xl">
                    Positive Score
                  </p>
                </div>

                <div className=" bg-gray-100 flex items-center justify-center  ">
                  <div className="bg-white rounded-lg  p-8  w-full">
                    {/* Positive Comments */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Positive Comments
                      </h2>

                      <div className="space-y-4 ">
                        {positiveComment.map((item, index) => (
                          <div key={index}>
                            <div
                              key={index}
                              className="bg-gray-100 rounded-lg shadow-lg p-8  w-full"
                            >
                              <p className="text-gray-600">
                                {"\u{1F600}"} {item}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}

              <div className="flex-1">
                {/* SEO Score - Circular Progress */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="8"
                        stroke="#e5e7eb"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        strokeWidth="8"
                        stroke="#f05252"
                        fill="none"
                        strokeDasharray={circumferenceNe}
                        strokeDashoffset={strokeDashoffsetNe}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#f05252]">
                      {negativeScore}
                    </div>
                  </div>
                  <span className="mt-2 font-bold text-2xl text-[#f05252]">
                    {negativeScore}/100
                  </span>
                  <p className="text-gray-700 mt-2 font-semibold  text-2xl">
                    Negative Score
                  </p>
                </div>

                <div className=" bg-gray-100 flex items-center justify-center ">
                  <div className="bg-white rounded-lg  p-8  w-full">
                    {/* Negative Comments */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Negative Comments
                      </h2>

                      <div className="space-y-4">
                      {negativeComment.map((item, index) => (
                          <div key={index}>
                            <div
                              key={index}
                              className="bg-gray-100 rounded-lg shadow-lg p-8  w-full"
                            >
                              <p className="text-gray-600">
                                {"\u{1F620}"} {item}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>:""}
    </>
  );
};

export default EasingVisualizer;
