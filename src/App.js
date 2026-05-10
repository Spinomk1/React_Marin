import { useState } from "react";
import { Link, Route, Routes } from "react-router";
import { Users, UserRound, LayoutDashboard, Menu, X } from "lucide-react";

import Pacientes from "./pages/Pacientes";
import Medicos from "./pages/Medicos";

function App() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-slate-100 font-sans">

            {/* Sidebar */}
            <aside className={`bg-slate-900 text-white p-6 flex flex-col shadow-2xl transition-all duration-300 ${sidebarOpen ? "w-72" : "w-0 overflow-hidden p-0"}`}>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-cyan-400">
                        SysHospital
                    </h1>
                    <p className="text-slate-400 text-sm mt-2">
                        Panel administrativo
                    </p>
                </div>

                <nav className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        <LayoutDashboard size={20} />
                        Inicio
                    </Link>

                    <Link
                        to="/pacientes"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        <Users size={20} />
                        Pacientes
                    </Link>

                    <Link
                        to="/medicos"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        <UserRound size={20} />
                        Médicos
                    </Link>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-8">

                {/* Topbar */}
                <header className="bg-white rounded-2xl shadow-sm p-5 mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 transition">
                            {sidebarOpen ? (
                                <X size={28} className="text-slate-700" />
                            ) : (
                                <Menu size={28} className="text-slate-700" />
                            )}
                        </button>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Dashboard Hospitalario
                            </h2>
                            <p className="text-slate-500">
                                Administración del sistema
                            </p>
                        </div>
                    </div>
                </header>

                {/* Routes */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <Routes>
                        <Route path="/" element={<h1>Inicio</h1>} />
                        <Route path="/pacientes" element={<Pacientes />} />
                        <Route path="/medicos" element={<Medicos />} />
                        <Route
                            path="*"
                            element={
                                <h1 className="text-red-500">
                                    Ruta no encontrada
                                </h1>
                            }
                        />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;