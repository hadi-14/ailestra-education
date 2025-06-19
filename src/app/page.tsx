"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from "./components/contactForm";
import Image from "next/image";
import Link from "next/link";
import FAQSection from "./components/faq";

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
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const slideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.7 },
    exit: { opacity: 0 },
  };

  return (
    <section className="relative h-[15vh] lg:h-[400px]">
      <div className="h-1 md:h-2 bg-gradient-to-r from-[#86252E] to-[#0D0050]" />

      <div className="flex items-center justify-center h-full relative bg-[#004F89]/80">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              // width={1904}
              // height={400}
              fill
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 text-end h-full text-white mr-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-4"
          >
            {slides.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSlideChange(index)}
                className={`w-1.5 h-1.5 md:w-4 md:h-4 rounded-full cursor-pointer ${currentSlide === index ? "bg-white" : "bg-gray-400"
                  }`}
              ></motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="h-1 md:h-2 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>
    </section>
  );
}

const AutoFeatureSelector: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayDuration = 5000; // 5 seconds per feature
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
  }), []);

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setSelectedFeature((prev) => (prev + 1) % Object.keys(features).length);
      }, autoPlayDuration);
    };

    const pauseAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (isAutoPlaying) {
      startAutoPlay();

      const resumeTimer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, pauseDuration);

      return () => {
        pauseAutoPlay();
        clearTimeout(resumeTimer);
      };
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [features, isAutoPlaying, autoPlayDuration, pauseDuration]);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
    setIsAutoPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center max-w-xl mx-auto pt-2 md:p-4"
    >
      <div className="flex gap-2 md:gap-4 mb-4">
        {Object.keys(features).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFeature}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-[#16007E] mb-2">
            {Object.keys(features)[selectedFeature]}
          </h3>
          <p className="text-base text-gray-700">
            {Object.values(features)[selectedFeature]}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

function AilestraSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative bg-[#FF0000] overflow-hidden"
    >
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

        <div className="relative max-w-7xl lg:mx-auto bg-white rounded-lg p-6 mb-8 flex items-center mx-14">
          <Image
            src="/Ailestra/wing.png"
            alt="left wing"
            layout="intrinsic"
            width={250}
            height={250}
            className="transform -scale-x-100 pb-20 hidden lg:block"
            loading="lazy"
          />
          <div className="flex-1">
            <h2 className="text-3xl md:text-3xl font-bold text-[#B80000] mb-4 text-center">
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
            className="pb-20 hidden lg:block"
            loading="lazy"
          />
        </div>


        <div className="relative max-w-7xl text-white mb-8 mx-4 lg:mx-auto">
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
              <Link href={'/courses'} className="col-span-1 bg-[#16007E] rounded-lg p-3 m-2 justify-center">
                <button className="text-white font-bold w-full h-full">
                  See All
                </button>
              </Link>

            </div>
          </div>
        </div>

        <div className="relative max-w-7xl bg-white rounded-lg p-6 mx-4 lg:mx-auto">
          <h2 className="text-2xl font-bold text-[#B80000] mb-4">
            Meet Our Teachers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Image
                key={i}
                src={'/Thumbnails/math-lessons-youtube-thumbnail-template-desig-design-aa69e9e57e635e9eecb2579c80ded65d_screen.jpg'}
                alt={`Lecture ${i + 1}`}
                width={300}
                height={0}
                className="rounded-lg border-2 border-[#B80000]"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
    </motion.section>
  );
}

