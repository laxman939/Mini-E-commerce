import { CustomerProvider } from './context/CustomerContext';
import './globals.css';

export const metadata = {
  title: 'Customer Dashboard',
  description: 'Manage your customers efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomerProvider>
          {children}
        </CustomerProvider>
      </body>
    </html>
  );
}