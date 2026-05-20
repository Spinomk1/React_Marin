import {Outlet,NavLink} from "react-router-dom";
import {
    Droplets,
    Hospital,
    Thermometer,
    BadgeDollarSign
} from "lucide-react";
const casos = [
    {
        path: "caso_1",
        title: "Compatibilidad sanguínea",
        icon: <Droplets size={18} />,
        description:
            "Asocia tipos sanguíneos, compatibilidad y enfermedades del paciente.",
    },

    {
        path: "caso_2",
        title: "Áreas y urgencia",
        icon: <Hospital size={18} />,
        description:
            "Relaciona áreas hospitalarias y niveles de urgencia.",
    },

    {
        path: "caso_3",
        title: "Enfermedades temporada",
        icon: <Thermometer size={18} />,
        description:
            "Detecta enfermedades frecuentes según la temporada.",
    },

    {
        path: "caso_4",
        title: "Costos y tratamientos",
        icon: <BadgeDollarSign size={18} />,
        description:
            "Asocia costos, medicamentos y duración de tratamientos.",
    },
];


export default function UseCases() {
    
    const linkStyle = ({ isActive }) =>
        `
        flex items-center gap-2
        px-5 py-3
        rounded-xl border
        transition-all duration-200
        text-sm font-medium
        ${
            isActive
                ? "bg-sky-100 border-sky-400 text-sky-700 shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
        }
    `;

    return (
        <div className="w-full">

            {/* CONTENEDOR */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">

                {/* BOTONES */}
                <div className="flex flex-wrap gap-4 mb-8">

                    {casos.map((caso, index) => (

                        <NavLink
                            key={index}
                            to={caso.path}
                            className={linkStyle}
                        >
                            {caso.icon}
                            {caso.title}
                        </NavLink>

                    ))}

                </div>

                {/* CONTENIDO DINÁMICO */}
                <div className="w-full">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}