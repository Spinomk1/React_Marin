import { Link } from 'react-router-dom';

export function CardInicio() {
    return (
        <section className="rounded-[16px] p-[60px_40px] text-white shadow-lg overflow-hidden bg-[#1e293b]"
                 style={{
                     backgroundImage: 'radial-gradient(circle at top right, #334155, #1e293b)'
                 }}>
            <div className="max-w-4xl">
                <h2 className="text-[2.2rem] font-bold leading-tight mb-[15px] max-w-[600px]">
                    Bienvenido al Sistema de Gestión Hospitalaria
                </h2>
                <p className="text-[1.1rem] text-[#cbd5e1] mb-[30px] max-w-[500px] leading-relaxed">
                    Administra pacientes, citas médicas y diagnósticos de manera eficiente y centralizada
                </p>

                <div className="flex gap-[15px]">
                    <Link
                        to ="database"
                        className="bg-white text-[#1e293b] px-[24px] py-[12px] rounded-[8px] font-semibold hover:bg-[#f1f5f9] transition-colors duration-200">
                        Explorar Datos
                    </Link>
                    <Link
                        to="/documentacion"
                        className="bg-transparent border-2 border-white text-white px-[24px] py-[12px] rounded-[8px] font-semibold hover:bg-white/10 transition-colors duration-200 text-center">
                        Ver Documentación
                    </Link>
                </div>
            </div>
        </section>
    )
}