import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50/80">
            <Sidebar />
            <main className="lg:ml-[260px] min-h-screen">
                <div className="p-4 md:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1400px]">
                    {children}
                </div>
            </main>
        </div>
    );
}
