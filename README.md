# FAIS Bienestar — faisbienestar.com

Cuánto FAIS aprobó y pagó cada estado (FISE) y cada municipio (FISMDF) de México, año por año desde 2020, y en qué
obras lo usó. Lo básico es gratis; para ver más (mapa de obras, contratistas, lo transferido contra lo registrado)
cada página lleva a la [Plataforma Gobierno Digital e Innovación](https://plataforma.gobiernodigitaleinnovacion.com).

## Cómo se arma

Las páginas (portada, 32 estados, 2,478 municipios, `404.html`, `lugares.json`, `sitemap.xml`, `robots.txt`) las
escribe `scripts/generar_faisbienestar.py` del repo privado Lokus Data Platform, desde la capa Oro
(`oro_v2_fais`, `oro_v2_fais_proyectos`, geografía de la EIC 2025). No se editan a mano: se regeneran.

Archivos fijos de este repo: `estilos.css`, `sitio.js`, `icono.svg`, `netlify.toml`. Si cambian `estilos.css` o
`sitio.js`, subir `VERSION_ESTATICOS` en el generador.

## Actualizar (después de cada carga del FAIS con `pl_fais_trimestral`)

```bash
cd "C:/Lokus Data Platform"
python scripts/generar_faisbienestar.py           # todo
git -C /c/paginas/faisbienestar-site add -A
git -C /c/paginas/faisbienestar-site commit -m "datos: FAIS al <trimestre>"
git -C /c/paginas/faisbienestar-site push          # Netlify publica main solo (sitio portal-fais)
```

`--muestra` genera solo la portada, Jalisco y Zapopan para revisar.

## Reglas

- Estado = FISE (I003); municipio = FISMDF (I004). Montos sin obras canceladas.
- El % pagado es la tasa del Oro (sin folios con posible error de captura).
- Slugs iguales a los de la Plataforma, para que `/datos/<estado>/<municipio>` caiga en el mismo lugar.
- Aviso de Banobras: el generador mide contra el bronze lo que le falta al Oro por municipio y avisa solo donde falta.

Un servicio de Gobierno Digital e Innovación.
