import { Menu, X } from "lucide-react"
import {useLocation} from "react-router";

const Topbar = ({setSidebarOpen, sidebarOpen}) => {

    const location = useLocation();

    const pageTitles = {
        "/": "Inicio",
        "/database": "Base de datos",
        "/casos_de_uso": "Casos de uso",
        "/documentacion" : "Documentación"
    };

    const currentTitle = pageTitles[location.pathname] || "Dashboard";

    return (
        <header className="bg-white rounded-2xl shadow-sm p-5 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition"
                >
                    {sidebarOpen ? (
                        <X size={28} className="text-slate-700" />
                    ) : (
                        <Menu size={28} className="text-slate-700" />
                    )}
                </button>

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        {currentTitle}
                    </h1>
                    <p className="text-slate-500">
                        Administración del sistema
                    </p>
                </div>
            </div>
        </header>
    )
}

export  default Topbar;
