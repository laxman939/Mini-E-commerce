
import './globals.css';
// import type { AppProps } from 'next/app';
import { CustomerProvider } from './context/CustomerContext';
import CustomerDashboard from './pages/page';

export default function App() {
  return (
    <CustomerProvider>
      <CustomerDashboard />
    </CustomerProvider>
  );
}