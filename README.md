# Portal Inteligente FAIS

Sitio web moderno para la gestión y análisis de recursos FAIS y FORTAMUN del Ramo 33.

## Características

- Diseño responsive y moderno
- Integración con Power BI dashboards
- Videos de YouTube embebidos
- Enlaces a herramientas de análisis (Azure Blob Storage)
- Chatbots y asistentes virtuales (GobiAsistente)
- SSL gratuito automático
- Optimizado para SEO y performance

## Estructura del Proyecto

```
faisbienestar-site/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interactividad
├── netlify.toml        # Configuración de Netlify
└── README.md           # Este archivo
```

## Deployment en Netlify

### Opción 1: Deploy desde Git (Recomendado)

1. **Crear repositorio en GitHub**
   ```bash
   cd C:\Users\hello\faisbienestar-site
   git init
   git add .
   git commit -m "Initial commit: Portal Inteligente FAIS"
   ```

2. **Subir a GitHub**
   - Crea un nuevo repositorio en GitHub (https://github.com/new)
   - Nombre sugerido: `portal-fais`
   - No agregues README, .gitignore o licencia (ya los tienes)
   - Copia los comandos que GitHub te proporciona:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/portal-fais.git
   git branch -M main
   git push -u origin main
   ```

3. **Conectar con Netlify**
   - Ve a https://app.netlify.com/
   - Clic en "Add new site" → "Import an existing project"
   - Selecciona "GitHub" y autoriza Netlify
   - Busca tu repositorio `portal-fais`
   - Configuración de build:
     - **Build command**: (dejar vacío)
     - **Publish directory**: `.` o dejar vacío
   - Clic en "Deploy site"

### Opción 2: Deploy Manual (Más Rápido)

1. **Preparar archivos**
   - Comprime los siguientes archivos en un ZIP:
     - index.html
     - styles.css
     - script.js
     - netlify.toml

2. **Deploy en Netlify**
   - Ve a https://app.netlify.com/drop
   - Arrastra y suelta el ZIP o la carpeta `faisbienestar-site`
   - Netlify automáticamente desplegará tu sitio

## Configurar Dominio Personalizado (GoDaddy)

### Paso 1: En Netlify

1. Una vez desplegado tu sitio, ve a **Site settings** → **Domain management**
2. Clic en "Add custom domain"
3. Ingresa: `faisbienestar.com`
4. Netlify te dará instrucciones específicas

### Paso 2: En GoDaddy

1. Inicia sesión en GoDaddy (https://www.godaddy.com/)
2. Ve a "My Products" → "Domains"
3. Clic en `faisbienestar.com` → "DNS"
4. **Configura los registros DNS:**

   **Para Netlify (opción A):**
   - Elimina todos los registros A existentes
   - Agrega un registro A:
     - Type: `A`
     - Name: `@`
     - Value: `75.2.60.5` (IP de Netlify)
     - TTL: 600 segundos

   **Para Netlify (opción CNAME - más fácil):**
   - Agrega un registro CNAME:
     - Type: `CNAME`
     - Name: `www`
     - Value: `TU-SITIO.netlify.app` (el que Netlify te asigna)
     - TTL: 1 hora

   - Agrega otro registro CNAME:
     - Type: `CNAME`
     - Name: `@` (o apex)
     - Value: `TU-SITIO.netlify.app`
     - TTL: 1 hora

5. Guarda los cambios

### Paso 3: Verificar en Netlify

1. Vuelve a Netlify → **Domain settings**
2. Netlify verificará automáticamente el dominio (puede tardar hasta 24 horas)
3. Una vez verificado, Netlify generará el SSL automáticamente (Let's Encrypt)

### Paso 4: SSL (Certificado HTTPS)

**¡NO necesitas comprar SSL en GoDaddy!** Netlify te da SSL gratis:

1. En Netlify, ve a **Domain settings** → **HTTPS**
2. Espera a que diga "Certificate active"
3. Activa "Force HTTPS" para redirigir todo el tráfico a HTTPS

## Verificar que todo funcione

### Checklist

- [ ] Sitio carga en `https://TU-SITIO.netlify.app`
- [ ] Dashboard de Power BI se visualiza correctamente
- [ ] Video de YouTube se reproduce
- [ ] Botón "GENERAR INFORME" abre Azure Blob Storage
- [ ] Enlaces a GobiFAIS y Copilots funcionan
- [ ] Menú de navegación responsive funciona en móvil
- [ ] Dominio personalizado resuelve a Netlify
- [ ] SSL activo (candado verde en el navegador)

## Actualizar el Sitio

### Si usaste Git:
```bash
# Hacer cambios en los archivos
git add .
git commit -m "Descripción de cambios"
git push
```
Netlify detectará los cambios y redesplegarà automáticamente.

### Si usaste Deploy Manual:
1. Modifica los archivos localmente
2. Ve a Netlify → **Deploys**
3. Arrastra la carpeta actualizada

## Troubleshooting

### El dominio no resuelve
- Espera hasta 24-48 horas (propagación DNS)
- Verifica que los registros DNS en GoDaddy estén correctos
- Usa https://www.whatsmydns.net/ para verificar propagación

### Power BI no se muestra
- Verifica que la URL del iframe sea correcta
- Asegúrate de que el dashboard sea público o tenga permisos de embed

### SSL no se activa
- Espera 24 horas después de configurar el dominio
- Verifica que los registros DNS estén correctos
- En Netlify, intenta "Renew certificate"

### Videos de YouTube no cargan
- Verifica la URL del video
- Asegúrate de usar `/embed/` en la URL: `youtube.com/embed/VIDEO_ID`

## URLs Importantes del Proyecto

- **Dashboard Power BI**: https://app.fabric.microsoft.com/view?r=eyJrIjoiMjEwMGJlZGMtNmE0NS00MmU5LTk4NmMtMjVhNmI3YWE2OGRjIiwidCI6ImIwODMwZjgyLWM0OGQtNGU5ZC1iYTc0LTVlMjVmYmYzZmIzYiIsImMiOjR9
- **Video YouTube**: https://www.youtube.com/watch?v=XdMGKZpugeU
- **Generador Informes**: https://stindicadores.blob.core.windows.net/contenedor-analisis-fais/faisporestado.html
- **GobiFAIS Chat**: https://gobiernodigitalinnovacion.github.io/GobiAsistente/fais.html
- **Copilots México**: https://gobiernodigitalinnovacion.github.io/GobiAsistente/gobiasistente.html
- **Empresa**: https://gobiernodigitaleinnovacion.com/

## Recursos Adicionales

- [Documentación de Netlify](https://docs.netlify.com/)
- [Configurar dominio en Netlify](https://docs.netlify.com/domains-https/custom-domains/)
- [SSL en Netlify](https://docs.netlify.com/domains-https/https-ssl/)
- [Configurar DNS en GoDaddy](https://www.godaddy.com/help/manage-dns-records-680)

## Soporte

Para soporte sobre el sitio, contacta a:
- **Empresa**: Gobierno Digital e Innovación
- **Web**: https://gobiernodigitaleinnovacion.com/

---

Desarrollado por Gobierno Digital e Innovación
