import Image from "next/image";
import React from "react";
import lec from "../../Images/Seminar-bro.svg";
import success from "../../Images/Success factors-bro.svg";
import team from "../../Images/Team goals-rafiki.svg";
import Footer from "../_Components/footer/page";

export const metadata = {
  title: "About Us",
};

const About = () => {
  return (
    <div className="bg-[#f0f0f0]">
      <div className="container lg:w-[80%] w-[90%] mx-auto">
        <div className="  pt-52 ">
          <h2 className="text-center text-5xl font-cairo lg:w-[49%] md:w-[73%]  m-auto mb-28 text-[#1C2E40]">
            Advanced SEO Analytics for Digital Growth
          </h2>
          <div className="lg:flex lg:flex-row flex-col justify-center items-center gap-24 mb-16">
            <p className="text-xl font-cairo w[48%] self-center text-[#1C2E40] ">
              At MarketGo, we specialize in delivering comprehensive SEO
              analysis and data-driven insights to help businesses enhance their
              online presence. Our advanced platform provides in-depth website
              audits, keyword research, competitor analysis, and actionable
              optimization strategies tailored to improve search engine
              rankings.
            </p>

            <Image className="lg:w-[48%] " src={lec} alt="lecture" />
          </div>

          <div className="lg:flex lg:flex-row flex-col justify-center items-center gap-24 mb-16">
            <Image className="w-[48%] hidden lg:block" src={success} alt="success" />

            <p className="text-xl font-cairo w[48%] self-center text-[#1C2E40]" >
              Designed for businesses, marketers, and SEO professionals,
              MarketGo combines powerful analytics with an intuitive interface,
              ensuring that users at all levels can make informed decisions to
              maximize their digital success. Our mission is to equip you with
              the tools and expertise needed to navigate the ever-evolving
              landscape of search engine optimization.
            </p>

            <Image className="lg:hidden mx-auto" src={success} alt="success" />
          </div>

          <div className="flex-col justify-center items-center mt-32 mb-28">
            <h3 className="font-cairo text-3xl text-center text-[#1C2E40]">
              Partner with{" "}
              <span className="text-5xl font-bold text-[#BE975B]">
                MarketGo
              </span>{" "}
              and elevate your website’s performance through precision-driven
              SEO solutions.
            </h3>

            <Image className="mx-auto" src={team} alt="team goals" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
