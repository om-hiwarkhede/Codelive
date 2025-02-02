import { SignInButton } from "@clerk/clerk-react";
import Laptop from "../assets/laptop.png";

const HeroSection = () => {
  const handleLearnMore = () => {
    document.getElementById("learn-more-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto flex flex-col-reverse lg:flex-row items-center py-12 lg:px-8">
        {/* Text Section */}
        <header className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Collaborate on Code, <span className="text-blue-500">Live</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300">
            Experience seamless real-time coding collaboration with your team.
            Build, debug, and deploy together — all in one place.
          </p>
          <div className="space-x-4">
            <SignInButton>
              <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition duration-300">
                Get Started
              </button>
            </SignInButton>
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 bg-transparent border border-blue-500 text-blue-500 font-medium rounded-xl hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Learn More
            </button>
          </div>
        </header>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={Laptop}
            alt="Laptop for live coding"
            className="w-3/4 lg:w-full object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>
      {/* Target Section for "Learn More" */}
      <div id="learn-more-section" className="py-20">
        <h2 className="text-center text-2xl lg:text-4xl font-semibold text-gray-200">
          Discover the Power of Real-Time Collaboration
        </h2>
        <p className="text-center text-gray-400 mt-4">
          Whether you're debugging, brainstorming, or building the next big
          thing, CodeLive makes it easy for teams to work together.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
