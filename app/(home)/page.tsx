"use client";

import ProtectedRoute from "../auth/protectedRoute/protectedRoute";
import LandingPage from "./_components/landing-page/landing-page";

export default function Home() {
  return (
    <ProtectedRoute>
      <LandingPage />
    </ProtectedRoute>
  );
}
