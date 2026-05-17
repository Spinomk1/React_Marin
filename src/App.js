import { useState } from "react";
import { Route, Routes} from "react-router";

import DataBaseTableContainer from "./pages/DatabaseTables/DataBaseTableContainer";
import {Inicio} from "./pages/Inicio";
import {UseCases, UseCase1, UseCase2, UseCase3, UseCase4} from "./pages/UseCases";
import Docs from "./Components/Docs";
import DynamicTable from "./pages/DatabaseTables/DynamicTable";
import Topbar from "./Layout/Topbar";
import SideBar from "./Layout/SideBar";

function App() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-slate-100 font-sans">

            {/* Sidebar */}
            <SideBar sidebarOpen={sidebarOpen}></SideBar>

            {/* Main */}
            <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>

                {/*TopBar*/}
                <Topbar sidebarOpen = {sidebarOpen} setSidebarOpen= {setSidebarOpen}></Topbar>

                {/* Routes */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <Routes>
                        <Route path="/" element={<Inicio/>} />
                        <Route path="/database" element={<DataBaseTableContainer/>}>
                            <Route path= ":tableName" element={<DynamicTable/>}></Route>
                        </Route>

                        <Route path="/casos_de_uso" element={<UseCases/>}>
                            <Route path="caso_1" element={<UseCase1/>} />
                            <Route path="caso_2" element={<UseCase2/>} />
                            <Route path="caso_3" element={<UseCase3/>} />
                            <Route path="caso_4" element={<UseCase4/>} />
                        </Route>

                        <Route path="/documentacion" element={<Docs/>}/>
                        <Route path="*" element={<h1 className="text-red-500">Ruta no encontrada</h1>}/>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;