# Dosis y Goteo IV — preparación Vercel

Importar este repositorio en Vercel. Framework: Other. Directorio raíz: ./ . Sin instalación de dependencias ni comando de compilación. Servir los archivos de la raíz. Seleccionar la rama medishorts360-freemium-2026 para una vista previa; no cambiar main.

La app es una PWA: el botón de la web abre su URL HTTPS y el usuario pulsa Instalar. En Safari se usa Compartir → Añadir a pantalla de inicio. No es un APK. Instalar es gratuito; se mantienen tres usos y el cuarto exige activación. Dosis y Goteo comparten el contador X3. Vademécum tiene su propio contador.

Conservar un dominio estable: activación y contador se guardan por navegador y origen. Una URL de vista previa diferente no hereda esos datos. La activación de códigos necesita internet; el uso previamente activado y los recursos de la app quedan disponibles sin conexión después de completar la primera carga.

Antes de publicar al público: verificar la URL HTTPS real, instalación en Android/iPhone y reglas de Firebase. El contador y la marca Premium siguen siendo locales: borrar datos o manipular el navegador permite alterarlos. No considerar este sistema una protección de pago resistente a manipulación. El canje actual usa lectura y escritura separadas; conviene migrarlo a un servicio con validación atómica antes de vender a escala. No incluir códigos reales en archivos, capturas, registros ni repositorios.

Documentación: https://vercel.com/docs/project-configuration/vercel-json
