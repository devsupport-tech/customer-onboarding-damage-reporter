
import React from "react";
import NavBar from "@/components/NavBar";
import CustomerOnboardingForm from "@/components/CustomerOnboardingForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6">
        <CustomerOnboardingForm />
      </main>
    </div>
  );
};

export default Index;
