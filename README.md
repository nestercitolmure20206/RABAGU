# RABAGU

## Descripción General
Rabagu es una aplicación móvil que permite a mujeres emprendedoras crear su perfil, vender su producto organizado por categorías y mostrar su ubicación de emprendimiento en un mapa interactivo
El sistema permite crear un perfil "de emprendimiento", ofrecer sus productos en un catálogo y en su propio perfil, el uso de un mapa interactivo y sistema de chat seguro con clientes. 

## Tecnologías Utilizadas
- **Framework:** React Native (con Expo)
- **Lenguaje:** TypeScript
- **Base de Datos:** SQLite (expo-sqlite)
- **Navegación:** React Navigation
- **Control de Versiones:** Git y GitHub
- **Entorno de Desarrollo:** Visual Studio Code (Windows)

## Instalación Básica

### Prerrequisitos
- Node.js (versión 18 LTS o superior)
- npm (incluido con Node.js)
- Git
- Expo CLI (`npm install -g expo-cli`)
- Aplicación **Expo Go** instalada en un dispositivo físico Android.


### Pasos de Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/NOMBRE_REPO.git
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd NOMBRE_REPO
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del Sistema

### Modo Desarrollo
Para iniciar el servidor de desarrollo, ejecuta:
```bash
npx expo start
```
1. Abre la aplicación **Expo Go** en tu celular.
2. Escanea el código QR que aparece en la terminal o en la pestaña del navegador que se abrió.

### Generación de APK (Build de Producción/Preview)
Para generar el archivo instalable `.apk`:
```bash
eas build -p android --profile preview
```
El sistema pedirá iniciar sesión en tu cuenta de Expo. Una vez terminado, el enlace de descarga del APK se mostrará en la terminal y en tu dashboard de Expo.