"use client";
import { useEffect, useState, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import { AuthLables, StatusLables } from "@/constant/enum";

const UserTable = lazy(() => import("@/components/UserTable"));
const UserDetailsModal = lazy(() => import("@/components/UserDetailsModel")); 
export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Route protection
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null; 

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{AuthLables.Dashboard}</h1>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-90"
        >
          {AuthLables.Logout}
        </button>
      </header>

      <Suspense fallback={<p>{StatusLables.Loading}</p>}>
        <UserTable onSelect={setSelectedId} />
      </Suspense>

      <Suspense fallback={null}>
        <UserDetailsModal
          userId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      </Suspense>
    </div>
  );
}
