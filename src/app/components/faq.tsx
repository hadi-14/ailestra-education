'use client';
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What programs does Ailestra Education offer?",
      answer: "Ailestra Education provides a variety of programs including Foundation, Middle School, High School, English Language, ICT, Programming, and Practical Skills courses tailored to different learning needs."
    },
    {
      question: "Who are the instructors at Ailestra Education?",
      answer: "Our instructors are highly experienced professionals with expertise in their respective fields, ensuring quality education and personalized support for every student."
    },
    {
      question: "How can I enroll in a course at Ailestra Education?",
      answer: "Enrollment is easy! Simply visit our website, choose the desired program, and follow the registration process. For further assistance, feel free to contact us at graphode2288@gmail.com or through our support chat."
    },
    {
      question: "What sets Ailestra Education apart from other institutions?",
      answer: "Ailestra Education stands out with its innovative curriculum, experienced faculty, and a personalized approach to learning, ensuring a comprehensive and engaging educational experience."
    },
    {
      question: "Are there any certification programs offered?",
      answer: "Yes, we offer various certification programs, including IELTS, TOEFL, and industry-recognized certificates in ICT, Programming, and Practical Skills, helping students gain valuable qualifications for their future careers."
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-300 py-6 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto bg-[#16007E] rounded-lg md:rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-xl shadow-black overflow-hidden relative p-4 md:p-8">
        {/* Left Side - FAQ Title and Description */}
        <div className="text-white z-10 relative flex flex-col justify-center space-y-4 md:space-y-6">
          <div 
            className="opacity-0 animate-[fadeSlideIn_0.6s_ease-out_forwards]"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-200 opacity-0 animate-[fadeSlideIn_0.6s_0.2s_ease-out_forwards]">
            Find quick answers to common queries about our institution,
            programs, and student life.
          </p>
          
          {/* Animated decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-50px] left-[-50px] w-32 md:w-48 h-32 md:h-48 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-48 md:w-64 h-48 md:h-64 bg-white/20 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Right Side - FAQ Accordion */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              // style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div
                className="bg-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-3 md:p-4 cursor-pointer text-left"
                >
                  <h3 className="text-white font-semibold text-sm md:text-base pr-4">{faq.question}</h3>
                  <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="text-white w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="p-3 md:p-4 pt-0 text-white/80 text-sm md:text-base">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated decorative shapes */}
        <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-white/10 rounded-full transform rotate-45 translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full transform -rotate-45 -translate-x-1/4 translate-y-1/4 animate-pulse delay-500"></div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}