# 🌍 Munfifapro – Mundial 2026 App

Aplicación desarrollada con **Ionic + React + Capacitor** para visualizar y gestionar toda la información del Mundial FIFA 2026.  
Incluye fases de grupos, selecciones clasificadas, estadísticas y visualización en cards responsivas.

---

##  Características principales

- **Visualización de grupos**: cada grupo se muestra en cards con banderas, país, código FIFA y confederación.
-  **Datos dinámicos**: carga de información desde archivos JSON (`GruposPrimeraFase.json`).
- **Diseño responsivo**: interfaz adaptada para móviles, tablets y desktop.
-  **Bootstrap integrado**: cards corporativas y estilos consistentes.
- **Ionic Capacitor**: soporte para emuladores Android/iOS y despliegue nativo.
- **Logs y depuración**: consola con trazas de carga de datos para debugging.

---

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/moleculax/fifaproapp.git
   cd fifaproapp

```bash
    npm install
    ionic serve
```
## Ejecuta Emulador

Android
```bash
npx cap add android
npx cap copy
npx cap open android
```
iOS (macOS requerido)
```bash
npx cap add ios
npx cap copy
npx cap open ios

```

Despliegue en:

👉 [https://fifaproapp.vercel.app/](https://fifaproapp.vercel.app/)

Autor
Proyecto creado por Emilio (Moleculax)
👉 [https://moleculaxapp.vercel.ap](https://moleculaxapp.vercel.app/)

 Visión: integrar tecnología, educación, neurociencia y filosofía en productos digitales. 