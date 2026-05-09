import { Link, Route, Routes } from "react-router";
import { Users, UserRound, LayoutDashboard } from "lucide-react";

import Pacientes from "./pages/Pacientes.js";
import Medicos from "./pages/Medicos";

function App() {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">

            {/* Sidebar*/}
            <aside className="w-72 bg-slate-900 text-white p-6 flex flex-col shadow-2xl">
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

            <main className="flex 1 p-10">
                <Routes>
                    <Route path="/"></Route>
                    <Route path="/pacientes" element={<Pacientes />} />
                    <Route path="/medicos" element={<Medicos />}></Route>
                    <Route path="*" element={<h1 className="text-red-500">ruta no encontrada</h1>}></Route>
                </Routes>
            </main>

        </div>
    );
}

export default App;
