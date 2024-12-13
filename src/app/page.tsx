"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ContactForm from "./components/contactForm";
import Image from "next/image";
import Link from "next/link";
import FAQSection from "./components/faq";
// import { motion, AnimatePresence } from 'framer-motion';

function HeroSection() {
  const slides = [
    "/Slide Show/1.png",
    "/Slide Show/2.png",
    "/Slide Show/3.png",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[400px]">
      <div className="h-2 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>

      <div className="flex items-center justify-center h-full relative bg-[#004F89]/80">
        <Image
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          width={1904}
          height={400}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          priority
        />
        <div className="relative z-10 text-end h-full text-white">
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-4">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-4 h-4 rounded-full cursor-pointer ${currentSlide === index ? "bg-white" : "bg-gray-400"
                  }`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>
    </section>
  );
}


const AutoFeatureSelector: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayDuration = 2000; // 2 seconds per feature
  const pauseDuration = 5000; // 5 seconds pause
  const features = useMemo(() => ({
    "Innovative Curriculum":
      "Our cutting-edge curriculum integrates modern teaching methodologies and technological advancements to prepare learners for the future.",
    "Experienced Faculty":
      "Learn from highly qualified educators who are passionate about fostering excellence and innovation in education.",
    "Comprehensive Programs":
      "From academic excellence to practical skills, we offer a diverse range of programs tailored to meet every learner's needs.",
    "Personalized Learning":
      "With a focus on individual growth, our personalized approach ensures every student achieves their full potential.",
    "Global Perspectives":
      "We emphasize international standards and a global outlook, equipping students to thrive in a connected world.",
  }), []); // Empty dependency array means this will only be created once

  useEffect(() => {
    // Function to start auto-playing
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setSelectedFeature((prev) => (prev + 1) % Object.keys(features).length);
      }, autoPlayDuration);
    };

    // Function to pause auto-playing
    const pauseAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // If auto-playing is enabled, start the interval
    if (isAutoPlaying) {
      startAutoPlay();

      // Set a timer to resume auto-play after pause duration
      const resumeTimer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, pauseDuration);

      // Cleanup function
      return () => {
        pauseAutoPlay();
        clearTimeout(resumeTimer);
      };
    }

    // Add dependencies to useEffect
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [features, isAutoPlaying, autoPlayDuration, pauseDuration]);

  // Handler to toggle auto-play when user clicks
  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto p-4">
      <div className="flex gap-2 md:gap-4 mb-4">
        {Object.keys(features).map((_, i) => (
          <div
            key={i}
            onClick={() => handleFeatureClick(i)}
            className={`w-8 h-8 md:w-12 md:h-12 rounded-full cursor-pointer ${selectedFeature === i ? "bg-[#16007E]" : "bg-gray-300"
              } flex items-center justify-center transition-colors duration-300`}
          >
            <h2
              className={`${selectedFeature === i ? "text-white" : "text-gray-800"
                } font-bold text-3xl text-center`}
            >
              {i + 1}
            </h2>
          </div>
        ))}
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold text-[#16007E] mb-2">
          {Object.keys(features)[selectedFeature]}
        </h3>
        <p className="text-base text-gray-700">
          {Object.values(features)[selectedFeature]}
        </p>
      </div>
    </div>
  );
};

function AilestraSection() {
  return (
    <section className="relative bg-[#FF0000] py-8 align-middle ">
      <div className="absolute inset-0">
        <Image
          src="/background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority={true} // Ensures the background loads quickly
        />
      </div>
      <div className="absolute inset-0 bg-[#FF0000] opacity-60"></div>

      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-6 mb-8 flex items-center px-28">
        <Image
          src="/Ailestra/wing.png"
          alt="left wing"
          layout="intrinsic"
          width={250}
          height={250}
          priority
          className="transform -scale-x-100 pb-20"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#B80000] mb-4 text-center">
            Why Ailestra?
          </h2>
          <AutoFeatureSelector />
        </div>
        <Image
          src="/Ailestra/wing.png"
          alt="right wing"
          layout="intrinsic"
          width={250}
          height={250}
          priority
          className="pb-20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-base">
            Our diverse courses cater to every stage of learning, offering
            academic programs like KBSE, AKU-EB, CAIE O/A Level, IGCSE, and IB,
            alongside English Language Programs for communication and writing
            skills. Enhance your tech proficiency with ICT and programming
            courses, including Python, robotics, and advanced tools. Unleash
            creativity through practical skills in graphic design, digital
            marketing, photography, event planning, and more, ensuring you gain
            the expertise needed for academic and professional success.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Foundation Program",
              "English Language Programs",
              "ICT Programs",
              "Practical Skills",
              "Programming",
            ].map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 h-16 flex items-center justify-center bg-white/20">
                <p className="text-white text-center font-bold">{course}</p>
              </div>
            ))}
            <Link href={`/courses`} className="col-span-2 md:col-span-1 bg-[#16007E] rounded-lg p-3 m-2 justify-center">
              <button className="text-white font-bold w-full h-full">
                See All
              </button>
            </Link>

          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#B80000] mb-4">
          Recorded Lectures
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Image
              key={i}
              src={`/Thumbnails/240f1f0d-d49f-48c2-9a67-57bb83383ff4_1024.jpg`}
              alt={`Lecture ${i + 1}`}
              width={300}
              height={0}
              className="rounded-lg border-2 border-[#B80000]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const embedID = "pKqRNMwvb2Q";

const Embed = () => {
  const [imageClicked, setImageClicked] = useState(false);

  return (
    <div className="relative w-full pb-[56.25%]">
      {/* Aspect ratio 16:9 */}
      <div className="absolute inset-0" onClick={() => setImageClicked(true)}>
        {!imageClicked ? (
          <>
            <Image
              src={`https://img.youtube.com/vi/${embedID}/sddefault.jpg`}
              layout="fill"
              objectFit="cover"
              alt="YouTube thumbnail"
              className="rounded-lg"
            />
            <Image
              src={`https://addplaybuttontoimage.way4info.net/Images/Icons/7.png`}
              width={80}
              height={80}
              // objectFit="cover"
              alt="Play button"
              priority
              className="absolute w-16 h-16 md:w-20 md:h-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            />
          </>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${embedID}?rel=0&showinfo=0&autoplay=1`}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen></iframe>
        )}
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="relative w-full bg-white">
      <HeroSection />

      <section className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <Image
              src="/Ailestra/mockup.png"
              alt="About"
              width={384}
              height={384}
              className="rounded-2xl h-96 object-cover aspect-1"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-[#B80000] mb-2 pt-7">
              Ailestra Education
            </h1>
            <p className="text-base mb-2 text-gray-950">
              Ailestra Education was envisioned by Sir Abdul Samad Jamal, the
              visionary founder of ASJ-ERDC, with a mission to redefine the
              boundaries of learning. In a rapidly evolving world where
              technological advancements are reshaping every aspect of life,
              education stands at the forefront of change. Recognizing this,
              Ailestra Education is dedicated to fostering innovative skills and
              introducing modern teaching methods that prepare learners to excel
              in an ever-changing global landscape. The demand for
              forward-thinking education has never been greater, and Ailestra
              Education is committed to meeting this need with excellence and
              innovation.{" "}
            </p>
            <Link href={`/about`}>
              <button className="px-4 py-2 bg-[#16007E] text-white font-bold rounded-full text-sm">
                Learn More...
              </button>
            </Link>
          </div>
        </div>
      </section>

      <AilestraSection />

      <section className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid grid-rows-1 md:grid-rows-3 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#16007E] rounded-2xl p-4 text-white text-center flex flex-col justify-center items-center">
                <h3 className="text-4xl font-bold">1000+</h3>
                <p className="text-xl font-bold">students</p>
              </div>
              <div className="bg-[#16007E] rounded-2xl p-4 text-white text-center flex flex-col justify-center items-center">
                <h3 className="text-4xl font-bold">100+</h3>
                <p className="text-xl font-bold">teachers</p>
              </div>
            </div>
            <div className="bg-[#B80000] rounded-2xl mt-2 p-2 text-white row-span-2">
              <h3 className="text-3xl font-bold mb-1 text-center pt-2">
                Affiliated With
              </h3>
              <div className="grid grid-cols-2 gap-8 justify-center place-items-center pt-7 px-16">
                {["AKU.jpg", "CAIE.jpg", "ibdp.jpg", "SINDH.jpg"].map((src, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-white rounded-full overflow-hidden flex items-center justify-center"
                  >
                    <Image
                      src={`/affiliates/${src}`}
                      alt={`Image ${i + 1}`}
                      className="w-full h-full object-cover"
                      height={64}
                      width={64}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden col-span-2">
            <Embed />
          </div>
        </div>
      </section>

      <section className="bg-gray-300 py-12">
        <div className="max-w-7xl mx-auto bg-[#16007E] rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl shadow-black overflow-hidden relative">
          {/* Left Side Content */}
          <div className="text-white p-8 z-10 relative">
            <h2 className="text-2xl font-bold mb-4">
              For Questions,
              <br />
              Fill Out the Form
              <br />
              Or to Enroll,
            </h2>
            <Link href={`/StudentPortal/admission`}>
              <button className="bg-[#B80000] text-white font-bold rounded-full px-4 py-2 mt-4 hover:bg-[#900000] transition-colors duration-300">
                Admissions
              </button>
            </Link>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/15 rounded-full"></div>
              <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full"></div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <ContactForm />

          {/* Decorative Shapes */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full transform rotate-45 translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/8 rounded-full transform -rotate-45 -translate-x-1/4 translate-y-1/4"></div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
}
