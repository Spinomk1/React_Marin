import { NavLink, Outlet, useParams } from 'react-router-dom';

export default function DataBaseTableContainer() {

    const MENU_TABLAS = [
        { id: 'pacientes', label: 'Pacientes' },
        { id: 'personal', label: 'Personal Médico' }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            {/* Navegación de Tablas */}
            <nav className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                {MENU_TABLAS.map((tabla) => (
                    <NavLink
                        key={tabla.id}
                        to={`/database/${tabla.id}`}
                        className={({ isActive }) =>
                            `px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                                isActive
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`
                        }
                    >
                        {tabla.label}
                    </NavLink>
                ))}
            </nav>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <Outlet />
            </div>
        </div>
    );
};