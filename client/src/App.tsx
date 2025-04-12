import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SpaceBackground } from "./lib/three-components";
import ProgressBar from "./components/ui/ProgressBar";
import StarField from "./components/ui/StarField";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user.uid);
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

  // Check if current route is admin
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`relative min-h-screen ${isAdminRoute ? 'bg-background' : ''}`}>
        {!isAdminRoute && <SpaceBackground />}
        {!isAdminRoute && <StarField starCount={200} />}
        <ProgressBar />
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
