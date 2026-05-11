import {Outlet} from "react-router-dom";
import {NavLink} from "react-router";

export default function UseCases() {
    return (
        <nav>
            <NavLink
                to="caso_1"
                className={({ isActive }) =>
                    isActive ? "bg-blue-800 text-white p-2" : "bg-blue-200 p-2"
                }
            >
                Pacientes
            </NavLink>

            <NavLink
                to="caso_2"
                className={({ isActive }) =>
                    isActive ? "bg-blue-800 text-white p-2" : "bg-blue-200 p-2"
                }
            >
                Pacientes
            </NavLink>

            <NavLink
                to="caso_3"
                className={({ isActive }) =>
                    isActive ? "bg-blue-800 text-white p-2" : "bg-blue-200 p-2"
                }
            >
                Pacientes
            </NavLink>

            <NavLink
                to="caso_4"
                className={({ isActive }) =>
                    isActive ? "bg-blue-800 text-white p-2" : "bg-blue-200 p-2"
                }
            >
                Pacientes
            </NavLink>

            <div>
                <Outlet></Outlet>
            </div>

        </nav>
    )
}