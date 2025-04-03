
import React from "react";
import NavBar from "@/components/NavBar";
import PhotoReportApp from "@/components/PhotoReportApp";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6">
        <PhotoReportApp />
      </main>
    </div>
  );
};

export default Index;
