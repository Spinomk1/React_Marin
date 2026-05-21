# Dashboard Administrativo Hospitalario

Aplicacion web desarrollada en React para la gestion y consulta de informacion de un sistema hospitalario. El proyecto forma parte de un trabajo integrador de Administracion de Bases de Datos Corporativas y presenta una interfaz administrativa para explorar tablas, revisar casos de uso y consultar documentacion tecnica del sistema.

## Caracteristicas

- Panel principal con acceso rapido a las secciones del sistema.
- Navegacion lateral para Inicio, Base de datos, Casos de uso y Documentacion.
- Consulta dinamica de tablas desde una API local.
- Visualizacion de documentos PDF dentro de la aplicacion.
- Interfaz responsiva construida con Tailwind CSS.
- Iconografia mediante Lucide React.

## Tecnologias

- React
- React Router
- Tailwind CSS
- Lucide React
- Create React App

## Requisitos

Antes de ejecutar, tener instalado:

- Node.js
- npm
- Backend/API del proyecto disponible en `http://localhost:4000`

La aplicacion frontend consulta datos desde:

```txt
http://localhost:4000/api/data/:tableName
```

Por ejemplo:

```txt
http://localhost:4000/api/data/pacientes
http://localhost:4000/api/data/medicos
```

## Instalación

Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd React_Marin
```

Instala las dependencias:

```bash
npm install
```

Inicia la aplicacion en modo desarrollo:

```bash
npm start
```

La aplicacion estara disponible en:

```txt
http://localhost:3000
```

## Scripts Disponibles

### `npm start`

Ejecuta la aplicacion en modo desarrollo.

### `npm run build`

Genera una version optimizada para produccion en la carpeta `build`.

### `npm test`

Ejecuta las pruebas configuradas con React Testing Library.

> Nota: el proyecto puede requerir ajustes en la configuracion de pruebas para compatibilidad con versiones recientes de React Router.

### `npm run eject`

Expone la configuracion interna de Create React App. No se recomienda usarlo salvo que sea estrictamente necesario.

## Estructura del Proyecto

```txt
React_Marin/
├── public/
├── src/
│   ├── Components/
│   │   ├── CardInicio.js
│   │   └── Docs.js
│   ├── Layout/
│   │   ├── SideBar.jsx
│   │   └── Topbar.jsx
│   ├── docs/
│   │   ├── bd_desarrollo.pdf
│   │   ├── bd_llenado.pdf
│   │   ├── DiagramaUML.pdf
│   │   ├── informe_tecnico.pdf
│   │   └── marco_teorico.pdf
│   ├── pages/
│   │   ├── DataBaseTables.js
│   │   ├── DynamicTable.jsx
│   │   ├── Inicio.js
│   │   └── UseCases/
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Rutas Principales

| Ruta | Descripcion |
| --- | --- |
| `/` | Pantalla de inicio |
| `/database` | Seccion de consulta de tablas |
| `/database/pacientes` | Tabla de pacientes |
| `/database/medicos` | Tabla de personal medico |
| `/casos_de_uso` | Seccion de casos de uso |
| `/documentacion` | Visor de documentos PDF |

## Documentacion Incluida

El repositorio incluye documentos de apoyo en formato PDF:

- Marco teorico
- Informe tecnico
- Llenado de base de datos
- Desarrollo de base de datos
- Diagrama UML

Estos archivos se pueden consultar desde la seccion **Documentacion** de la aplicacion.
