import React from 'react';
import NavBarMain from '../components/header';

type SectionProps = {
    title: string;
    content: string;
    className?: string;
};

const aboutContent = {
    intro: "Ailestra Education was envisioned by Sir Abdul Samad Jamal, the founder of ASJ-ERDC, which oversees several educational initiatives, including Habibian’s Academy, Blooms’ Schooling System, and ASJ-Cradle of Wisdom. As technological advancements continue to reshape the educational landscape, the demand for innovative skills and modern teaching methods has never been greater. Recognizing this need, Ailestra Education emerges as a pioneering venture that integrates cutting-edge teaching approaches and offers advanced courses designed to empower the younger generation by unlocking their true potential and master the skills necessary to thrive in a rapidly evolving world.",
    vision: "To lead the way in innovative education, empowering underserved learners with the skills and knowledge to succeed. By fostering lifelong learning, we aim to bridge educational gaps, progressively reaching communities all around the globe, ensuring individuals are equipped to thrive in a rapidly evolving world.",
    mission: "The concept of Ailestra Education was born out of the challenges posed by the COVID-19 pandemic, which lasted over a year and severely disrupted traditional eduMissioncational methods. In 2020, as schools and universities faced unprecedented closures, there was an urgent need to explore innovative ways to teach and learn. During this time, we launched the Flashback Program for AKU-EB students in 2021, just months before their final exams. This initiative aimed to help students revisit the entire course outline while adapting to the newly rationalized syllabus and shortened examination format through concise online sessions.",
    history: 'The concept of Ailestra Education was born out of the challenges posed by the COVID-19 pandemic, which lasted over a year and severely disrupted traditional educational methods. In 2020, as schools and universities faced unprecedented closures, there was an urgent need to explore innovative ways to teach and learn. During this time, we launched the Flashback Program for AKU-EB students in 2021, just months before their final exams. This initiative aimed to help students revisit the entire course outline while adapting to the newly rationalized syllabus and shortened examination format through concise online sessions.\n\nRecognizing the importance of a blended approach, we transitioned to a hybrid model that combined live online sessions with in-person classes. This new format was designed to enhance accessibility and engagement, enabling students to benefit from both virtual and physical learning environments. Classes were broadcast from three different venues, ensuring that all learners had the opportunity to participate, regardless of their circumstances. A dedicated team of teachers and facilitators was assembled under the banner of ASJ-Cradle of Wisdom, later focusing solely on providing face-to-face support to students.\n\nIn 2024, this hybrid learning initiative was officially renamed "Ailestra Education," reflecting our commitment to delivering quality education in an evolving landscape. Ailestra Education aims to equip students with the skills and knowledge necessary for success in an increasingly complex world. By embracing innovative teaching methods and prioritizing accessibility, we strive to empower the next generation to reach their full potential and navigate the challenges of the future with confidence.'
};

const ContentSection: React.FC<SectionProps> = ({ title, content, className = "" }) => {
    return (
        <div className={`w-full rounded-xl border border-stone-300 bg-gray-200 p-4 ${className}`}>
            <h2 className="text-red-700 text-2xl font-bold font-inter text-center mb-4">{title}</h2>
            <p className="text-neutral-800 text-base font-normal font-inter text-center">
                {content}
            </p>
        </div>
    );
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <NavBarMain />

            {/* Hero Section */}
            <div className="relative h-48 mb-4" style={{ backgroundImage: "url('/background.png')" }}>
                <div className="w-full h-full bg-[#A30000] opacity-60" />

                <div className="absolute left-1/4 transform -translate-x-1/2 bottom-[-1.5rem]">
                    <div className="bg-gray-200 rounded-xl border border-stone-300 px-6 py-4">
                        <h1 className="text-violet-950 text-4xl font-bold font-inter">About Ailestra</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <img src="/mockup.png" alt="About" className="rounded-xl h-72 object-cover aspect-1 w-full" />
                    <div className="flex items-center">
                        <p className="text-neutral-800 text-base font-normal font-inter">
                            {aboutContent.intro}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-rows-2 gap-4">
                        <ContentSection title="Vision" content={aboutContent.vision} />
                        <ContentSection
                            title="Mission"
                            content={aboutContent.mission}
                            className="mb-8"
                        />
                    </div>
                    <div className={`w-full rounded-xl p-4`}>
                        <h2 className="text-red-700 text-2xl font-bold font-inter text-center mb-4">History</h2>
                        <p className="text-neutral-800 text-base font-normal font-inter text-center">
                            {aboutContent.history}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};
