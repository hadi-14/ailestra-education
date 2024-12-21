"use client";

import React from 'react';
import { motion } from 'framer-motion';
import NavBarMain from '../components/header';

type SubheadingItem = {
    title: string;
    topics: string[];
};

type CourseCardProps = {
    title: string;
    subheadings: SubheadingItem[];
};

const coursesData: CourseCardProps[] = [
    {
        title: "High School Program",
        subheadings: [
            {
                title: "All Programmes",
                topics: [
                    "KBSE	(SSC - HSSC)",
                    "AKU-EB (SSC - HSSC)",
                    "CAIE O / A Level",
                    "IGCSE",
                    "Pearson Edexcel",
                    "International Baccalaureate"
                ]
            },
        ]
    },
    {
        title: "English Language Programs",
        subheadings: [
            {
                title: "Foundation ",
                topics: [
                    "Level 1: RWSL (Reading, Writing, Speaking, Listening)",
                    "Level 2: Conversation",
                    "Level 3: Interview"
                ]
            },
            {
                title: "Advanced",
                topics: [
                    "Level 1: Academic Writing",
                    "Level 2: Public Speaking",
                    "Level 3: Business Correspondence",
                    "IELTS",
                    "TOEFL"
                ]
            },
        ]
    },
    {
        title: "ICT Programs",
        subheadings: [
            {
                title: "Foundation & Advance",
                topics: [
                    "Operating System (Microsoft Windows)",
                    "Ms-Office (Basic Skills)",
                    "Ms-Office (Advance)",
                    "Internet surfing",
                    "Internet Tools (Google Apps)",
                    "Chatbots (Chat GPT 3 - 4)"
                ]
            },
            {
                title: "Programming",
                topics: [
                    "Scratch",
                    "Python",
                    "Game Development",
                    "Website Development",
                    "Data Science",
                    "Robotics",
                ]
            }
        ]
    },
    {
        title: "Practical skills ",
        subheadings: [
            {
                title: "All Programmes",
                topics: [
                    "Art and Craft",
                    "Fashion Designing",
                    "Sewing and Tailoring",
                    "Graphic Designing",
                    "Digital Marketing",
                    "Social Media Management",
                    "Content Writing and Blogging",
                    "Photography and V-logging ",
                    "Event Planning",
                    "Cooking and Baking",
                    "Gardening and Organic Farming",
                    "Carpentry and Woodworking",
                    "Handicraft",
                ]
            }
        ]
    }
];

const CourseCard: React.FC<CourseCardProps> = ({ title, subheadings }) => {
    return (
        <motion.div 
            className="w-full rounded-xl border border-stone-300 bg-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.025 }}
        >
            <motion.h3 
                className="text-red-700 text-xl font-bold font-inter mb-4"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {title}
            </motion.h3>
            <div className={`grid grid-cols-${subheadings.length} gap-2`}>
                {subheadings.map((subheading, index) => (
                    <motion.div 
                        key={index} 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-neutral-800 text-base font-semibold mb-2">
                            {subheading.title}
                        </h4>
                        <ul className="list-disc list-inside">
                            {subheading.topics.map((topic, topicIndex) => (
                                <motion.li 
                                    key={topicIndex} 
                                    className="text-sm"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        delay: index * 0.2 + topicIndex * 0.1, 
                                        duration: 0.3 
                                    }}
                                    viewport={{ once: true }}
                                >
                                    {topic}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default function CoursesPage() {
    return (
        <motion.div 
            className="min-h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <NavBarMain />

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
                        <motion.h1 
                            className="text-violet-950 text-xl md:text-4xl font-bold"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Courses & Curriculum
                        </motion.h1>
                    </div>
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
                className="container mx-auto px-4 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {coursesData.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            subheadings={course.subheadings}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}