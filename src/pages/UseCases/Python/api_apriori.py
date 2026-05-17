import sys
import warnings
warnings.filterwarnings("ignore")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder

app = FastAPI(title="API Apriori - BD Marin")

# Configuración del puente CORS para conectar con React (Puerto 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Credenciales de tu PostgreSQL
DB_HOST     = "localhost"
DB_PORT     = 5432
DB_NAME     = "postgres"
DB_USER     = "postgres"
DB_PASSWORD = "1234"

MIN_SUPPORT    = 0.05
MIN_CONFIDENCE = 0.3
MIN_LIFT       = 1.0

# Funciones globales de utilidad
def conectar():
    return psycopg2.connect(host=DB_HOST, port=DB_PORT, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD)

def query_df(conn, sql: str) -> pd.DataFrame:
    return pd.read_sql_query(sql, conn)

def binarizar(transacciones: list) -> pd.DataFrame:
    te = TransactionEncoder()
    te_arr = te.fit(transacciones).transform(transacciones)
    return pd.DataFrame(te_arr, columns=te.columns_)

def ejecutar_apriori(df_bin: pd.DataFrame, min_sup=MIN_SUPPORT, min_conf=MIN_CONFIDENCE):
    freq = apriori(df_bin, min_support=min_sup, use_colnames=True)
    if freq.empty: return pd.DataFrame()
    reglas = association_rules(freq, metric="confidence", min_threshold=min_conf)
    if reglas.empty: return pd.DataFrame()
    reglas = reglas[reglas["lift"] >= MIN_LIFT]
    return reglas.sort_values(["lift", "confidence"], ascending=False)

def formatear_reglas(reglas_df):
    reglas_list = []
    if reglas_df.empty: return reglas_list
    for _, r in reglas_df.head(10).iterrows():
        reglas_list.append({
            "antecedents": list(r["antecedents"]),
            "consequents": list(r["consequents"]),
            "support": float(r["support"]),
            "confidence": float(r["confidence"]),
            "lift": float(r["lift"])
        })
    return reglas_list

# ──────────────────────────────────────────────────────────────────────
# ENDPOINT CASO 1: COMPATIBILIDAD SANGUÍNEA
# ──────────────────────────────────────────────────────────────────────
@app.get("/api/caso1")
def obtener_caso1():
    try:
        conn = conectar()
        sql_donante = "SELECT p.pacienteid, 'Donante_' || ts.grupo AS tipo_donante FROM pacientes p JOIN tiposanguineos ts ON ts.tiposanguineoid = p.tiposanguineoid"
        sql_receptor = "SELECT p.pacienteid, 'Receptor_' || tr.grupo AS tipo_receptor FROM pacientes p JOIN tiposanguineos ts ON ts.tiposanguineoid = p.tiposanguineoid JOIN compatibilidadsanguinea cs ON cs.donanteid = ts.tiposanguineoid JOIN tiposanguineos tr ON tr.tiposanguineoid = cs.receptorid"
        sql_enf = "SELECT p.pacienteid, 'Enf_' || ce.nombre AS enfermedad FROM pacientes p JOIN citas ci ON ci.pacienteid = p.pacienteid JOIN consultas co ON co.citaid = ci.citaid JOIN catalogoenfermedades ce ON ce.enfermedadid = co.enfermedadid WHERE ci.estado = 'Completada'"
        
        df_don, df_rec, df_enf = query_df(conn, sql_donante), query_df(conn, sql_receptor), query_df(conn, sql_enf)
        conn.close()

        trans_dict = {}
        for _, row in df_don.iterrows(): trans_dict.setdefault(row["pacienteid"], set()).add(row["tipo_donante"])
        for _, row in df_rec.iterrows(): trans_dict.setdefault(row["pacienteid"], set()).add(row["tipo_receptor"])
        for _, row in df_enf.iterrows(): 
            if row["pacienteid"] in trans_dict: trans_dict[row["pacienteid"]].add(row["enfermedad"])

        transacciones = [list(v) for v in trans_dict.values() if len(v) >= 3]
        if not transacciones: return {"items": [], "tablas": ["Pacientes", "TiposSanguineos", "Diagnosticos"], "reglas": []}
        
        df_bin = binarizar(transacciones)
        reglas = ejecutar_apriori(df_bin)
        return {"items": sorted(list(df_bin.columns)), "tablas": ["Pacientes", "TiposSanguineos", "CompatibilidadSanguinea", "CatalogoEnfermedades"], "reglas": formatear_reglas(reglas)}
    except Exception as e: return {"error": str(e)}

