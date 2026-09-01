import React, { useState } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { FormSuiteDemo } from './components/FormSuiteDemo';
import { DataFeedbackDemo } from './components/DataFeedbackDemo';
import { NavigationDemo } from './components/NavigationDemo';
import { DashboardTemplate } from './components/DashboardTemplate';
import { AdminPanelTemplate } from './components/AdminPanelTemplate';
import { LandingPageTemplate } from './components/LandingPageTemplate';
import { ComponentExplorer } from './components/ComponentExplorer';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { PythonSourcePanel } from './components/PythonSourcePanel';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        showCodePanel={showCodePanel}
        onToggleCodePanel={() => setShowCodePanel(!showCodePanel)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onSelectView={setCurrentView} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {currentView === 'overview' && <Overview onSelectView={setCurrentView} />}
            {currentView === 'forms' && <FormSuiteDemo />}
            {currentView === 'data-feedback' && <DataFeedbackDemo />}
            {currentView === 'navigation' && <NavigationDemo />}
            {currentView === 'dashboard' && <DashboardTemplate />}
            {currentView === 'admin' && <AdminPanelTemplate />}
            {currentView === 'landing' && <LandingPageTemplate />}
            {currentView === 'explorer' && <ComponentExplorer />}
            {currentView === 'architecture' && <ArchitectureViewer />}
          </div>
        </main>
      </div>

      {showCodePanel && (
        <PythonSourcePanel
          currentView={currentView}
          onClose={() => setShowCodePanel(false)}
        />
      )}
    </div>
  );
}

export default App;
