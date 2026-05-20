import { useEffect, useState } from "react";
import { Thermometer } from "lucide-react";

export default function UseCase3() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/caso3")
            .then((res) => { if (!res.ok) throw new Error("Error de red"); return res.json(); })
            .then((apiData) => { if (apiData.error) throw new Error(apiData.error); setData(apiData); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, []);

    if (loading) return <div className="p-6 text-slate-500 animate-pulse">Analizando comportamiento epidemiológico estacional...</div>;
    if (error) return <div className="p-6 text-red-500">⚠️ Error: {error}</div>;

    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
                <div className="flex gap-4 items-start">
                    <div className="bg-orange-500 text-white p-3 rounded-xl"><Thermometer size={22} /></div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Caso 3 — Enfermedades por temporada del año</h2>
                        <p className="text-slate-500 mt-2">Descubre la correlación entre la temporada en que se efectúa la consulta, la enfermedad y el origen del brote.</p>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-4">Ítems por transacción</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.items.map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">{item}</span>
                        ))}
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-4">Tablas involucradas</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data.tablas.map((tabla, index) => (
                            <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">📁 {tabla}</div>
                        ))}
                    </div>
                </div>
                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-4">Reglas Epidémicas Descubiertas</h3>
                    {data.reglas.length === 0 ? <p className="text-slate-500 text-sm italic">No se hallaron patrones estacionales con el umbral actual.</p> : (
                        <div className="space-y-4">
                            {data.reglas.map((regla, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                    <p className="font-bold text-slate-800 text-sm mb-2">[{regla.antecedents.join(", ")}] ➔ [{regla.consequents.join(", ")}]</p>
                                    <div className="flex gap-3 text-xs font-mono">
                                        <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded">Soporte: {regla.support.toFixed(3)}</span>
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Confianza: {regla.confidence.toFixed(3)}</span>
                                        <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Lift: {regla.lift.toFixed(3)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}