import React, { useState, useEffect } from 'react';

const DynamicModal = ({ isOpen, onClose, tableName, columns, onSave, initialData }) => {
    const [formData, setFormData] = useState({});

    // Cada vez que el modal se abre o cambia de tabla, limpiamos el formulario
    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {});
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    //Eliminara la columna con id primaria
    const camposFormulario = columns.filter(
        (col) => col.toLowerCase() !== `${tableName.toLowerCase().slice(0, -1)}id` && col.toLowerCase() !== 'id'
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value,}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Enviamos los datos recolectados al componente padre
    };

    const isEditing = !!initialData;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                {/* Encabezado */}
                <div className="p-6 border-b border-gray-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800 capitalize">
                        {isEditing ? `Editar Registro` : `Añadir Nuevo ${tableName.slice(0, -1)}`}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

                {/* Formulario Dinámico */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        {camposFormulario.map((col) => (
                            <div key={col} className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    {col.replace('_', ' ')}
                                </label>
                                <input
                                    type="text"
                                    name={col}
                                    value={formData[col] || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder={`Ingresa ${col.replace('_', ' ')}`}
                                    className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Botones de Acción */}
                    <div className="p-6 border-t border-gray-100 bg-slate-50 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
                            {isEditing ? 'Actualizar Cambios' : 'Guardar Registro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DynamicModal;