import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from '../components/Settings/Settings';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Settings onClose={handleClose} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;