# ──────────────────────────────────────────────────────────────────────
# ENDPOINT CASO 2: ÁREAS HOSPITALARIAS Y URGENCIA
# ──────────────────────────────────────────────────────────────────────
@app.get("/api/caso2")
def obtener_caso2():
    try:
        conn = conectar()
        sql = "SELECT i.ingresoid, 'Area_' || a.nombre AS area, 'Urgencia_' || a.nivelurgencia AS nivel_urgencia, 'Estado_' || i.estado AS estado_ingreso FROM ingresoshospitalarios i JOIN areashospital a ON a.areaid = i.areaid"
        df = query_df(conn, sql)
        conn.close()

        transacciones = [[row["area"], row["nivel_urgencia"], row["estado_ingreso"]] for _, row in df.iterrows()]
        if not transacciones: return {"items": [], "tablas": ["IngresosHospitalarios", "AreasHospital"], "reglas": []}

        df_bin = binarizar(transacciones)
        reglas = ejecutar_apriori(df_bin)
        return {"items": sorted(list(df_bin.columns)), "tablas": ["IngresosHospitalarios", "AreasHospital"], "reglas": formatear_reglas(reglas)}
    except Exception as e: return {"error": str(e)}

# ──────────────────────────────────────────────────────────────────────
# ENDPOINT CASO 3: ENFERMEDADES POR TEMPORADA
# ──────────────────────────────────────────────────────────────────────
@app.get("/api/caso3")
def obtener_caso3():
    try:
        conn = conectar()
        sql = "SELECT co.consultaid, 'Temp_' || co.temporada AS temporada, 'Enf_' || ce.nombre AS enfermedad, 'Tipo_' || ce.origenbrote AS origen_brote FROM consultas co JOIN catalogoenfermedades ce ON ce.enfermedadid = co.enfermedadid WHERE ce.origenbrote <> 'Otra' AND ce.origenbrote IS NOT NULL"
        df = query_df(conn, sql)
        conn.close()

        if df.empty: return {"items": [], "tablas": ["Consultas", "CatalogoEnfermedades"], "reglas": []}

        transacciones = [[row["temporada"], row["enfermedad"], row["origen_brote"]] for _, row in df.iterrows()]
        df_bin = binarizar(transacciones)
        
        # Tal como pusiste en tu script, el caso 3 usa soporte y confianza locales más bajos
        reglas = ejecutar_apriori(df_bin, min_sup=0.01, min_conf=0.1)
        return {"items": sorted(list(df_bin.columns)), "tablas": ["Consultas", "CatalogoEnfermedades"], "reglas": formatear_reglas(reglas)}
    except Exception as e: return {"error": str(e)}

# ──────────────────────────────────────────────────────────────────────
# ENDPOINT CASO 4: COSTOS Y TIPOS DE TRATAMIENTO
# ──────────────────────────────────────────────────────────────────────
@app.get("/api/caso4")
def obtener_caso4():
    try:
        conn = conectar()
        sql_meds = "SELECT p.pacienteid, 'Med_' || m.tipomedicamento AS tipo_med, 'CostoMed_' || m.umbralcosto AS costo_med FROM pacientes p JOIN citas ci ON ci.pacienteid = p.pacienteid JOIN consultas co ON co.citaid = ci.citaid JOIN recetas r ON r.consultaid = co.consultaid JOIN detallereceta dr ON dr.recetaid = r.recetaid JOIN medicinas m ON m.medicinaid = dr.medicinaid WHERE ci.estado = 'Completada'"
        sql_tratos = "SELECT ht.pacienteid, 'Atencion_' || t.tipoatencion AS tipo_atencion, 'CostoTrat_' || t.umbralcosto AS costo_trat, 'Duracion_' || t.duracion AS duracion FROM historialtratamientos ht JOIN tratamientos t ON t.tratamientoid = ht.tratamientoid"
        
        df_meds, df_tratos = query_df(conn, sql_meds), query_df(conn, sql_tratos)
        conn.close()

        trans_dict = {}
        for _, row in df_meds.iterrows():
            pid = row["pacienteid"]
            trans_dict.setdefault(pid, set()).update([row["tipo_med"], row["costo_med"]])
        for _, row in df_tratos.iterrows():
            pid = row["pacienteid"]
            trans_dict.setdefault(pid, set()).update([row["tipo_atencion"], row["costo_trat"], row["duracion"]])

        transacciones = [list(v) for v in trans_dict.values() if len(v) >= 2]
        if not transacciones: return {"items": [], "tablas": ["Medicinas", "Tratamientos", "HistorialTratamientos"], "reglas": []}

        df_bin = binarizar(transacciones)
        reglas = ejecutar_apriori(df_bin)
        return {"items": sorted(list(df_bin.columns)), "tablas": ["Pacientes", "Medicinas", "Recetas", "Tratamientos", "HistorialTratamientos"], "reglas": formatear_reglas(reglas)}
    except Exception as e: return {"error": str(e)}