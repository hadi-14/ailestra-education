import React from 'react';
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
        <div className="w-full rounded-xl border border-stone-300 bg-gray-200 p-4">
            <h3 className="text-red-700 text-xl font-bold font-inter mb-4">
                {title}
            </h3>
            <div className={`grid grid-cols-${subheadings.length} gap-2`}>
                {subheadings.map((subheading, index) => (
                    <div key={index} className="space-y-2">
                        <h4 className="text-neutral-800 text-base font-semibold mb-2">
                            {subheading.title}
                        </h4>
                        <ul className="list-disc list-inside">
                            {subheading.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="text-sm">
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function CoursesPage() {
    return (
        <div className="min-h-screen bg-white">
            <NavBarMain />

            {/* Hero Section */}
            <div
                className="relative h-48 mb-4"
                style={{ backgroundImage: "url('/background.png')" }}
            >
                <div className="w-full h-full bg-[#A30000] opacity-80" />

                <div className="absolute left-1/4 transform -translate-x-1/2 bottom-[-1.5rem]">
                    <div className="bg-gray-200 rounded-xl border border-stone-300 px-6 py-4">
                        <h1 className="text-violet-950 text-4xl font-bold">Courses & Curriculum</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {coursesData.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            subheadings={course.subheadings}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}