"use client";
// components/AnimatedShapes.js
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { MutatingDots, Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

const AnimatedShapes = dynamic(() => import("../shapes/page.jsx"), {
  ssr: false, // Disable SSR if it's only client-side
});

const Page = () => {
  const animeRef = useRef(null);

  useEffect(() => {
    const loadAnime = async () => {
      if (typeof window !== "undefined") {
        // Dynamically import anime.js only when needed
        const anime = (await import("animejs")).default;

        animeRef.current = anime; // Store anime.js in a ref to use it later

        // Now we can initialize the animation
        if (animeRef.current) {
          const animeInstance = animeRef.current;
          // Your animation logic goes here
          console.log("anime.js loaded", animeInstance);
        }
      }
    };

    loadAnime();
  }, []);

  const [result, setResult] = useState(null);
  const [data, setData] = useState(null);
  const seoScore = result;
  const circumference = 251.2; // Circle circumference for 40 radius
  const strokeDashoffset = circumference - (seoScore / 100) * circumference;

  const getColor = (score) => {
    if (score < 50) return "#f05252"; // Red
    if (score < 80) return "#facc15"; // Yellow
    return "#0e9f6e"; // Green
  };

  const strokeColor = getColor(seoScore);

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  async function seoAnalyzer() {
    event.preventDefault();
    const encodedUrl = encodeURIComponent(url);
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/seo/?url=${encodedUrl}`
      );

      console.log(response);

      setResult(response.data.seo_score.score);
      setData(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(true);
      console.log("Error:", error);
      setLoading(false);
    }
  }
  console.log(url);

  return (
    <>
      <div className="flex justify-center overflow-hidden items-center relative w-full h-screen bg-[#252423]">
        <div className="text-white flex-col justify-center items-center z-50 text-center relative w-[88%] mx-auto">
          <h2 className="font-bold text-5xl">SEO Analyzer</h2>
          <p className="opacity-70 mt-8 md:w-[60%] mx-auto">
            Perform in-depth SEO Analysis of your website. <br />
            See if your pages are optimized and get actionable data if they
            aren&apos;t.
          </p>

          <form onSubmit={seoAnalyzer} className="max-w-md mx-auto mt-14">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-100"
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
                type="search"
                id="default-search"
                value={url}
                onInput={(e) => setUrl(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 opacity-85 focus:ring-[#BE975B] focus:border-[#BE975B]"
                placeholder="Enter Website URL e.g. https://www.google.com"
                required
              />
              <button
                type="submit"
                className="text-white  absolute end-2.5 bottom-2.5 bg-[#BE975B] transition-all duration-300 hover:bg-[#a68654] font-medium rounded-lg text-sm px-4 py-2"
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

        {/* Lazy-loaded Animated Shapes */}
        <AnimatedShapes />
      </div>

      {/* Results */}

      {data != null ? (
        <section id="result" className="  ">
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full mt-20">
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
                          stroke={strokeColor}
                          fill="none"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div
                        className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                        style={{ color: strokeColor }}
                      >
                        {seoScore}
                      </div>
                    </div>
                    <span
                      className="mt-2 font-bold text-2xl"
                      style={{ color: strokeColor }}
                    >
                      {seoScore}/100
                    </span>
                    <p className="text-gray-700 mt-2 font-semibold  text-2xl">
                      SEO Score
                    </p>
                  </div>

                  <div className=" bg-gray-100 flex items-center justify-center ">
                    <div className="bg-white rounded-lg  p-8 max-w-4xl w-full">
                      {/* Basic SEO Section */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Basic SEO
                        </h2>

                        <div className="space-y-4">
                          <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              H1 Heading
                            </p>
                            <div className="flex items-center gap-2">
                              {data.data.seo_analysis_data.h1.status ==
                              "passed" ? (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600"
                                    size={20}
                                  />
                                  <p className="text-gray-600">
                                    {data.data.seo_analysis_data.h1.description}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle
                                    className="text-red-600"
                                    size={20}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-gray-600">
                                      {
                                        data.data.seo_analysis_data.h1
                                          .description
                                      }
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="text-gray-900">
                                        How to Fix :
                                      </span>
                                      {
                                        data.data.seo_analysis_data.h1
                                          .how_to_fix
                                      }
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              Headings Structure
                            </p>
                            <div className="flex items-center gap-2">
                              {data.data.seo_analysis_data.heading_structure
                                .status == "passed" ? (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600"
                                    size={20}
                                  />
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .heading_structure.description
                                    }
                                  </p>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle
                                    className="text-red-600"
                                    size={20}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-gray-600">
                                      {
                                        data.data.seo_analysis_data
                                          .heading_structure.description
                                      }
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="text-gray-900">
                                        How to Fix :
                                      </span>
                                      {
                                        data.data.seo_analysis_data
                                          .heading_structure.how_to_fix
                                      }
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              SEO Description
                            </p>

                            <div className="flex items-center gap-2">
                              {data.data.seo_analysis_data.meta_description
                                .status == "passed" ? (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600"
                                    size={20}
                                  />
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .meta_description.description
                                    }
                                  </p>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle
                                    className="text-red-600"
                                    size={20}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-gray-600">
                                      {
                                        data.data.seo_analysis_data
                                          .meta_description.description
                                      }
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="text-gray-900">
                                        How to Fix :
                                      </span>
                                      {
                                        data.data.seo_analysis_data
                                          .meta_description.how_to_fix
                                      }
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              Image ALT Attributes{" "}
                            </p>
                            <div className="flex items-center gap-2">
                              {data.data.seo_analysis_data.images.status ==
                              "passed" ? (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600"
                                    size={20}
                                  />
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.images
                                        .description
                                    }
                                  </p>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle
                                    className="text-red-600"
                                    size={20}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-gray-600">
                                      {
                                        data.data.seo_analysis_data.images
                                          .description
                                      }
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="text-gray-900">
                                        How to Fix :
                                      </span>
                                      {
                                        data.data.seo_analysis_data.images
                                          .how_to_fix
                                      }
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              Keywords{" "}
                            </p>
                            <div className="flex  gap-1 mt-5">
                              {data.data.seo_analysis_data.keywords.status ==
                              "passed" ? (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600"
                                    size={20}
                                  />

                                  <div className="flex-col">
                                    <p className="text-gray-600 ml-3">
                                      {
                                        data.data.seo_analysis_data.keywords
                                          .description
                                      }
                                    </p>

                                    <p className="text-gray-600 mt-7">
                                      {data?.data?.seo_analysis_data?.keywords?.common_keywords?.join(
                                        ", "
                                      )}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle
                                    className="text-red-600"
                                    size={20}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-gray-600">
                                      {
                                        data.data.seo_analysis_data.keywords
                                          .description
                                      }
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="text-gray-900">
                                        How to Fix :
                                      </span>
                                      {
                                        data.data.seo_analysis_data.keywords
                                          .how_to_fix
                                      }
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              Links Ratio
                            </p>
                            <div className="flex items-center gap-2">
                              {data.data.seo_analysis_data.links.status ==
                              "passed" ? (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600"
                                    size={20}
                                  />
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.links
                                        .description
                                    }
                                  </p>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle
                                    className="text-red-600"
                                    size={20}
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-gray-600">
                                      {
                                        data.data.seo_analysis_data.links
                                          .description
                                      }
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="text-gray-900">
                                        How to Fix :
                                      </span>
                                      {
                                        data.data.seo_analysis_data.links
                                          .how_to_fix
                                      }
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                            <p className="font-semibold text-lg mb-2">
                              SEO Title
                            </p>

                            <div className="flex items-center gap-2">
                              <FaCheckCircle
                                className="text-green-600"
                                size={20}
                              />
                              <p className="text-gray-600">
                                The title of your homepage has 36 characters
                                which is good.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" bg-gray-100 flex items-center justify-center ">
                    <div className="bg-white rounded-lg  p-8 max-w-4xl w-full">
                      {/* Advanced SEO Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Advanced SEO
                        </h2>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Canonical URL
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.canonical.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.canonical
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.canonical
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.canonical
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Noindex Meta
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.noindex.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.noindex
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.noindex
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.noindex
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">Favicon</p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.check_favicon.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.check_favicon
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.check_favicon
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.check_favicon
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Social Tags
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.social_tags.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.social_tags
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.social_tags
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.social_tags
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Robots.txt
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.robots_txt.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.robots_txt
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.robots_txt
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.robots_txt
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Schema Meta Data{" "}
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.schema_org.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.schema_org
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.schema_org
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.schema_org
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            HTTP to HTTPS Redirect
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.check_http_redirect
                              .status == "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data
                                      .check_http_redirect.description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .check_http_redirect.description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data
                                        .check_http_redirect.how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Custom 404 Page
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.check_404_page
                              .status == "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.check_404_page
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.check_404_page
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.check_404_page
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Viewport Meta Tag
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.mobile_friendly
                              .status == "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.mobile_friendly
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .mobile_friendly.description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data
                                        .mobile_friendly.how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" bg-gray-100 flex items-center justify-center ">
                    <div className="bg-white rounded-lg  p-8 max-w-4xl w-full">
                      {/* Performance Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Performance
                        </h2>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Lazy Loading
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.lazy_loading.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.lazy_loading
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.lazy_loading
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.lazy_loading
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Minify CSS
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.analyze_css.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.analyze_css
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.analyze_css
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.analyze_css
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Minify Javascript
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.analyze_js.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.analyze_js
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.analyze_js
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.analyze_js
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">AMP Page</p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.check_amp.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.check_amp
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.check_amp
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.check_amp
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Page Size
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.analyze_html_size
                              .status == "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data
                                      .analyze_html_size.description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .analyze_html_size.description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data
                                        .analyze_html_size.how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Page Speed
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.page_speed.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600 ">
                                  {
                                    data.data.seo_analysis_data.page_speed
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.page_speed
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.page_speed
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            URL Structure
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.url_structure.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.url_structure
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.url_structure
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.url_structure
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Text Compression
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.check_text_compression
                              .status == "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data
                                      .check_text_compression.description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .check_text_compression.description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data
                                        .check_text_compression.how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Iframe Count
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.check_iframe_usage
                              .status == "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data
                                      .check_iframe_usage.description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data
                                        .check_iframe_usage.description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data
                                        .check_iframe_usage.how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" bg-gray-100 flex items-center justify-center ">
                    <div className="bg-white rounded-lg  p-8 max-w-4xl w-full">
                      {/* Security Section */}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Security
                        </h2>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Directory Listing{" "}
                          </p>

                          <div className="flex items-center gap-2 ">
                            <FaCheckCircle
                              className="text-green-600"
                              size={20}
                            />
                            <p className="text-gray-600">
                              Directory Listing seems to be disabled on your
                              server.
                            </p>
                          </div>
                        </div>

                        <div className="mb-6 bg-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                          <p className="font-semibold text-lg mb-2">
                            Secure Connection
                          </p>

                          <div className="flex items-center gap-2 ">
                            {data.data.seo_analysis_data.https.status ==
                            "passed" ? (
                              <>
                                <FaCheckCircle
                                  className="text-green-600"
                                  size={20}
                                />
                                <p className="text-gray-600">
                                  {
                                    data.data.seo_analysis_data.https
                                      .description
                                  }
                                </p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle
                                  className="text-red-600"
                                  size={20}
                                />
                                <div className="flex flex-col">
                                  <p className="text-gray-600">
                                    {
                                      data.data.seo_analysis_data.https
                                        .description
                                    }
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-gray-900">
                                      How to Fix :
                                    </span>
                                    {
                                      data.data.seo_analysis_data.https
                                        .how_to_fix
                                    }
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Page;
