import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProtectedRoute } from "@/components/features/auth/ProtectedRoute";
import { CommandPalette } from "@/components/CommandPalette";
import { KeyboardShortcutsProvider } from "@/components/KeyboardShortcuts";
import { OfflineBanner } from "@/components/OfflineBanner";
import { SkipToContent } from "@/components/SkipToContent";
import ErrorBoundary from "@/components/ErrorBoundary";
import { FullPageLoader } from "@/components/LoadingSkeletons";
import { PublicLayout } from "@/components/layout/PublicLayout";

// Lazy load pages for code splitting
const Index = lazy(() => import("@/pages/public/Landing/Landing"));
const SignIn = lazy(() => import("@/pages/public/Auth/SignIn"));
const SignUp = lazy(() => import("@/pages/public/Auth/SignUp"));
const Features = lazy(() => import("@/pages/public/Features/index"));
const Pricing = lazy(() => import("@/pages/public/Pricing/index"));
const Contact = lazy(() => import("@/pages/public/Contact/index"));
const Playbooks = lazy(() => import("@/pages/public/Playbooks/index"));
const Dashboard = lazy(() => import("@/pages/private/Dashboard/Dashboard"));
const DashboardOverview = lazy(() => import("@/pages/private/Dashboard/DashboardOverview"));
const Configuration = lazy(() => import("@/pages/private/Configuration/Configuration"));
const CreateContent = lazy(() => import("@/pages/private/Content/CreateContent"));
const History = lazy(() => import("@/pages/private/History/History"));
const DraftEditor = lazy(() => import("@/pages/private/Editor/DraftEditor"));
const Analytics = lazy(() => import("@/pages/private/Analytics/Analytics"));
const Queue = lazy(() => import("@/pages/private/Queue/Queue"));
const Pipeline = lazy(() => import("@/pages/private/Pipeline/Pipeline"));
const Settings = lazy(() => import("@/pages/private/Settings/Settings"));
const AdminUserManagement = lazy(() => import("@/pages/private/Admin/AdminUserManagement"));
const NotFound = lazy(() => import("@/pages/public/NotFound"));
const DesignSystem = lazy(() => import("@/pages/public/DesignSystem"));
const OAuthCallback = lazy(() => import("@/pages/public/Auth/OAuthCallback"));
const ContentWizard = lazy(() => import("@/components/features/content/ContentWizard"));
const ContentDisplay = lazy(() => import("@/pages/private/Content/ContentDisplay"));

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
                  {/* Public Layout Wrapping Route */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/playbooks" element={<Playbooks />} />
                  </Route>

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
                    <Route path="pipeline" element={<Pipeline />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="admin/users" element={<AdminUserManagement />} />
                  </Route>

                  {/* NEW: Topic Analysis & Content Generation Routes */}
                  <Route
                    path="/create-content"
                    element={
                      <ProtectedRoute>
                        <ContentWizard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/content/:sessionId"
                    element={
                      <ProtectedRoute>
                        <ContentDisplay />
                      </ProtectedRoute>
                    }
                  />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="/design" element={<DesignSystem />} />
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
