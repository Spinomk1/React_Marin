import {Link, Route, Routes} from "react-router";
import Pacientes from "./pages/Pacientes.js";
import Medicos from "./pages/Medicos";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

        <aside className="w-64 bg-slate-800 text-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 text-blue-400">Sistema hospitalario</h2>
            <nav className="flex flex-col gap-4">
                <Link to="/" className="hover:text-blue-300 transition">Inicio</Link>
                <Link to="/pacientes" className="hover:text-blue-300 transition">Pacientes</Link>
                <Link to="/medicos" className="hover:text-blue-300 transition">Médicos</Link>
            </nav>
        </aside>

        <main className="flex 1 p-10">
            <Routes>
                <Route path="/"></Route>
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/medicos" element={<Medicos/>}></Route>
                <Route path="*" element={<h1 className="text-red-500">ruta no encontrada</h1>}></Route>
            </Routes>
        </main>

    </div>
  );
}

export default App;
