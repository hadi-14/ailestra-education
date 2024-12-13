'use client';
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection () {
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
        answer: "Enrollment is easy! Simply visit our website, choose the desired program, and follow the registration process. For further assistance, feel free to contact us at [email] or through our support chat."
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
      <section className="bg-gray-300 py-12">
        <div className="max-w-7xl mx-auto bg-[#16007E] rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl shadow-black overflow-hidden relative p-8">
          {/* Left Side - FAQ Title and Description */}
          <div className="text-white z-10 relative flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="text-gray-200 mb-4">
              Find quick answers to common queries about our institution,
              programs, and student life.
            </p>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/20 rounded-full"></div>
            </div>
          </div>
  
          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg overflow-hidden"
              >
                <div
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <h3 className="text-white font-semibold">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-white" />
                  ) : (
                    <ChevronDown className="text-white" />
                  )}
                </div>
                {openIndex === index && (
                  <div className="p-4 pt-0 text-white/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
  
          {/* Decorative Shapes */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full transform rotate-45 translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -rotate-45 -translate-x-1/4 translate-y-1/4"></div>
        </div>
      </section>
    );
  };