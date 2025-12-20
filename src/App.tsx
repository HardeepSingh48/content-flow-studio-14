import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CommandPalette } from "@/components/CommandPalette";
import { KeyboardShortcutsProvider } from "@/components/KeyboardShortcuts";
import { OfflineBanner } from "@/components/OfflineBanner";
import { SkipToContent } from "@/components/SkipToContent";
import ErrorBoundary from "@/components/ErrorBoundary";
import { FullPageLoader } from "@/components/LoadingSkeletons";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardOverview = lazy(() => import("./pages/DashboardOverview"));
const Configuration = lazy(() => import("./pages/Configuration"));
const CreateContent = lazy(() => import("./pages/CreateContent"));
const History = lazy(() => import("./pages/History"));
const DraftEditor = lazy(() => import("./pages/DraftEditor"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Queue = lazy(() => import("./pages/Queue"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <KeyboardShortcutsProvider>
              <SkipToContent />
              <OfflineBanner />
              <CommandPalette />
              <Suspense fallback={<FullPageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/auth/callback" element={<OAuthCallback />} />

                  {/* Protected Dashboard Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<DashboardOverview />} />
                    <Route path="configuration" element={<Configuration />} />
                    <Route path="create" element={<CreateContent />} />
                    <Route path="history" element={<History />} />
                    <Route path="drafts/:sessionId" element={<DraftEditor />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="queue" element={<Queue />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </KeyboardShortcutsProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
