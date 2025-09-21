import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from "./components/Navbar";
import AdvocateNavbar from "./Advocate components/Navbar";
import AdvocateSidebar from "./Advocate components/Sidebar";
import StudentLayout from "./Student components/Layout";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import FreeQueryWidget from "./components/FreeQueryWidget";
import FreeTools from "./components/FreeTools";
import CourtroomSimulatorDemo from "./components/CourtroomSimulatorDemo";
import RoleGateway from "./components/RoleGateway";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./components/Login";
// import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Analytics from "./Advocate pages/Analytics";
import Clients from "./Advocate pages/Clients";
import ContractComparison from "./Advocate pages/ContractComparison";
import Documents from "./Advocate pages/Documents";
import Integrations from "./Advocate pages/Integrations";
import Research from "./Advocate pages/Research";
import Settings from "./Advocate pages/Settings";
import Simulation from "./Advocate pages/Simulation";
import StudentDashboard from "./Student pages/Dashboard";
import Courses from "./Student pages/Courses";
import Assignments from "./Student pages/Assignments";
import Library from "./Student pages/Library";
import MootCourt from "./Student pages/MootCourt";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

// Home component that contains all your main page content
const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <FreeQueryWidget />
      <FreeTools />
      <Features />
      <CourtroomSimulatorDemo />
      <RoleGateway />
      <Pricing />
      <Testimonials />
    </>
  );
};

const AdvocateLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdvocateSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdvocateNavbar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register Component - Under Development</div>} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Advocate Routes */}
        <Route path="/advocate/*" element={
          <ProtectedRoute>
            <AdvocateLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Analytics />} />
          <Route path="clients" element={<Clients />} />
          <Route path="contracts" element={<ContractComparison />} />
          <Route path="documents" element={<Documents />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="research" element={<Research />} />
          <Route path="settings" element={<Settings />} />
          <Route path="simulation" element={<Simulation />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student/*" element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="library" element={<Library />} />
          <Route path="moot-court" element={<MootCourt />} />
          <Route path="study-groups" element={<StudentDashboard />} />
          <Route path="progress" element={<StudentDashboard />} />
          <Route path="settings" element={<StudentDashboard />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;