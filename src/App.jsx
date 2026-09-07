import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import ApiTerminal from "./components/ApiTerminal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminAuthModal from "./components/AdminAuthModal";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  return (
    <div className="app-layout app">
      <NavBar />
      <main className="main-content">
        <Home />
        <About />
        <TechStack />
        <Projects />
        <ApiTerminal />
        <Contact />
      </main>
      <Footer />
      <AdminAuthModal />
      <AdminDashboard />
    </div>
  );
}
