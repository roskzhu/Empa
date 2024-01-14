import React, { useState } from 'react';
import Main from './pages/Main';
import Landing from './pages/Landing';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateToMain = () => {
    setCurrentPage('main');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  // Check the URL to determine the initial page
  const path = window.location.pathname;
  if (path === '/Main' && currentPage !== 'main') {
    setCurrentPage('main');
  }

  return (
    <div>
      {currentPage === 'landing' && (
        <Landing onNavigate={navigateToMain} />
      )}
      {currentPage === 'main' && (
        <Main onNavigate={navigateToLanding} />
      )}
    </div>
  );
};

export default App;
