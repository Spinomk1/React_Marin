import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Editbutton from '../../Components/EditButton';
import DynamicModal from '../../Components/DynamicModal';

const DynamicTable = () => {
    const { tableName } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/api/data/${tableName}?page=${page}&limit=10`);
            const result = await response.json();
            setData(result.data || []);
            setTotalPages(result.totalPages || 1);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { setPage(1); }, [tableName]);
    useEffect(() => { fetchData(); }, [tableName, page]);

    const handleSaveNewRecord = async (nuevoRegistro) => {
        try {
            const response = await fetch(`http://localhost:4000/api/data/${tableName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoRegistro),
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchData(); // Súper fácil de refrescar porque la función está en este mismo archivo
            }
        } catch (err) {
            console.error(err);
        }
    };

// --- FUNCIÓN PARA MODIFICAR (ABRIR FORMULARIO) ---
    const handleEdit = (row) => {
        const pkName = columns.find(col => col.toLowerCase().endsWith('id')) || 'id';
        const idValue = row[pkName];

        alert(`Abriendo edición para el registro ID: ${idValue}. Puedes usar el mismo modal pasando este objeto 'row' como estado inicial.`);
    };

    const handleDelete = async (row) => {
        // CORRECCIÓN CLAVE: El primer elemento de las columnas siempre es la Llave Primaria en Postgres
        const pkName = columns[0];
        const idValue = row[pkName];

        // Validación defensiva: Si por alguna razón vuelve a ser undefined, frenamos la petición
        if (idValue === undefined || idValue === null) {
            console.error("Error al identificar la Llave Primaria. Columna detectada:", pkName, "en la fila:", row);
            alert("No se pudo encontrar el ID de este registro para eliminarlo.");
            return;
        }

        if (!window.confirm(`¿Estás seguro de que deseas eliminar este registro con ID ${idValue}?`)) {
            return;
        }

        try {
            // Ahora la URL llevará el número real (ej: /api/data/pacientes/5)
            const response = await fetch(`http://localhost:4000/api/data/${tableName}/${idValue}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchData(); // Recargar la tabla automáticamente
            } else {
                const errorData = await response.json();
                alert(`No se pudo eliminar: ${errorData.error || 'Error desconocido'}`);
            }
        } catch (err) {
            console.error("Error en la conexión al eliminar:", err);
        }
    };

    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    if (loading) return <div className="p-10 text-center text-gray-500">Cargando datos de la tabla...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error al conectar con la base de datos.</div>;
    if (data.length === 0) return <div className="p-10 text-center text-gray-400">No se encontraron registros en {tableName}.</div>;

    return (
        <div>
            {/*Encabezado*/}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 capitalize">
                    Gestión de {tableName}
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all"
                >
                    <span className="text-xl">+</span> Nuevo {tableName?.slice(0, -1)}
                </button>
            </div>

            {/*Cuerpo de la tabla*/}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
            <div className="p-10 text-center text-gray-500">Cargando...</div>
        ) : error ? (
            <div className="p-10 text-center text-red-500">Error al conectar con la API</div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {col.replace('_', ' ')}
                            </th>
                        ))}
                        <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                            {columns.map((col) => (
                                <td key={col} className="p-4 text-sm text-slate-700">
                                    {row[col] !== null ? String(row[col]) : ''}
                                </td>
                            ))}
                            <td className="p-4 text-sm text-right space-x-3">
                                {/*Botones de eliminar y actualizar*/}
                                <Editbutton/>

                                <button title="Eliminar" className=" p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                                        onClick={() => handleDelete(row)}
                                >
                                    <Trash2 size={18} />
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-xl">
            <span className="text-sm text-gray-500">
              Página <strong className="text-gray-700">{page}</strong> de <strong className="text-gray-700">{totalPages}</strong>
            </span>

            <div className="inline-flex space-x-2">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 transition-all ${
                        page === 1
                            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                >
                    Anterior
                </button>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 transition-all ${
                        page === totalPages
                            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    </div>
            <DynamicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tableName={tableName}
                columns={columns}
                onSave={handleSaveNewRecord}
            />
</div>


    );
};

export default DynamicTable;