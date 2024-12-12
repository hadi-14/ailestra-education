"use client";
import React, { useState, useEffect } from 'react';
import NavBarMain from './components/header';
import Image from 'next/image'
// import { motion, AnimatePresence } from 'framer-motion';

function HeroSection() {
  const slides = [
    "/Slide Show/1.png",
    "/Slide Show/2.png",
    "/Slide Show/3.png"
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
                className={`w-4 h-4 rounded-full cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>
    </section>
  );
}

function AilestraSection() {
  const features = {
    'Innovative Curriculum': "Our cutting-edge curriculum integrates modern teaching methodologies and technological advancements to prepare learners for the future.",
    'Experienced Faculty': "Learn from highly qualified educators who are passionate about fostering excellence and innovation in education.",
    'Comprehensive Programs': "From academic excellence to practical skills, we offer a diverse range of programs tailored to meet every learner’s needs.",
    'Personalized Learning': "With a focus on individual growth, our personalized approach ensures every student achieves their full potential.",
    'Global Perspectives': "We emphasize international standards and a global outlook, equipping students to thrive in a connected world."
  };


  const [selectedFeature, setSelectedFeature] = useState(0);

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

      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#B80000] mb-4">Why Ailestra?</h2>
        <div className="flex gap-2 md:gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              onClick={() => setSelectedFeature(i)}
              className={`w-8 h-8 md:w-12 md:h-12 rounded-full cursor-pointer ${selectedFeature === i ? 'bg-[#16007E]' : 'bg-gray-300'} flex items-center justify-center`}
            >
              <h2 className={`${selectedFeature === i ? 'text-white' : 'text-gray-800'} font-bold text-3xl text-center`}>{i + 1}</h2>

            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-[#16007E] mb-2">{Object.keys(features)[selectedFeature]}</h3>
        <p className="text-base">
          {Object.values(features)[selectedFeature]}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-base">
            Our diverse courses cater to every stage of learning, offering academic programs like KBSE, AKU-EB, CAIE O/A Level, IGCSE, and IB, alongside English Language Programs for communication and writing skills. Enhance your tech proficiency with ICT and programming courses, including Python, robotics, and advanced tools. Unleash creativity through practical skills in graphic design, digital marketing, photography, event planning, and more, ensuring you gain the expertise needed for academic and professional success.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['Foundation Program', 'English Language Programs', 'ICT Programs', 'Practical Skills', 'Programming'].map((course, i) => (
              <div key={i} className="bg-white rounded-lg p-3 h-16 flex items-center justify-center bg-white/20">
                <p className="text-white text-center font-bold">
                  {course}
                </p>
              </div>
            ))}
            <button className="col-span-2 md:col-span-1 bg-[#16007E] text-white font-bold rounded-lg p-3 m-2">
              See All
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#B80000] mb-4">Recorded Lectures</h2>
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
        <div className="flex justify-end">
          <button className="bg-[#B80000] text-white font-bold rounded-full px-4 py-2">
            See All
          </button>
        </div>
      </div>
    </section>
  );
}

const embedID = "pKqRNMwvb2Q";

const Embed = () => {
  const [imageClicked, setImageClicked] = useState(false);

  return (
    <div className="relative w-full pb-[56.25%]"> {/* Aspect ratio 16:9 */}
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
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};



export default function LandingPage() {
  return (
    <div className="relative w-full bg-white">
      <NavBarMain />
      <HeroSection />

      <section className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <Image
              src="/mockup.png"
              alt="About"
              width={384}
              height={384}
              className="rounded-2xl h-96 object-cover aspect-1"
              priority
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-[#B80000] mb-2 pt-7">About Ailestra</h2>
            <p className="text-base mb-2 text-gray-950">
              Ailestra Education was envisioned by Sir Abdul Samad Jamal, the visionary founder of ASJ-ERDC, with a mission to redefine the boundaries of learning. In a rapidly evolving world where technological advancements are reshaping every aspect of life, education stands at the forefront of change. Recognizing this, Ailestra Education is dedicated to fostering innovative skills and introducing modern teaching methods that prepare learners to excel in an ever-changing global landscape. The demand for forward-thinking education has never been greater, and Ailestra Education is committed to meeting this need with excellence and innovation.            </p>
            <button className="px-4 py-2 bg-[#16007E] text-white font-bold rounded-full text-sm">
              Learn More...
            </button>
          </div>
        </div>
      </section>

      <AilestraSection />

      <section className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className='grid grid-rows-1 md:grid-rows-2 gap-4'>
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
            <div className="bg-[#B80000] rounded-2xl mt-2 p-2 text-white">
              <h3 className="text-2xl font-bold mb-1 text-center">Affiliated With</h3>
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-white rounded-full"></div>
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
        <div className="max-w-7xl mx-auto bg-[#16007E] rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl shadow-black">
          <div className="text-white p-8">
            <h2 className="text-2xl font-bold mb-4">
              For Questions,<br />
              Fill Out the Form<br />
              Or to Enroll,
            </h2>
            <button className="bg-[#B80000] text-white font-bold rounded-full px-4 py-2 mt-4">
              Admissions
            </button>
          </div>

          <div className='bg-[#D9D9D9] p-8 rounded-r-2xl'>
            <h3 className="text-2xl font-bold text-[#B80000] mb-4 text-center">Questions</h3>
            <input className="w-full mb-4 px-2 py-2 text-black rounded-lg" placeholder="Full Name" />
            <input className="w-full mb-4 px-2 py-2 text-black rounded-lg" placeholder="Contact Number" />
            <input className="w-full mb-4 px-2 py-2 text-black rounded-lg" placeholder="Email" />
            <textarea className="w-full mb-4 px-2 py-2 text-black rounded-lg" placeholder="Question"></textarea>
            <button className="w-full bg-[#B80000] text-white font-bold rounded-full py-2">Submit</button>
          </div>
        </div>
      </section>
    </div>
  );
}