import {Link} from "react-router";
import {File, LayoutDashboard, Database, Workflow} from "lucide-react";

const SideBar = ({sidebarOpen}) => {

    return (
        <aside className={`fixed top-0 left-0 h-full z-50 w-72 bg-slate-900 text-white p-6 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
                    to="/database"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <Database size={20} />
                    Base de datos
                </Link>

                <Link
                    to="/casos_de_uso"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <Workflow size={20} />
                    Casos de uso
                </Link>

                <Link
                    to="/documentacion"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <File size={20} />
                    Documentación
                </Link>

            </nav>
        </aside>
    )
}

export  default  SideBar;