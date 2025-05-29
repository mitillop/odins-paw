# 🐾 Odin's Paw  
  
Una plataforma de cuidado de mascotas impulsada por IA, construida con Next.js, que permite a los dueños de mascotas gestionar la salud, nutrición y cuidado de sus compañeros a través de automatización inteligente.  
  
## ✨ Características Principales  
  
- **Gestión de Mascotas**: Registro y seguimiento completo de información de mascotas  
- **Planes de Dieta con IA**: Generación automática de planes alimenticios personalizados usando OpenAI  
- **Chat Inteligente**: Asistente conversacional para consejos de cuidado, nutrición y comportamiento  
- **Autenticación Segura**: Integración con Clerk para manejo de usuarios  
- **Almacenamiento en la Nube**: Gestión de imágenes con Azure Blob Storage  
  
## 🛠️ Stack Tecnológico  
  
### Frontend  
- **Next.js 15.2.3** - Framework React con SSR  
- **React 19.0.0** - Biblioteca de interfaz de usuario  
- **TailwindCSS 4.1.4** + **DaisyUI 5.0.30** - Estilos y componentes  
- **Framer Motion 12.15.0** - Animaciones  
  
### Backend & Base de Datos  
- **Prisma 6.6.0** - ORM para PostgreSQL  
- **Clerk** - Autenticación y gestión de usuarios  
- **Azure Blob Storage** - Almacenamiento de archivos  
  
### IA & Estado  
- **OpenAI API** - Generación de contenido y chat inteligente  
- **Redux Toolkit 2.7.0** - Gestión de estado del cliente  
- **TanStack React Query 5.75.2** - Gestión de estado del servidor  
  
## 🚀 Inicio Rápido  
  
### Prerrequisitos  
- Node.js 18+   
- PostgreSQL  
- Cuenta de Clerk  
- API Key de OpenAI  
- Cuenta de Azure Storage  
  
### Instalación  
  
1. **Clonar el repositorio**  
```bash  
git clone https://github.com/mitillop/odins-paw.git  
cd odins-paw
````
2. **Instalar dependencias**  
```bash
npm install
```
3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  

CLERK_SECRET_KEY=  
  
DATABASE_URL=  
  
OPENAI_API_KEY=  
  
AZURE_STORAGE_CONNECTION_STRING=
```
4. **Configurar la base de datos**
```
npx prisma migrate dev  
npx prisma generate
```
5. ** Ejecutar el servidor de desarrollo**  
```bash
npm run dev
```
6. **Abrir en el navegador**
```bash
http://localhost:3000
``` 

## 📁 Estructura del Proyecto
```
src/  
├── app/                    # App Router de Next.js  
│   ├── dashboard/         # Panel principal de la aplicación  
│   ├── sign-in/          # Página de inicio de sesión  
│   └── sign-up/          # Página de registro  
├── components/           # Componentes React reutilizables  
│   ├── PetForm.jsx      # Formulario de registro de mascotas  
│   └── PetNavbar.jsx    # Navegación de mascotas  
├── libs/                # Utilidades y configuraciones  
│   └── db.js           # Cliente de Prisma  
└── ...  
```

## 🔧 Scripts Disponibles

* npm run dev - Servidor de desarrollo con Turbopack
* npm run build - Construcción para producción
* npm run start - Servidor de producción
* npm run lint - Linter de código


## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (git checkout -b feature/AmazingFeature)
3. Commit tus cambios (git commit -m 'Add some AmazingFeature')
4. Push a la rama (git push origin feature/AmazingFeature)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a mitillop.

## 🐕 Sobre el Proyecto
Odin's Paw combina tecnologías web modernas con inteligencia artificial para crear una experiencia integral de cuidado de mascotas, ayudando a los dueños a tomar mejores decisiones sobre la salud y bienestar de sus compañeros.