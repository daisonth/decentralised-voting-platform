import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[60vh] w-full bg-white">
      <div className="w-full"><p className="text-4xl font-bold p-[20px] text-center underline text-blue-800">DASHBOARD</p></div>
        {children}
    </section>
  );
}
