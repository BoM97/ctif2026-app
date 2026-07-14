import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import MyTeams from "./pages/MyTeams";
import Schedule from "./pages/Schedule";
import CompDetail from "./pages/CompDetail";
import TeamDetail from "./pages/TeamDetail";
import More from "./pages/More";
import Bus from "./pages/Bus";
import Accommodation from "./pages/Accommodation";
import Exhibition from "./pages/Exhibition";
import Documents from "./pages/Documents";

const qc = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 60, networkMode: "offlineFirst" } },
});

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/my-teams" element={<MyTeams />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/plan/:date" element={<CompDetail />} />
            <Route path="/team/:name" element={<TeamDetail />} />
            <Route path="/more" element={<More />} />
            <Route path="/bus" element={<Bus />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/exhibition" element={<Exhibition />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}