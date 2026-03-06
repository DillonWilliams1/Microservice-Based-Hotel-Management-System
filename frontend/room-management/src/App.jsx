import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/rooms/Dashboard';
import RoomList from './pages/rooms/RoomList';
import RoomDetails from './pages/rooms/RoomDetails';
import AddRoom from './pages/rooms/AddRoom';
import EditRoom from './pages/rooms/EditRoom';
import Statistics from './pages/rooms/Statistics';
import StatusHistory from './pages/rooms/StatusHistory';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/rooms" element={
              <Layout>
                <RoomList />
              </Layout>
            } />
            <Route path="/rooms/add" element={
              <Layout>
                <AddRoom />
              </Layout>
            } />
            <Route path="/rooms/edit/:roomNumber" element={
              <Layout>
                <EditRoom />
              </Layout>
            } />
            <Route path="/rooms/:roomNumber/history" element={
              <Layout>
                <StatusHistory />
              </Layout>
            } />
            <Route path="/rooms/:roomNumber" element={
              <Layout>
                <RoomDetails />
              </Layout>
            } />
            <Route path="/room-statistics" element={
              <Layout>
                <Statistics />
              </Layout>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
