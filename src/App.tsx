import { Routes, Route } from "react-router-dom"
import { Navigation } from "./components/Navigation"
import HomePage from "./pages/HomePage"
import GettingStartedPage from "./pages/GettingStartedPage"
import DocumentationPage from "./pages/DocumentationPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardLayout from "./pages/DashboardLayout"
import ProfilePage from "./pages/dashboard/ProfilePage"
import StatsPage from "./pages/dashboard/Statspage"
import ApiKeysPage from "./pages/dashboard/ApiKeysPage"

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <HomePage />
            </>
          }
        />
        <Route
          path="/getting-started"
          element={
            <>
              <Navigation />
              <GettingStartedPage />
            </>
          }
        />
        <Route
          path="/documentation"
          element={
            <>
              <Navigation />
              <DocumentationPage />
            </>
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
