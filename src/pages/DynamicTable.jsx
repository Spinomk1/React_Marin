import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DynamicTable = () => {
    const { tableName } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`http://localhost:4000/api/data/${tableName}`);
                if (!response.ok) throw new Error("Error en la petición");

                const result = await response.json();

                setData(Array.isArray(result) ? result : []);
            } catch (err) {
                console.error("Error al obtener datos:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tableName]);

    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    if (loading) return <div className="p-10 text-center text-gray-500">Cargando datos de la tabla...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error al conectar con la base de datos.</div>;
    if (data.length === 0) return <div className="p-10 text-center text-gray-400">No se encontraron registros en {tableName}.</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-gray-100">
                <tr>
                    {columns.map((col) => (
                        <th key={col} className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {col.replace('_', ' ')}
                        </th>
                    ))}
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                        Acciones
                    </th>
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
                        {/* Botones de acción (Editar / Eliminar) */}
                        <td className="p-4 text-sm text-right space-x-3">
                            <button className="text-blue-500 hover:text-blue-700">Modificar</button>
                            <button className="text-red-400 hover:text-red-600">Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;