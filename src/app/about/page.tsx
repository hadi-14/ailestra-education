"use client";

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import FAQSection from '../components/faq';

type SectionProps = {
    title: string;
    content: string;
    className?: string;
};

const aboutContent = {
    intro: "Ailestra Education was envisioned by Sir Abdul Samad Jamal, the founder of ASJ-ERDC, which oversees several educational initiatives, including Habibian's Academy, Blooms' Schooling System, and ASJ-Cradle of Wisdom. As technological advancements continue to reshape the educational landscape, the demand for innovative skills and modern teaching methods has never been greater. Recognizing this need, Ailestra Education emerges as a pioneering venture that integrates cutting-edge teaching approaches and offers advanced courses designed to empower the younger generation by unlocking their true potential and master the skills necessary to thrive in a rapidly evolving world.",
    vision: "To lead the way in innovative education, empowering underserved learners with the skills and knowledge to succeed. By fostering lifelong learning, we aim to bridge educational gaps, progressively reaching communities all around the globe, ensuring individuals are equipped to thrive in a rapidly evolving world.",
    mission: "The concept of Ailestra Education was born out of the challenges posed by the COVID-19 pandemic, which lasted over a year and severely disrupted traditional educational methods. In 2020, as schools and universities faced unprecedented closures, there was an urgent need to explore innovative ways to teach and learn. During this time, we launched the Flashback Program for AKU-EB students in 2021, just months before their final exams. This initiative aimed to help students revisit the entire course outline while adapting to the newly rationalized syllabus and shortened examination format through concise online sessions.",
    history: 'The concept of Ailestra Education was born out of the challenges posed by the COVID-19 pandemic, which lasted over a year and severely disrupted traditional educational methods. In 2020, as schools and universities faced unprecedented closures, there was an urgent need to explore innovative ways to teach and learn. During this time, we launched the Flashback Program for AKU-EB students in 2021, just months before their final exams. This initiative aimed to help students revisit the entire course outline while adapting to the newly rationalized syllabus and shortened examination format through concise online sessions.\n\nRecognizing the importance of a blended approach, we transitioned to a hybrid model that combined live online sessions with in-person classes. This new format was designed to enhance accessibility and engagement, enabling students to benefit from both virtual and physical learning environments. Classes were broadcast from three different venues, ensuring that all learners had the opportunity to participate, regardless of their circumstances. A dedicated team of teachers and facilitators was assembled under the banner of ASJ-Cradle of Wisdom, later focusing solely on providing face-to-face support to students.\n\nIn 2024, this hybrid learning initiative was officially renamed "Ailestra Education," reflecting our commitment to delivering quality education in an evolving landscape. Ailestra Education aims to equip students with the skills and knowledge necessary for success in an increasingly complex world. By embracing innovative teaching methods and prioritizing accessibility, we strive to empower the next generation to reach their full potential and navigate the challenges of the future with confidence.'
};

const ContentSection: React.FC<SectionProps> = ({ title, content, className = "" }) => {
    return (
        <motion.div 
            className={`w-full rounded-xl border border-stone-300 bg-gray-200 p-4 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <motion.h2 
                className="text-red-700 text-2xl font-bold font-inter text-center mb-4"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {title}
            </motion.h2>
            <p className="text-neutral-800 text-base font-normal font-inter text-center">
                {content}
            </p>
        </motion.div>
    );
};

export default function AboutPage() {
    const pageVariants = {
        initial: { opacity: 0, x: -100 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: 100 }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    return (
        <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen bg-white"
        >
            {/* Hero Section */}
            <motion.div 
                className="relative h-48 mb-4" 
                style={{ backgroundImage: "url('/top_header_bg.jpg')" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                <div className="w-full h-full bg-[#FF0000] opacity-60" />

                <motion.div 
                    className="absolute left-1/4 transform -translate-x-1/2 bottom-[-1.5rem]"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="bg-gray-200 rounded-xl border border-stone-300 px-6 py-4">
                        <h1 className="text-violet-950 text-xl md:text-4xl font-bold">
                            About Ailestra
                        </h1>
                    </div>
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/Ailestra/mockup.jpg" 
                            alt="About"
                            className="rounded-xl h-72 object-cover aspect-1 w-full hover:scale-105 transition-transform duration-300"
                            height={576} 
                            width={576}
                            style={{ transformOrigin: 'center' }}
                        />
                    </motion.div>
                    <motion.div 
                        className="flex items-center"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-neutral-800 text-base font-normal font-inter">
                            {aboutContent.intro}
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="flex flex-col gap-8"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <ContentSection 
                            className='mt-16' 
                            title="Vision" 
                            content={aboutContent.vision} 
                        />
                        <ContentSection
                            title="Mission"
                            content={aboutContent.mission}
                            className="mb-8"
                        />
                    </motion.div>
                    <motion.div 
                        className={`w-full rounded-xl p-4`}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-red-700 text-2xl font-bold font-inter text-center mb-4">
                            History
                        </h2>
                        <p className="text-neutral-800 text-base font-normal font-inter text-center">
                            {aboutContent.history}
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <FAQSection />
        </motion.div>
    );
};