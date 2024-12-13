'use client';
import React, { useState, useEffect } from 'react';
import { Eye, X, CheckCircle, XCircle } from 'lucide-react';
import {
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc,
    deleteDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import Image from "next/image";

// Interfaces for type safety
interface PersonalInfo {
    name: string;
    email: string;
    phoneNo: string;
    gender: string;
}

interface ProgramPreferences {
    desiredClass: string;
    stream: string;
    careerGoals: string;
    reasonForJoining: string;
}

interface AdmissionEntry {
    id: string;
    personalInfo: PersonalInfo;
    applicationStatus: 'pending' | 'approved' | 'rejected';
    applicationDate: {
        seconds: number;
        nanoseconds: number;
    };
    programPreferences: ProgramPreferences;
    documents?: {
        profilePicture?: string;
        characterCertificate?: string;
        previousMarksheets?: string[];
    };
}

interface Question {
    id: string;
    fullName: string;
    contactNumber: string;
    email: string;
    question: string;
    answer?: string;
    status: 'new' | 'in-progress' | 'resolved' | 'closed';
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}

const AdminDashboard: React.FC = () => {
    const [admissionEntries, setAdmissionEntries] = useState<AdmissionEntry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<AdmissionEntry | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'entries' | 'questions'>('entries');

    // Fetch admission entries
    useEffect(() => {
        const fetchAdmissionEntries = async () => {
            try {
                const q = query(
                    collection(db, 'admissions'),
                    orderBy('applicationDate', 'desc')
                );
                const querySnapshot = await getDocs(q);

                const entries = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as AdmissionEntry));

                setAdmissionEntries(entries);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admission entries:", error);
                setLoading(false);
            }
        };

        fetchAdmissionEntries();
    }, []);

    // Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const q = query(
                    collection(db, 'queries'),
                    orderBy('createdAt', 'desc')
                );
                const querySnapshot = await getDocs(q);

                const fetchedQuestions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Question));

                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Utility functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'approved': return 'bg-green-700';
            case 'rejected': return 'bg-red-700';
            default: return 'bg-gray-500';
        }
    };

    const formatDate = (timestamp: { seconds: number, nanoseconds: number }) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('en-GB');
    };

    const getQuestionStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-yellow-100 text-yellow-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Question Management Functions
    const updateQuestionStatus = async (questionId: string, status: 'new' | 'in-progress' | 'resolved' | 'closed', answer?: string) => {
        if (!questionId) return;

        try {
            const questionRef = doc(db, 'queries', questionId);
            const updateData: { status: string, answer?: string } = { status };
            if (answer) updateData.answer = answer;

            await updateDoc(questionRef, updateData);

            setQuestions(questions.map(q =>
                q.id === questionId ? { ...q, status, ...(answer ? { answer } : {}) } : q
            ));

            // Close the modal after updating
            setSelectedQuestion(null);
        } catch (error) {
            console.error("Error updating question status:", error);
        }
    };

    const deleteQuestion = async (questionId: string) => {
        if (!questionId) return;

        try {
            await deleteDoc(doc(db, 'queries', questionId));
            setQuestions(questions.filter(q => q.id !== questionId));
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    const openDetailsModal = (entry: AdmissionEntry) => {
        setSelectedEntry(entry);
    };

    const closeDetailsModal = () => {
        setSelectedEntry(null);
    };

    const renderQuestionsSection = () => (
        <div className="container mx-auto px-4 mt-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-green-950 text-white p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Admission Questions</h2>
                </div>

                <div className="p-4">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className="border-b py-4 flex items-start justify-between"
                        >
                            <div className="flex-grow pr-4">
                                <p className="font-medium">{q.question}</p>
                                <p className="text-sm text-gray-600">
                                    From: {q.fullName} ({q.email})
                                </p>
                                <span
                                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${getQuestionStatusColor(q.status)}`}
                                >
                                    {q.status}
                                </span>
                                <p className="text-sm text-gray-500 mt-1">
                                    Submitted on: {formatDate(q.createdAt)}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedQuestion(q)}
                                    className="text-green-950 hover:bg-green-100 p-2 rounded-full"
                                    title="Manage Question"
                                >
                                    <Eye size={20} />
                                </button>
                                <button
                                    onClick={() => deleteQuestion(q.id)}
                                    className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                                    title="Delete Question"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Question Management Modal */}
            {selectedQuestion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
                        <button
                            onClick={() => setSelectedQuestion(null)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-green-950 border-b pb-3">
                            Question Management
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="font-medium text-lg">{selectedQuestion.question}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    From: {selectedQuestion.fullName} ({selectedQuestion.email})
                                </p>
                                <p className="text-sm text-gray-600">
                                    Contact: {selectedQuestion.contactNumber}
                                </p>
                                <span
                                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${getQuestionStatusColor(selectedQuestion.status)}`}
                                >
                                    Current Status: {selectedQuestion.status}
                                </span>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Answer</label>
                                <textarea
                                    id="answer"
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-950"
                                    placeholder="Enter your answer here..."
                                    defaultValue={selectedQuestion.answer || ''}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        const answerTextarea = document.getElementById('answer') as HTMLTextAreaElement;
                                        updateQuestionStatus(selectedQuestion.id, 'resolved', answerTextarea.value);
                                    }}
                                    className="bg-green-950 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition flex items-center"
                                >
                                    <CheckCircle className="mr-2" size={20} /> Mark as Resolved
                                </button>
                                <button
                                    onClick={() => {
                                        const answerTextarea = document.getElementById('answer') as HTMLTextAreaElement;
                                        updateQuestionStatus(selectedQuestion.id, 'in-progress', answerTextarea.value);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition flex items-center"
                                >
                                    In Progress
                                </button>
                                <button
                                    onClick={() => updateQuestionStatus(selectedQuestion.id, 'closed')}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition flex items-center"
                                >
                                    <XCircle className="mr-2" size={20} /> Close Question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // Rest of the component remains the same as in the previous version
    return (
        <div className="min-h-screen relative w-full bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-48 mb-4" style={{ backgroundImage: "url('/top_header_bg.jpg')" }}>
                <div className="w-full h-full bg-green-950 opacity-80" />

                <div className="absolute left-1/4 transform -translate-x-1/2 bottom-[-1.5rem]">
                    <div className="bg-gray-200 rounded-xl border border-stone-300 px-6 py-4">
                        <h1 className="text-g text-4xl font-bold">Admin Dashboard</h1>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="container mx-auto px-4 mb-4 pt-10">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab('entries')}
                        className={`px-4 py-2 rounded ${activeTab === 'entries'
                            ? 'bg-green-950 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Admission Entries
                    </button>
                    <button
                        onClick={() => setActiveTab('questions')}
                        className={`px-4 py-2 rounded ${activeTab === 'questions'
                            ? 'bg-green-950 text-white'
                            : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Questions
                    </button>
                </div>
            </div>

            {/* Rest of the component's render method remains the same */}
            {activeTab === 'entries' ? (
                <div className="container mx-auto px-4 mt-8">
                    {/* Admission Entries Table (same as before) */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="bg-green-950 text-white p-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Admission Entries Management</h2>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Loading entries...</p>
                            </div>
                        ) : (
                            // ... (rest of the table remains the same)
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-3 text-left">Name</th>
                                            <th className="p-3 text-left">Email</th>
                                            <th className="p-3 text-left">Class</th>
                                            <th className="p-3 text-left">Stream</th>
                                            <th className="p-3 text-left">Status</th>
                                            <th className="p-3 text-left">Applied On</th>
                                            <th className="p-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admissionEntries.map((entry) => (
                                            <tr key={entry.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3">{entry.personalInfo?.name || 'N/A'}</td>
                                                <td className="p-3">{entry.personalInfo?.email || 'N/A'}</td>
                                                <td className="p-3">{entry.programPreferences?.desiredClass || 'N/A'}</td>
                                                <td className="p-3">{entry.programPreferences?.stream || 'N/A'}</td>
                                                <td className="p-3">
                                                    <span className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(entry.applicationStatus)}`}>
                                                        {entry.applicationStatus}
                                                    </span>
                                                </td>
                                                <td className="p-3">{formatDate(entry.applicationDate)}</td>
                                                <td className="p-3">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => openDetailsModal(entry)}
                                                            className="text-green-950 hover:bg-green-100 p-2 rounded-full"
                                                            title="View Details"
                                                        >
                                                            <Eye size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                renderQuestionsSection()
            )}

            {/* Details Modal */}
            {selectedEntry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={closeDetailsModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-green-950 border-b pb-3">
                            Admission Entry Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Personal Information Section */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Personal Information</h3>
                                <div className="space-y-2">
                                    <p><strong>Name:</strong> {selectedEntry.personalInfo?.name || 'N/A'}</p>
                                    <p><strong>Email:</strong> {selectedEntry.personalInfo?.email || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {selectedEntry.personalInfo?.phoneNo || 'N/A'}</p>
                                    <p><strong>Gender:</strong> {selectedEntry.personalInfo?.gender || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Program Preferences Section */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Program Details</h3>
                                <div className="space-y-2">
                                    <p><strong>Desired Class:</strong> {selectedEntry.programPreferences?.desiredClass || 'N/A'}</p>
                                    <p><strong>Stream:</strong> {selectedEntry.programPreferences?.stream || 'N/A'}</p>
                                    <p><strong>Career Goals:</strong> {selectedEntry.programPreferences?.careerGoals || 'N/A'}</p>
                                    <p><strong>Reason for Joining:</strong> {selectedEntry.programPreferences?.reasonForJoining || 'N/A'}</p>
                                    <p><strong>Application Status:</strong>
                                        <span className={`ml-2 px-3 py-1 rounded-full text-white text-xs ${getStatusColor(selectedEntry.applicationStatus)}`}>
                                            {selectedEntry.applicationStatus}
                                        </span>
                                    </p>
                                    <p><strong>Applied On:</strong> {formatDate(selectedEntry.applicationDate)}</p>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div className="col-span-2 mt-4">
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Uploaded Documents</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {selectedEntry.documents?.profilePicture && (
                                        <div>
                                            <p className="font-medium mb-2">Profile Picture</p>

                                            <Image
                                                src={selectedEntry.documents.profilePicture}
                                                alt={`Profile`}
                                                width={192}
                                                height={192}
                                                className="w-full h-48 object-cover rounded-lg mb-2"
                                            />

                                        </div>
                                    )}
                                    {selectedEntry.documents?.characterCertificate && (
                                        <div>
                                            <p className="font-medium mb-2">Character Certificate</p>
                                            <Image
                                                src={selectedEntry.documents.characterCertificate}
                                                alt={`Character Certificate`}
                                                width={192}
                                                height={192}
                                                className="w-full h-48 object-cover rounded-lg mb-2"
                                            />

                                        </div>
                                    )}
                                    {selectedEntry.documents?.previousMarksheets && (
                                        <div>
                                            <p className="font-medium mb-2">Previous Marksheets</p>
                                            {selectedEntry.documents.previousMarksheets.map((marksheet, index) => (
                                                <Image
                                                    src={marksheet}
                                                    alt={`Marksheet ${index + 1}`}
                                                    width={192}
                                                    height={192}
                                                    className="w-full h-48 object-cover rounded-lg mb-2"
                                                    key={index}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="col-span-2 mt-6 flex justify-end space-x-4 border-t pt-4">
                                <button
                                    onClick={() => {
                                        const updatedStatus: 'approved' | 'rejected' | 'pending' =
                                            selectedEntry.applicationStatus === 'pending' ? 'approved' : 'pending';

                                        const entryRef = doc(db, 'admissions', selectedEntry.id);
                                        updateDoc(entryRef, { applicationStatus: updatedStatus })
                                            .then(() => {
                                                setAdmissionEntries(entries =>
                                                    entries.map(entry =>
                                                        entry.id === selectedEntry.id
                                                            ? { ...entry, applicationStatus: updatedStatus }
                                                            : entry
                                                    )
                                                );
                                                setSelectedEntry(prev => prev ? { ...prev, applicationStatus: updatedStatus } : null);
                                            })
                                            .catch(error => {
                                                console.error("Error updating application status:", error);
                                            });
                                    }}
                                    className={`
                                        ${selectedEntry.applicationStatus === 'pending'
                                            ? 'bg-green-950 hover:bg-green-800'
                                            : 'bg-yellow-600 hover:bg-yellow-500'
                                        } 
                                        text-white px-4 py-2 rounded transition
                                    `}
                                >
                                    {selectedEntry.applicationStatus === 'pending'
                                        ? 'Approve Application'
                                        : 'Reset Status'}
                                </button>
                                <button
                                    onClick={() => {
                                        const updatedStatus: 'rejected' | 'pending' =
                                            selectedEntry.applicationStatus !== 'rejected' ? 'rejected' : 'pending';

                                        const entryRef = doc(db, 'admissions', selectedEntry.id);
                                        updateDoc(entryRef, { applicationStatus: updatedStatus })
                                            .then(() => {
                                                setAdmissionEntries(entries =>
                                                    entries.map(entry =>
                                                        entry.id === selectedEntry.id
                                                            ? { ...entry, applicationStatus: updatedStatus }
                                                            : entry
                                                    )
                                                );
                                                setSelectedEntry(prev => prev ? { ...prev, applicationStatus: updatedStatus } : null);
                                            })
                                            .catch(error => {
                                                console.error("Error updating application status:", error);
                                            });
                                    }}
                                    className={`
                                        ${selectedEntry.applicationStatus !== 'rejected'
                                            ? 'bg-red-600 hover:bg-red-500'
                                            : 'bg-yellow-600 hover:bg-yellow-500'
                                        } 
                                        text-white px-4 py-2 rounded transition
                                    `}
                                >
                                    {selectedEntry.applicationStatus !== 'rejected'
                                        ? 'Reject Application'
                                        : 'Reset Status'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;