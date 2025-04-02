
import React from "react";
import { useNavigate } from "react-router-dom";
import BackendDocumentation from "@/services/backend/BackendDocumentation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BackendDocs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BackendDocumentation />
      </main>
      <Footer />
    </div>
  );
};

export default BackendDocs;
