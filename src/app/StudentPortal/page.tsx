'use client';
import Image from 'next/image'
// import Link from 'next/link'
import { useState, useRef } from 'react';

interface Assignment {
  title: string;
  dueDate: string;
}

interface Event {
  title: string;
  time: string;
  teacher?: string;
  isExam?: boolean;
}

interface Exam {
  title: string;
  status: 'upcoming' | 'scheduled' | 'completed';
  description?: string;
}

export default function DashboardPage() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const assignments: Assignment[] = [
    { title: "Mathematics HW", dueDate: "11.8.24" },
    { title: "Mathematics HW", dueDate: "11.8.24" },
    { title: "Mathematics HW", dueDate: "11.8.24" },
    { title: "Mathematics HW", dueDate: "11.8.24" }
  ];

  const todayEvents: Event[] = [
    { title: "Mathematics Class", time: "8:00 am", teacher: "Sir ASJ" },
    { title: "Physics Exam", time: "9:00 am", isExam: true },
    { title: "English Class", time: "10:00 am", teacher: "Sir ASJ" },
    { title: "Chemistry Class", time: "11:00 am", teacher: "Sir ASJ" },
    { title: "Biology Class", time: "12:00 pm", teacher: "Sir ASJ" },
    { title: "Quran Class", time: "1:00 pm", teacher: "Sir ASJ" }
  ];

  const upcomingClasses = [
    { id: 1, name: 'Class 1', time: 'Monday 8:00 am' },
    { id: 2, name: 'Class 2', time: 'Monday 9:00 am' },
    { id: 3, name: 'Class 3', time: 'Monday 10:00 am' },
    { id: 4, name: 'Class 4', time: 'Monday 11:00 am' },
    { id: 5, name: 'Class 5', time: 'Monday 12:00 pm' },
    { id: 6, name: 'Class 6', time: 'Monday 1:00 pm' },
  ];

  const exams: Exam[] = [
    { title: "Terminal Exams", status: "upcoming", description: "Syllabus & Schedule Announced Soon" },
    { title: "October Monthly", status: "scheduled" },
    { title: "September Monthly", status: "completed" },
    { title: "August Monthly", status: "completed" }
  ];

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(scrolled);
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    
    const trackRect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientY - trackRect.top) / trackRect.height;
    
    const scrollHeight = contentRef.current.scrollHeight;
    const containerHeight = contentRef.current.clientHeight;
    const maxScroll = scrollHeight - containerHeight;
    
    contentRef.current.scrollTop = maxScroll * clickPosition;
  };



  return (
    <div className="relative w-full bg-white">
      {/* Gradient Border */}
      <div className="h-4 bg-gradient-to-r from-[#86252E] to-[#0D0050]"></div>

      {/* Hero Section */}
      <section className="relative bg-[#FF0000] py-12">
        {/* Background Image with Red Overlay */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}></div>
        <div className="absolute inset-0 bg-[#FF0000] opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Welcome Card */}
            <div className="md:col-span-1">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 p-6">
                Welcome<br />Student Name
              </h1>
              <div className="bg-[#D9D9D9] rounded-3xl p-6">
                <h2 className="text-gray-950 text-xl font-bold mb-4">Upcoming Classes</h2>
                <div className="relative flex gap-4 h-24">
                  {/* Custom Scrollbar Track */}
                  <div 
                    className="relative w-1 cursor-pointer"
                    onClick={handleTrackClick}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-950 to-gray-50 rounded-xl" />
                    <div 
                      className="absolute w-2 h-2 -left-[2px] bg-gray-950 rounded-full transition-all duration-150"
                      style={{ top: `${scrollPercentage}%` }}
                    />
                  </div>

                  {/* Scrollable Content */}
                  <div 
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="flex-1 max-h-48 overflow-y-auto scroll-smooth no-scrollbar"
                  >
                    <div className="text-gray-950">
                      {upcomingClasses.map((classItem) => (
                        <div
                          key={classItem.id}
                          className="p-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                          {classItem.name} {classItem.time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            {/* Attendance Card */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-[#D9D9D9] rounded-3xl p-6 text-gray-950">
                <h2 className="text-xl font-bold mb-4">This Month Attendance</h2>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-5xl font-light">9/10</span>
                  <span className="text-xl font-bold">Days</span>
                </div>
              </div>

              {/* Current Event Card */}
              <div className="bg-[#D9D9D9] rounded-3xl p-6 text-gray-950">
                <h2 className="text-xl font-bold mb-4">Current Event</h2>
                <p className="font-semibold mb-4">Mathematics Class 8:00 am</p>
                <button className="w-full bg-[#16007E] text-white rounded-full py-4 font-bold">
                  Join Now
                </button>
              </div>
            </div>

            {/* Timetable Card */}
            <div className="md:col-span-1 text-gray-950">
              <div className="bg-[#D9D9D9] rounded-3xl p-12">
                <h2 className="text-xl font-bold text-center mb-4">Your TimeTable</h2>
                <Image
                  src="/timetable.svg"
                  alt="Calendar"
                  width={544}
                  height={379}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Sidebar Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Due Assignments */}
        <aside className="md:w-80 lg:w-96 bg-[#EAEAEA] p-8 border-r">
          <h2 className="text-4xl font-bold text-[#B80000] mb-6">Due Assignments</h2>
          <div className="space-y-4 text-gray-950">
            {assignments.map((assignment, index) => (
              <div key={index} className="bg-[#FFFCFC] rounded-3xl p-6 stroke-[#C3C3C3]">
                <h3 className="font-semibold mb-3">{assignment.title}</h3>
                <p className="mb-4">Due {assignment.dueDate}</p>
                <button className="bg-[#16007E] text-white rounded-full px-8 py-3 font-bold">
                  View
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Container to center content and limit max width */}
          <div className="max-w-[1920px] mx-auto">
            {/* Today's Events */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-[#B80000] mb-6">Today&apos;s Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-fr">
                {todayEvents.map((event, index) => (
                  <div key={index} className={`bg-[#D9D9D9] rounded-3xl p-6 font-semibold ${event.isExam ? 'text-[#B80000]' : 'text-gray-950'} w-full max-w-sm`}>
                    <h3>
                      {event.title}
                    </h3>
                    <p>{event.time}</p>
                    {event.teacher && <p className="text-sm">{event.teacher}</p>}
                    <button className="mt-4 bg-[#16007E] text-white rounded-full px-6 py-2 font-bold">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exams Section */}
            <div>
              <h2 className="text-4xl font-bold text-[#B80000] mb-6">Exams Results & Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 text-gray-950 auto-rows-fr">
                {exams.map((exam, index) => (
                  <div key={index} className="bg-[#D9D9D9] rounded-3xl p-6 w-full max-w-sm">
                    <h3 className="font-semibold mb-2">{exam.title}</h3>
                    {exam.description && <p className="text-sm mb-4">{exam.description}</p>}
                    <div className="flex gap-2">
                      {exam.status === 'completed' && (
                        <>
                          <button className="bg-[#16007E] text-white rounded-full px-4 py-2 text-sm font-bold">
                            View Results
                          </button>
                          <button className="bg-[#177A05] text-white rounded-full px-4 py-2 text-sm font-bold">
                            Done
                          </button>
                        </>
                      )}
                      {exam.status === 'scheduled' && (
                        <button className="w-full bg-[#16007E] text-white rounded-full py-2 text-sm font-bold">
                          View Schedule & Syllabi
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}