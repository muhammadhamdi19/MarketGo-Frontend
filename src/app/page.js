import Image from "next/image";
import tool from "../Images/globe_13689496.png";
import seo from "../Images/web_13909115.png";
import keyword from "../Images/search_10905220.png";
import management from "../Images/employee_12905327.png";
import performance from "../Images/data-analytics_1548914.png";
import feedback from "../Images/feedback_7927798.png";
import signup from "../Images/Sign up-amico.png"
import digital from "../Images/Digital tools-bro.png"
import stategy from "../Images/kanban method-pana.png"
import Footer from "./_Components/footer/page";
import SphereAnimation from "./_Components/heroSection/page";
import { Result } from "postcss";


export const metadata = { 
  title: "MarketGo",
  description: "This is my website description",
  
};

async function seoAnalyzer(){
  try {
    const response = await axios.get('http://localhost:8000/api/seo/?url=https://witanime.quest/episode/black-clover-%d8%a7%d9%84%d8%ad%d9%84%d9%82%d8%a9-95/');
    
    console.log(response , "gwuysgduyg");
    
  } catch (error) {
    console.error('Error:', error);
  }
}
seoAnalyzer()


export default function Home() {
  return (
    <>
<SphereAnimation />

      <section className="features py-20 w-full bg-[#e8e9e9]">
        <h2 className="text-center mb-24 font-extrabold text-4xl text-[#1C2E40]">Our Features</h2>
        <div className="container w-[80%] mx-auto flex flex-wrap gap-y-8 justify-center items-center">
          <div className="card lg:w-1/3 md:w-1/2 w-full">
            <div className="inner-card w-full flex flex-col justify-center items-center">
              <Image
                src={tool}
                className="w-[72px] h-[72px] mb-7"
                alt="tools"
              />
              <p className="font-bold mb-7">Website Review Tool</p>
              <p className="font-medium text-center opacity-65 mb-7">
                Analyze your site’s performance and get recommendations
              </p>
            </div>
          </div>


          <div className="card lg:w-1/3 md:w-1/2 w-full">
            <div className="inner-card w-full flex flex-col justify-center items-center">
              <Image
                src={seo}
                className="w-[72px] h-[72px] mb-7"
                alt="tools"
              />
              <p className="font-bold mb-7">SEO Checker</p>
              <p className="font-medium text-center opacity-65 mb-7">
              Optimize for better rankings on search engines.
              </p>
            </div>
          </div>


          <div className="card lg:w-1/3 md:w-1/2 w-full">
            <div className="inner-card w-full flex flex-col justify-center items-center">
              <Image
                src={keyword}
                className="w-[72px] h-[72px] mb-7"
                alt="tools"
              />
              <p className="font-bold mb-7">Keyword Research</p>
              <p className="font-medium text-center opacity-65 mb-7">
              Find the best keywords to target.
              </p>
            </div>
          </div>


          <div className="card lg:w-1/3 md:w-1/2 w-full">
            <div className="inner-card w-full flex flex-col justify-center items-center">
              <Image
                src={management}
                className="w-[72px] h-[72px] mb-7"
                alt="tools"
              />
              <p className="font-bold mb-7">Feedback Campaign</p>
              <p className="font-medium text-center opacity-65 mb-7">
              Collects and analyzes customer opinions to improve service and boost satisfaction.
              </p>
            </div>
          </div>


          <div className="card lg:w-1/3 md:w-1/2 w-full">
            <div className="inner-card w-full flex flex-col justify-center items-center">
              <Image
                src={performance}
                className="w-[72px] h-[72px] mb-7"
                alt="tools"
              />
              <p className="font-bold mb-7">Performance Analytics</p>
              <p className="font-medium text-center opacity-65 mb-7">
              Track and analyze your marketing metrics.
              </p>
            </div>
          </div>


          <div className="card lg:w-1/3 md:w-1/2 w-full">
            <div className="inner-card w-full flex flex-col justify-center items-center">
              <Image
                src={feedback}
                className="w-[72px] h-[72px] mb-7"
                alt="tools"
              />
              <p className="font-bold mb-7">Customer Feedback Analysis</p>
              <p className="font-medium text-center opacity-65 mb-7">
              Gather and interpret feedback for better decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-works py-20 w-full bg-[#f0f0f0]">
      <h2 className="text-center mb-24 font-extrabold text-4xl text-[#1C2E40]">Our How It Works</h2>
      <div className="container w-[80%] mx-auto flex flex-col justify-center items-center">
        <div className="steps text-center flex justify-between flex-col md:flex-row items-center w-full py-8">
          <p>“ Step One “ Create An Account</p>
          <div><Image src={signup} className="lg:w-[450px] w-full md:w-[250px] mt-7" alt="sign up photo"/></div>
        </div>
      </div>
      </section>
      

      <section className="how-works py-20 w-full bg-[#e8e9e9]">
      <div className="container w-[80%] mx-auto flex flex-col justify-center items-center">
        <div className="steps text-center flex justify-between items-center flex-col md:flex-row w-full py-8">
          <div><Image src={digital} className="w-[450px]  mb-7" alt="optimize your marketing photo"/></div>
          <p>“ Step Two “ Use our tools to optimize your marketing efforts.</p>
        </div>
      </div>
      </section>

      <section className="how-works py-20 w-full bg-[#f0f0f0]">
      <div className="container w-[80%] mx-auto flex flex-col justify-center items-center">
        <div className="steps text-center flex justify-between items-center flex-col md:flex-row w-full py-8">
          <p>“ Step Three “ Track your performance and adjust your strategy</p>
          <div><Image src={stategy} className="w-[450px] " alt="adjust your strategy photo"/></div>
        </div>
      </div>
      </section>

      <Footer/>
    </>
  );
}