const Embed = () => {
  const [imageClicked, setImageClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative w-full pb-[56.25%]"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="absolute inset-0"
        onClick={() => setImageClicked(true)}
      >
        {!imageClicked ? (
          <>
            <Image
              src={`https://img.youtube.com/vi/pKqRNMwvb2Q/sddefault.jpg`}
              layout="fill"
              objectFit="cover"
              alt="YouTube thumbnail"
              className="rounded-lg"
              loading="lazy"
            />
            <div className="w-full h-full flex justify-center items-center">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="relative w-12 h-12 md:w-20 md:h-20"
              >
                <Image
                  src={`https://addplaybuttontoimage.way4info.net/Images/Icons/7.png`}
                  layout="fill"
                  alt="Play button"
                  priority
                />
              </motion.div>
            </div>
          </>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/pKqRNMwvb2Q?rel=0&showinfo=0&autoplay=1`}
            title="YouTube video"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          ></iframe>
        )}
      </motion.div>
    </motion.div>
  );
};

function StatsSection() {
  const stats = [
    { number: "1000+", label: "students" },
    { number: "100+", label: "teachers" }
  ];

  const affiliates = ["AKU.jpg", "CAIE.jpg", "SINDH.jpg", "FB Board.png", "ibdp.jpg"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="max-w-7xl py-6 lg:py-12 mx-4 lg:mx-auto overflow-hidden"
    >
      {/* Mobile Layout (< lg screens) */}
      <div className="lg:hidden space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">

          <div className="grid grid-rows-2 gap-4">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`bg-[#16007E] rounded-xl p-4 text-white text-center flex flex-col justify-center items-center`}
              >
                <h3 className="text-xl md:text-3xl font-bold">{item.number}</h3>
                <p className="text-lg font-bold">{item.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#B80000] rounded-xl p-4 text-white col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Affiliated Boards
            </h3>
            <div className="grid grid-cols-2 gap-12 gap-x-24 justify-center place-items-center px-16">
              {affiliates.slice(0, 4).map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={`/affiliates/${src}`}
                    alt={`Affiliate ${i + 1}`}
                    className="w-full h-full object-cover"
                    height={32}
                    width={32}
                    loading="lazy"
                  />
                </motion.div>
              ))}
              {(() => {
                const i = 4;
                const src = affiliates[i];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center absolute"
                  >
                    <Image
                      src={`/affiliates/${src}`}
                      alt={`Affiliate ${i + 1}`}
                      className="w-full h-full object-cover"
                      height={32}
                      width={32}
                      loading="lazy"
                    />
                  </motion.div>
                );
              })()}
            </div>
          </motion.div>
        </div>

        {/* Embed Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden  lg:h-96"
        >
          <Embed />
        </motion.div>

        {/* Affiliates Section */}
      </div>

      {/* Desktop Layout (lg+ screens) */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        <div className="grid grid-rows-3 gap-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#16007E] rounded-2xl p-4 text-white text-center flex flex-col justify-center items-center"
              >
                <h3 className="text-4xl font-bold">{item.number}</h3>
                <p className="text-xl font-bold">{item.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#B80000] rounded-2xl mt-2 p-2 text-white row-span-2"
          >
            <h3 className="text-3xl font-bold mb-1 text-center pt-2">
              Affiliated Boards
            </h3>
            <div className="grid grid-cols-2 gap-12 justify-center place-items-center pt-4 px-16">
              {affiliates.slice(0, 4).map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-white rounded-full overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={`/affiliates/${src}`}
                    alt={`Affiliate ${i + 1}`}
                    className="w-full h-full object-cover"
                    height={64}
                    width={64}
                  />
                </motion.div>
              ))}
              {(() => {
                const i = 4;
                const src = affiliates[i];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-white rounded-full overflow-hidden flex items-center justify-center absolute"
                  >
                    <Image
                      src={`/affiliates/${src}`}
                      alt={`Affiliate ${i + 1}`}
                      className="w-full h-full object-cover"
                      height={64}
                      width={64}
                    />
                  </motion.div>
                );
              })()}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden col-span-2"
        >
          <Embed />
        </motion.div>
      </div>
    </motion.section>
  );
}
export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full bg-white overflow-x-hidden"
    >
      <HeroSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto py-8 px-4"
      >

        <motion.div className="relative max-w-7xl lg:mx-auto bg-[#16007E] rounded-lg p-6 mb-8 flex items-center mx-14">
          <div className="flex-1">
            <h2 className="text-3xl md:text-3xl font-bold text-[#B80000] mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-base text-white text-center">
              At Ailestra Education, our mission is to empower learners with the
              skills and knowledge they need to thrive in a rapidly changing
              world. We are committed to fostering innovation, excellence, and
              inclusivity in education, ensuring that every student has the
              opportunity to reach their full potential.
            </p>
          </div>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <div className="relative md:h-96 md:w-96 h-[30vh] w-[30vh]">
              <Image
                src="/Ailestra/mockup.png"
                alt="About"
                fill
                className="rounded-2xl object-cover aspect-1"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#B80000] mb-2 pt-7">
              Ailestra Education
            </h1>
            <p className="text-sm md:text-base mb-2 text-gray-950">
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#16007E] text-white font-bold rounded-full text-sm"
              >
                Learn More...
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <AilestraSection />

      <StatsSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-300 py-12 overflow-hidden"
      >
        <div className="max-w-7xl bg-[#16007E] rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl shadow-black overflow-hidden relative mx-4 lg:mx-auto">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white p-8 z-10 relative"
          >
            <h2 className="text-2xl font-bold mb-4">
              For Questions,
              <br />
              Fill Out the Form
              <br />
              Or to Enroll,
            </h2>
            <Link href={`/student/admission`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#B80000] text-white font-bold rounded-full px-4 py-2 mt-4 hover:bg-[#900000] transition-colors duration-300"
              >
                Admissions
              </motion.button>
            </Link>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/15 rounded-full"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.10, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>

          {/* Decorative Shapes */}
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            whileInView={{ opacity: 0.2, rotate: 45, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full transform rotate-45 translate-x-1/4 -translate-y-1/4"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
            whileInView={{ opacity: 0.1, rotate: -45, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-white/8 rounded-full transform -rotate-45 -translate-x-1/4 translate-y-1/4"
          ></motion.div>
        </div>
      </motion.section>

      <FAQSection />
    </motion.div>
  );
}