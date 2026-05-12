import { useState } from "react";

import marco_teorico from "../docs/marco_teorico.pdf";
import informe_tecnico from "../docs/informe_tecnico.pdf";
import bd_llenado from "../docs/bd_llenado.pdf";
import bd_desarrollo from "../docs/bd_desarrollo.pdf";
import diagrama_uml from "../docs/DiagramaUML.pdf";

function Docs() {

    const pdfs = [
        {
            name: "Marco Teórico",
            file: marco_teorico,
        },
        {
            name: "Informe Técnico",
            file: informe_tecnico,
        },
        {
            name: "Llenado de Base de Datos",
            file: bd_llenado,
        },
        {
            name: "Desarrollo de Base de Datos",
            file: bd_desarrollo,
        },
        {
            name: "Diagrama UML",
            file: diagrama_uml,
        },
    ];

    const [selectedPdf, setSelectedPdf] = useState(pdfs[0].file);

    return (
        <div className="flex gap-6 h-[80vh]">

            {/* Sidebar PDFs */}
            <aside className="w-72 bg-slate-50 rounded-2xl p-4 border border-slate-200">

                <h2 className="text-xl font-bold text-slate-700 mb-4">
                    Archivos
                </h2>

                <div className="flex flex-col gap-2">

                    {pdfs.map((pdf) => (
                        <button
                            key={pdf.name}
                            onClick={() => setSelectedPdf(pdf.file)}
                            className="
                                text-left
                                p-3
                                rounded-xl
                                hover:bg-slate-200
                                transition
                            "
                        >
                            {pdf.name}
                        </button>
                    ))}

                </div>

            </aside>

            {/* PDF Viewer */}
            <div className="flex-1 bg-white rounded-2xl overflow-hidden border border-slate-200">

                <iframe
                    src={selectedPdf}
                    title="PDF Viewer"
                    className="w-full h-full"
                />

            </div>

        </div>
    );
}

export default Docs;