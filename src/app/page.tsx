"use client";
import React, { useState, useEffect } from 'react';
import NavBarMain from './components/header';

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
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
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
  const features = [
    "Feature 1 description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "Feature 2 description: Duis aute irure dolor in reprehenderit in voluptate...",
    "Feature 3 description: Excepteur sint occaecat cupidatat non proident...",
    "Feature 4 description: Sunt in culpa qui officia deserunt mollit anim id est laborum...",
    "Feature 5 description: Sed ut perspiciatis unde omnis iste natus error sit..."
  ];

  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <section className="relative bg-[#FF0000] py-8">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}></div>
      <div className="absolute inset-0 bg-[#FF0000] opacity-60"></div>

      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#B80000] mb-4">Why Ailestra?</h2>
        <div className="flex gap-2 md:gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              onClick={() => setSelectedFeature(i)}
              className={`w-8 h-8 md:w-12 md:h-12 rounded-lg cursor-pointer ${selectedFeature === i ? 'bg-[#16007E]' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-[#16007E] mb-2">Feature {selectedFeature + 1}</h3>
        <p className="text-base">
          {features[selectedFeature]}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam provident ipsam dignissimos ducimus nihil officiis laudantium quo.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-3 h-16"></div>
            ))}
            <button className="col-span-2 md:col-span-1 bg-[#16007E] text-white font-bold rounded-full px-4 py-2 m-2">
              See All
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#B80000] mb-4">Recorded Lectures</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <img
              key={i}
              src={`/Thumbnails/240f1f0d-d49f-48c2-9a67-57bb83383ff4_1024.jpg`}
              alt={`Lecture ${i + 1}`}
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

export default function LandingPage() {
  return (
    <div className="relative w-full bg-white">
      <NavBarMain />
      <HeroSection />

      <section className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <img src="/mockup.png" alt="About" className="rounded-2xl h-64 object-cover aspect-1" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#B80000] mb-2">About Ailestra</h2>
            <p className="text-base mb-2 text-gray-950">
              Ailestra Education was envisioned by Sir Abdul Samad Jamal, the founder of ASJ-ERDC. As technological advancements continue to reshape the educational landscape, the demand for innovative skills and modern teaching methods has never been greater.
            </p>
            <button className="px-4 py-2 bg-[#16007E] text-white font-bold rounded-full text-sm">
              Learn More...
            </button>
          </div>
        </div>
      </section>

      <AilestraSection />

      <section className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className='grid grid-rows-1 md:grid-rows-2 gap-4 col-span-2'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#16007E] rounded-2xl p-4 text-white text-center">
                <h3 className="text-4xl font-bold">1000+</h3>
                <p className="text-xl font-bold">students</p>
              </div>
              <div className="bg-[#16007E] rounded-2xl p-4 text-white text-center">
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
          <div className="bg-gray-300 rounded-2xl">
            <img src="/cropped-free-bible-study-2-1.jpg" alt="Results" className="w-full mb-2 rounded-2xl" />
            <h3 className="text-2xl font-bold text-center text-gray-950">2024 Results</h3>
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