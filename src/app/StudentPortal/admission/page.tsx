"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';

interface FormData {
  personalInfo: {
    name: string;
    fatherName: string;
    gender: string;
    age: string;
    email: string;
    phoneNo: string;
    country: string;
    city: string;
  };
  academicInfo: {
    class: string;
    examinationBoard: string;
    subjects: string[];
  };
  documents: {
    profilePicture: File | null;
    previousCertificates: File[] | null;
    identityProof: File | null;
  };
}

const AdmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: '',
      fatherName: '',
      gender: '',
      age: '',
      email: '',
      phoneNo: '',
      country: '',
      city: ''
    },
    academicInfo: {
      class: '',
      examinationBoard: '',
      subjects: []
    },
    documents: {
      profilePicture: null,
      previousCertificates: null,
      identityProof: null
    }
  });

  // Load saved form data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('admissionFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admissionFormData', JSON.stringify(formData));
  }, [formData]);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleInputChange = (section: keyof FormData, field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = async (file: File, path: string): Promise<string> => {
    if (!file) return '';
    const storageRef = ref(storage, `admissions/${path}/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Upload documents and get URLs
      const documentsUrls: Record<string, string | string[]> = {};
      
      if (formData.documents.profilePicture) {
        documentsUrls.profilePicture = await handleFileUpload(
          formData.documents.profilePicture,
          'profile-pictures'
        );
      }

      if (formData.documents.previousCertificates) {
        const certificatePromises = Array.from(formData.documents.previousCertificates).map(
          file => handleFileUpload(file, 'certificates')
        );
        documentsUrls.previousCertificates = await Promise.all(certificatePromises);
      }

      if (formData.documents.identityProof) {
        documentsUrls.identityProof = await handleFileUpload(
          formData.documents.identityProof,
          'identity-proofs'
        );
      }

      // Prepare data for Firestore
      const admissionData = {
        ...formData,
        documents: documentsUrls,
        applicationStatus: 'pending',
        applicationDate: serverTimestamp(),
        lastUpdated: serverTimestamp()
      };

      // Save to Firestore
      await addDoc(collection(db, 'admissions'), admissionData);

      // Clear form and local storage
      localStorage.removeItem('admissionFormData');
      setFormData({
        personalInfo: {
          name: '',
          fatherName: '',
          gender: '',
          age: '',
          email: '',
          phoneNo: '',
          country: '',
          city: ''
        },
        academicInfo: {
          class: '',
          examinationBoard: '',
          subjects: []
        },
        documents: {
          profilePicture: null,
          previousCertificates: null,
          identityProof: null
        }
      });

      setNotification({ message: "Application submitted successfully!", type: 'success' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({ message: "Error submitting application. Please try again.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalInfoSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="Field">
          <input
            type="text"
            placeholder="Name"
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.name}
            onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
          />
        </div>
        <div className="Field">
          <input
            type="text"
            placeholder="Father Name"
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.fatherName}
            onChange={(e) => handleInputChange('personalInfo', 'fatherName', e.target.value)}
          />
        </div>
        <div className="Field">
          <select
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.gender}
            onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="Field">
          <input
            type="number"
            placeholder="Age"
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.age}
            onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicInfoSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="Field">
          <select
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.academicInfo.examinationBoard}
            onChange={(e) => handleInputChange('academicInfo', 'examinationBoard', e.target.value)}
          >
            <option value="">Select Examination Board</option>
            <option value="KBSE">KBSE (SSC -- HSSC)</option>
            <option value="AKU-EB">AKU-EB (SSC -- HSSC)</option>
            <option value="CAIE">CAIE O / A Level</option>
            <option value="IGCSE">IGCSE</option>
          </select>
        </div>
        <div className="Field">
          <select
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.academicInfo.class}
            onChange={(e) => handleInputChange('academicInfo', 'class', e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </div>
        <div className="Field col-span-2">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleInputChange('documents', 'identityProof', e.target.files[0]);
              }
            }}
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700"
          />
          <p className="text-sm text-gray-500 mt-1">Upload your identity proof</p>
        </div>
      </div>
    </div>
  );

  const renderContactInfoSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="Field">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
          />
        </div>
        <div className="Field">
          <input
            type="tel"
            placeholder="Phone No."
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.phoneNo}
            onChange={(e) => handleInputChange('personalInfo', 'phoneNo', e.target.value)}
          />
        </div>
        <div className="Field">
          <input
            type="text"
            placeholder="Country"
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.country}
            onChange={(e) => handleInputChange('personalInfo', 'country', e.target.value)}
          />
        </div>
        <div className="Field">
          <input
            type="text"
            placeholder="City"
            className="w-full h-16 bg-gray-200 rounded-lg border-2 border-stone-300 px-6 text-neutral-700 text-2xl"
            value={formData.personalInfo.city}
            onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alert className={notification.type === 'error' ? 'bg-red-50' : 'bg-green-50'}>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Hero Section */}
      <div className="Hero relative h-72 bg-red-800/70">
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem]">
          <div className="bg-gray-200 rounded-3xl border border-stone-300 px-16 py-6">
            <h1 className="text-violet-950 text-7xl font-bold font-['Inter']">Admissions</h1>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 mt-24">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Step {currentStep} of 3</span>
              <div className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                <span className="text-sm text-gray-500">Auto-saving...</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && renderPersonalInfoSection()}
            {currentStep === 2 && renderAcademicInfoSection()}
            {currentStep === 3 && renderContactInfoSection()}

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(prev + 1, 3))}
                  className="flex items-center gap-2 px-6 py-2 bg-violet-950 text-white rounded-lg"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-violet-950 text-white rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'} <Send className="w-5 h-5" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdmissionForm;