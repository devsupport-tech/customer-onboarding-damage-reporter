
import React from "react";
import NavBar from "@/components/NavBar";
import CustomerOnboardingForm from "@/components/CustomerOnboardingForm";
import ReportStats from "@/components/Dashboard/ReportStats";
import HelpTutorial from "@/components/HelpTutorial";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background relative">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <ReportStats />
        </div>
        <CustomerOnboardingForm />
      </main>
      <HelpTutorial />
    </div>
  );
};

export default Index;
