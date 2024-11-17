"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function HeroSection() {
  const slides = [
    "/Slide Show/1.jpg",
    "/Slide Show/2.jpg",
    "/Slide Show/3.jpg"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[564px]">
      <div className="h-4 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>

      <div className="flex items-center justify-center h-full relative bg-[#004F89]/80">
        {/* Background Image */}
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="relative z-10 text-end h-full text-white">
          {/* <h1 className="text-6xl font-bold mb-8">Text Here (Slider {currentSlide + 1})</h1> */}

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 md:gap-8">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-6 h-6 rounded-full cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-4 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>
    </section>
  );
}

function AilestraSection() {
  // Array holding text for each feature
  const features = [
    "Feature 1 description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "Feature 2 description: Duis aute irure dolor in reprehenderit in voluptate...",
    "Feature 3 description: Excepteur sint occaecat cupidatat non proident...",
    "Feature 4 description: Sunt in culpa qui officia deserunt mollit anim id est laborum...",
    "Feature 5 description: Sed ut perspiciatis unde omnis iste natus error sit..."
  ];

  // State for selected feature
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <section className="relative bg-[#FF0000] py-16">
      {/* Background Image with Red Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}></div>
      <div className="absolute inset-0 bg-[#FF0000] opacity-60"></div>

      {/* Why Ailestra Section */}
      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-12 mb-16">
        <h2 className="text-4xl font-bold text-[#B80000] mb-8">Why Ailestra?</h2>
        <div className="flex gap-4 md:gap-8 mb-8">
          {/* Feature Icons */}
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              onClick={() => setSelectedFeature(i)}
              className={`w-10 h-10 md:w-20 md:h-20 rounded-lg cursor-pointer ${selectedFeature === i ? 'bg-[#16007E]' : 'bg-gray-300'
                }`}
            ></div>
          ))}
        </div>

        {/* Feature Details */}
        <h3 className="text-3xl font-bold text-[#16007E] mb-4">Feature {selectedFeature + 1}</h3>
        <p className="text-xl">
          {features[selectedFeature]}
        </p>
      </div>

      {/* Courses Section */}
      <div className="relative max-w-7xl mx-auto text-white mb-16">
        <h2 className="text-4xl font-bold mb-8">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam provident ipsam dignissimos ducimus nihil officiis laudantium quo, voluptate nam impedit cum sapiente fugit, quidem exercitationem eveniet itaque repudiandae porro! Recusandae.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 h-24"></div>
            ))}
            <button className="col-span-2 md:col-span-1 bg-[#16007E] text-white font-bold rounded-full px-8 py-4 m-5">
              See All
            </button>
          </div>
        </div>
      </div>

      {/* Lectures Section */}
      <div className="relative max-w-7xl mx-auto bg-white rounded-lg p-12">
        <h2 className="text-4xl font-bold text-[#B80000] mb-8">Recorded Lectures</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <img
              key={i}
              src={`/Thumbnails/240f1f0d-d49f-48c2-9a67-57bb83383ff4_1024.jpg`}
              alt={`Lecture ${i + 1}`}
              className="rounded-lg border-3 border-[#B80000]"
            />
          ))}
        </div>
        <div className="flex justify-end">
          <button className="bg-[#B80000] text-white font-bold rounded-full px-8 py-4">
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
      {/* Navbar */}
      <nav className="relative h-24 bg-[#DADADA] shadow-lg rounded-t-lg overflow-hidden">
        <div className="flex items-center justify-between px-8">
          {/* Logo */}
          <div className="flex items-center p-2.5">
            <img src="/logo.png" alt="Top Grey Logo" className="h-16" />
            <img src="/logo - text.png" alt="Text Logo" className="h-14 ml-2" />
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-4 md:gap-8">
            <a href="#" className="text-gray-600 font-bold">About</a>
            <a href="#" className="text-gray-600 font-bold">Courses & Curriculum</a>
            <a href="#" className="text-gray-600 font-bold">Announcements</a>
            <Link href={`/StudentPortal/admission`}>
              <button className="px-6 py-3 bg-[#16007E] text-white font-bold rounded-lg">
                Admission
              </button>
            </Link>
            <Link href={`/StudentPortal`}>

              <button className="px-6 py-3 bg-[#177A05] text-white font-bold rounded-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Container */}
          <div className="flex items-center justify-center">
            <img src="/mockup.png" alt="About" className="rounded-3xl h-96 object-cover aspect-1" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-[#B80000] mb-4">About Ailestra</h2>
            <p className="text-xl mb-4 text-gray-950">
              Ailestra Education was envisioned by Sir Abdul Samad Jamal, the founder of ASJ-ERDC, which oversees several educational initiatives, including Habibian’s Academy, Blooms’ Schooling System, and ASJ-Cradle of Wisdom. As technological advancements continue to reshape the educational landscape, the demand for innovative skills and modern teaching methods has never been greater. Recognizing this need, Ailestra Education emerges as a pioneering venture that integrates cutting-edge teaching approaches and offers advanced courses designed to empower the younger generation by unlocking their true potential and master the skills necessary to thrive in a rapidly evolving world.
            </p>
            <button className="px-6 py-3 bg-[#16007E] text-white font-bold rounded-full">
              Learn More...
            </button>
          </div>
        </div>
      </section>


      <AilestraSection />

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto py-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className='grid grid-rows-1 md:grid-rows-2 gap-8 col-span-2'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#16007E] rounded-3xl p-8 text-white text-center">
                <h3 className="text-6xl font-bold">1000+</h3>
                <p className="text-4xl font-bold">students</p>
              </div>
              <div className="bg-[#16007E] rounded-3xl p-8 text-white text-center">
                <h3 className="text-6xl font-bold">100+</h3>
                <p className="text-4xl font-bold">teachers</p>
              </div>
            </div>
            <div className="bg-[#B80000] rounded-3xl mt-4 p-4 text-white">
              <h3 className="text-4xl font-bold mb-1">Affiliated With</h3>
              <div className="flex justify-center gap-8">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-300 rounded-3xl">
            <img src="/cropped-free-bible-study-2-1.jpg" alt="Results" className="w-full mb-4 rounded-3xl" />
            <h3 className="text-4xl font-bold text-center text-gray-950">2024 Results</h3>
          </div>
        </div>

      </section>

      {/* Contact Form */}
      <section className="bg-gray-300 py-24">
        <div className="max-w-7xl mx-auto bg-[#16007E] rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-16 shadow-2xl shadow-black">
          <div className="text-white p-16">
            <h2 className="text-4xl font-bold mb-8">
              For Questions,<br />
              Fill Out the Form<br />
              <br />
              Or to Enroll,
            </h2>
            <button className="bg-[#B80000] text-white font-bold rounded-full px-8 py-4 mt-8">
              Admissions
            </button>
          </div>

          <div className='bg-[#D9D9D9] p-16 rounded-r-3xl'>
            <h3 className="text-4xl font-bold text-[#B80000] mb-8 text-center">Questions</h3>
            <input className="w-full mb-6 px-4 py-3 text-white rounded-lg" placeholder="Full Name" />
            <input className="w-full mb-6 px-4 py-3 text-white rounded-lg" placeholder="Contact Number" />
            <input className="w-full mb-6 px-4 py-3 text-white rounded-lg" placeholder="Email" />
            <textarea className="w-full mb-6 px-4 py-3 text-white rounded-lg" placeholder="Question"></textarea>
            <button className="w-full bg-[#B80000] text-white font-bold rounded-full py-4">Submit</button>
          </div>
        </div>
      </section>
    </div>
  );
}
