import { Header } from "./header";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex flex-column flex-1 p-6">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
