# Documento funcional — Portfolio de Ander Varela

| | |
|---|---|
| **Proyecto** | Web portfolio / currículum interactivo |
| **Dominio** | `andervarela.es` |
| **Versión** | 1.0 — 8 de octubre de 2026 |
| **Estado** | Funcional cerrado, pendiente de diseño |

---

## 1. Visión

Una web de una sola página que funciona como currículum vivo. Un avatar 3D de Ander permanece en pantalla durante todo el recorrido y actúa como guía: cambia de pose y de posición según la sección que se está leyendo, mientras el contenido entra y sale por capas al hacer scroll.

El objetivo es que quien la visite recuerde la web y entienda en menos de un minuto quién es Ander, qué sabe hacer y qué ha construido.

### 1.1 Objetivos

1. Presentar experiencia, proyectos, logros, estudios y skills con el mismo contenido que el CV, pero en un formato memorable.
2. Demostrar con la propia web el nivel de frontend (animación, 3D, rendimiento, accesibilidad).
3. Facilitar el contacto y la descarga del CV en cualquier punto del recorrido.

### 1.2 Público

| Público | Qué busca | Cómo se le responde |
|---|---|---|
| **Recruiters / RRHH** (principal) | Lectura rápida, datos claros, CV descargable | Titulares escaneables, botón "Descargar CV" siempre accesible, datos clave en el inicio |
| **Tech leads / CTOs** (principal) | Profundidad técnica, criterio, código | Detalle de proyectos con stack y decisiones, enlaces a repositorios, la web como prueba |

### 1.3 Tono

Cercano y en primera persona. Se abandona el tono de venta del CV ("elimino riesgos…") por frases directas y naturales ("Estandaricé los componentes de UI con React y TypeScript para que dejásemos de perseguir bugs"). Sin superlativos ni jerga corporativa.

---

## 2. Alcance

**Incluido**

- Una única página con 8 secciones y navegación por scroll.
- Avatar 3D con poses por sección y seguimiento del cursor.
- Sistema de capas con animaciones ligadas al scroll.
- Detalle de proyecto en capa superpuesta, sin cambiar de página.
- Dos idiomas: español e inglés.
- Tema oscuro (por defecto) y claro.
- Descarga del CV en PDF.
- Versión adaptada a móvil y a "reducir movimiento".

**Excluido**

- Formulario de contacto (solo enlaces).
- Teléfono público.
- Blog, CMS o panel de administración.
- Analítica con cookies de terceros.

---

## 3. Estructura de la página

Una sola URL. Cada sección tiene un ancla propia.

| # | Sección | Ancla | Contenido |
|---|---|---|---|
| 1 | Inicio | `#inicio` | Nombre, rol, frase de presentación, CTAs |
| 2 | Sobre mí | `#sobre-mi` | Quién soy y cómo trabajo |
| 3 | Experiencia | `#experiencia` | Trayectoria laboral |
| 4 | Proyectos | `#proyectos` | 7 proyectos clicables |
| 5 | Hackatones y logros | `#logros` | Premios y certificaciones |
| 6 | Estudios | `#estudios` | Máster y Grado |
| 7 | Skills | `#skills` | Stack agrupado por áreas |
| 8 | Contacto | `#contacto` | Email, LinkedIn, GitHub, CV |

---

## 4. Navegación

### 4.1 Menú

- Fijo y siempre visible, en la capa superior.
- Un enlace por sección. Al pulsarlo, la página hace scroll animado hasta la sección; no hay navegación entre páginas.
- La sección actual queda marcada en el menú y se actualiza al hacer scroll manualmente.
- El ancla de la URL se actualiza con la sección activa, de modo que un enlace como `andervarela.es/#proyectos` abre directamente en esa sección.
- Incluye además: selector de idioma (ES / EN), conmutador de tema y botón "Descargar CV".
- Indicador de progreso de scroll de la página.

### 4.2 Menú en móvil

- Se colapsa en un botón que abre un panel a pantalla completa con las mismas opciones.
- Al elegir una sección, el panel se cierra y se hace el scroll.

### 4.3 Teclado y accesibilidad

- Todo el menú es navegable con teclado y con foco visible.
- Enlace "Saltar al contenido" al inicio.
- Con "reducir movimiento" activo, el salto a la sección es instantáneo en lugar de animado.

---

## 5. Sistema de capas

La página se construye como capas apiladas que se mueven a velocidades y momentos distintos. Es el recurso visual principal.

| Capa (de fondo a frente) | Contenido | Comportamiento |
|---|---|---|
| **0 · Fondo** | Color base, degradados, rejilla o partículas sutiles | Cambia gradualmente de tono entre secciones; parallax lento |
| **1 · Decoración** | Tipografía gigante de sección, números, formas | Parallax medio; entra y sale con la sección |
| **2 · Contenido** | Textos, tarjetas, líneas de tiempo | Entra por revelado al llegar a la sección y sale al abandonarla |
| **3 · Avatar** | Personaje 3D | Fijo en pantalla; cambia de pose, posición y escala |
| **4 · Interfaz** | Menú, progreso, idioma, tema | Fija, siempre encima |
| **5 · Superposición** | Detalle de proyecto, menú móvil | Cubre todo lo anterior al abrirse |

**Reglas**

- Las transiciones entre secciones están ligadas a la posición del scroll (avanzan y retroceden con él), no a temporizadores.
- El contenido nunca queda tapado por el avatar: cada sección reserva una zona libre para él.
- Algunas secciones (Experiencia, Proyectos) se "fijan" mientras su contenido interno avanza con el scroll, y se sueltan al terminar.

---

## 6. Avatar 3D

### 6.1 Definición

- Personaje 3D de **estilo Pixar/cartoon**, reconocible como Ander.
- Encuadre de **busto / medio cuerpo** (de cintura para arriba), con brazos y manos visibles para poder gesticular.
- Vestuario **business casual**: camisa o polo con americana desestructurada, sin corbata.

### 6.2 Producción

El modelo se crea a partir de fotografías de referencia de Ander:

| Foto | Ángulo |
|---|---|
| 1 | Frontal |
| 2 | Perfil izquierdo (90º) |
| 3 | Perfil derecho (90º) |
| 4 | 45º izquierda |
| 5 | 45º derecha |

Condiciones de las fotos: luz uniforme y sin sombras duras, fondo liso, expresión neutra, misma distancia y altura de cámara, pelo y ropa tal como se quieran en el avatar. Se recomienda añadir una foto sonriendo como referencia de expresión.

Entregable del modelo: formato glTF/GLB, con esqueleto (rig) para brazos, cabeza y expresiones faciales, y optimizado para web (objetivo: menos de 3 MB).

### 6.3 Comportamiento por sección

| Sección | Pose / acción | Posición en escritorio |
|---|---|---|
| Inicio | Saluda con la mano y sonríe | Centro-derecha, tamaño grande |
| Sobre mí | Postura relajada, brazos cruzados, mira al texto | Izquierda |
| Experiencia | Teclea en un portátil | Derecha |
| Proyectos | Señala hacia las tarjetas; mira la tarjeta bajo el cursor | Izquierda, tamaño reducido |
| Hackatones y logros | Levanta un trofeo | Centro, con el contenido a ambos lados |
| Estudios | Lleva birrete y sostiene un diploma | Derecha |
| Skills | Sostiene o hace malabares con iconos de tecnologías | Centro |
| Contacto | Señala los enlaces de contacto y se despide | Izquierda |

### 6.4 Interacción

- **Seguimiento del cursor**: la cabeza y los ojos siguen al puntero con suavidad y dentro de un ángulo limitado.
- **Reposo**: respiración y parpadeo sutiles para que no parezca una imagen estática.
- **Transiciones**: el paso de una pose a otra es continuo y ligado al scroll; al retroceder, se deshace.
- **Clic en el avatar**: reacción breve (guiño o saludo). Detalle opcional.

### 6.5 Estados alternativos

| Situación | Comportamiento |
|---|---|
| Modelo cargando | Silueta o imagen estática del avatar; el contenido es legible desde el primer momento |
| Dispositivo sin WebGL o de gama baja | Imagen renderizada del avatar por sección, sin 3D en tiempo real |
| "Reducir movimiento" activo | Avatar estático con una pose por sección, cambio por fundido, sin seguimiento del cursor |
| Móvil | Ver apartado 9 |

---

## 7. Secciones en detalle

### 7.1 Inicio

- **Contenido**: saludo, nombre "Ander Varela", rol "Frontend Developer", frase de presentación de una línea, ubicación (A Coruña · híbrido/remoto).
- **Acciones**: "Ver proyectos" (scroll a `#proyectos`), "Descargar CV".
- **Detalle**: indicador de "haz scroll" que desaparece al empezar a bajar.

### 7.2 Sobre mí

- Dos o tres párrafos cortos en primera persona: desarrollador frontend con visión full-stack, obsesionado con que el código sea predecible y fácil de mantener, y que usa la IA como multiplicador de productividad.
- Tres datos destacados en formato cifra: **10 · Matrícula de Honor** en el TFM, **2 hackatones ganados**, **AWS Certified Cloud Practitioner**.
- Idiomas: español y gallego nativos, inglés técnico profesional.

### 7.3 Experiencia

Línea de tiempo. La sección se fija y los hitos avanzan con el scroll.

**Frontend Developer — Kelea** · A Coruña · mayo 2025 – actualidad

- Estandaricé los componentes de UI con React y TypeScript estricto para reducir bugs y horas de QA.
- Monté una arquitectura de estado global con Zustand que evita re-renderizados innecesarios y datos desincronizados.
- Protegí el repositorio con Husky, Commitlint y Playwright.
- Hago de puente entre front y back en la definición de contratos y el consumo de APIs.

Cada punto muestra las tecnologías implicadas como etiquetas.

### 7.4 Proyectos

Rejilla o carrusel de tarjetas. **Todas las tarjetas son clicables** y abren el detalle del proyecto.

| # | Proyecto | Tipo | Resumen |
|---|---|---|---|
| 1 | **RequiFy** | Extensión de Chrome (Manifest V3) + SPA | Mocking de peticiones HTTP (latencia, patrones) para que el frontend no dependa del backend. TFM con Matrícula de Honor (10). |
| 2 | **Este portfolio** | Web | La propia web: avatar ilustrado, capas y scroll animado. |
| 3 | **Web de Panadería Rubicón** | Web corporativa | Web de la panadería: catálogo, reseñas y horario. |
| 4 | **Gestión de facturas — Panadería Rubicón** | Aplicación de escritorio | Lee, renombra y archiva las facturas recibidas. |
| 5 | **Gestión de catálogo — Panadería Rubicón** | SPA | Panel para gestionar todo lo que muestra la web: catálogo, horario, avisos, equipo y contacto. |
| 6 | **STACKSPECT · HackSpain '26** | Hackatón | Paletizado robótico medido episodio a episodio, para THEKER Robotics. 1.er premio. |
| 7 | **Chatbot para Denodo · HackUDC '25** | Hackatón | Chat para consultar bases de datos en lenguaje natural, reto de Denodo. 1.er premio. |

**Tarjeta**: imagen o captura, nombre, tipo, resumen de una línea, etiquetas de tecnología y distintivo si tiene premio.

**Detalle del proyecto** (capa 5, superpuesta):

- Se abre sobre la página sin navegar; la página de fondo queda bloqueada y atenuada.
- Contenido: título, problema que resuelve, qué hice yo, stack, galería de capturas y enlaces.
- Enlaces según disponibilidad: **"Ver web"** (proyecto en producción), **"Ver código"** (repositorio) y **"Ver demo"**. Si el proyecto es privado (por ejemplo, la gestión de facturas), se muestra como caso de estudio con capturas y la etiqueta "Proyecto privado", sin enlaces externos.
- Navegación a proyecto anterior/siguiente sin cerrar.
- Se cierra con el botón de cerrar, con `Esc` o pulsando fuera. Al cerrar, se vuelve a la misma posición de scroll.
- Cada detalle tiene URL propia (`#proyectos/requify`) para poder compartirlo.
- La tarjeta de "Este portfolio" enlaza a su repositorio en lugar de a sí misma.

### 7.5 Hackatones y logros

- **HackSpain '26** — 1.er premio. Automatización industrial para THEKER Robotics. 36 horas.
- **HackUDC '25** — 1.er premio. Ganador del reto corporativo de Denodo. 36 horas.
- **Matrícula de Honor (10)** en la defensa del TFM.
- **AWS Certified Cloud Practitioner**.

Cada hackatón enlaza con su proyecto en la sección anterior.

### 7.6 Estudios

- **Máster Universitario en Ingeniería Informática (MUEI)** — Universidade da Coruña · 2024–2026. TFM con Matrícula de Honor (10).
- **Grado en Ingeniería Informática**, mención en Ingeniería del Software — Universidade da Coruña · 2020–2024.

### 7.7 Skills

Agrupadas por áreas, sin barras de porcentaje ni niveles numéricos.

| Área | Tecnologías |
|---|---|
| Frontend (core) | React, TypeScript, JavaScript, Zustand, Vite, HTML, CSS Modules |
| Testing y calidad | Playwright, Husky, Commitlint, Git |
| IA aplicada | Prompt engineering, orquestación de agentes y skills, integración de MCPs, optimización de consumo de tokens |
| Full-stack | Java, Spring Boot, Node.js, diseño de APIs REST, Docker, AWS |

Al pasar el cursor por una tecnología, se resaltan los proyectos y experiencias donde se usó.

### 7.8 Contacto

- Frase de cierre cercana e invitación a escribir.
- Enlaces: **email** (`ander@andervarela.es`, con botón de copiar), **LinkedIn** (`linkedin.com/in/andervarela`), **GitHub** (`github.com/AnderVarela`).
- Botón "Descargar CV".
- Sin formulario y sin teléfono.
- Pie mínimo: año, nombre y enlace al código de la web.

---

## 8. Idiomas y tema

### 8.1 Idiomas

- Español (por defecto) e inglés.
- En la primera visita se usa el idioma del navegador si es uno de los dos; en otro caso, español.
- El cambio de idioma es instantáneo, no recarga la página y conserva la posición de scroll.
- La elección se recuerda en visitas posteriores.
- El CV descargable corresponde al idioma activo si existe esa versión; si no, se descarga el español.
- Todos los textos se traducen, incluidos los detalles de proyecto, los textos alternativos y los metadatos.

### 8.2 Tema

- Oscuro por defecto, con conmutador a claro.
- En la primera visita se respeta la preferencia del sistema.
- La elección se recuerda.
- La iluminación del avatar se adapta al tema.

---

## 9. Comportamiento responsive

| Ancho | Avatar | Contenido |
|---|---|---|
| **Escritorio** (≥ 1024 px) | Tamaño completo, cambia de lado según la sección, sigue el cursor | Ocupa la zona libre junto al avatar |
| **Tableta** (768–1023 px) | Tamaño medio, posiciones simplificadas (izquierda/derecha) | Una columna junto al avatar |
| **Móvil** (< 768 px) | Pequeño, anclado a una esquina inferior; grande solo en Inicio. Poses simplificadas y sin seguimiento del cursor | Una columna a ancho completo; el avatar no tapa texto ni botones |

En móvil se puede minimizar el avatar tocándolo.

---

## 10. Requisitos no funcionales

### 10.1 Rendimiento

- El texto del Inicio es visible y legible antes de que cargue el modelo 3D.
- El modelo y las animaciones se cargan de forma diferida.
- Objetivo de fluidez: 60 fps en escritorio y 30 fps estables en móvil de gama media.
- Objetivo Lighthouse: ≥ 90 en rendimiento (escritorio), accesibilidad, buenas prácticas y SEO.
- El 3D se pausa cuando la pestaña no está visible.

### 10.2 Accesibilidad

- Nivel WCAG 2.2 AA: contraste, foco visible, navegación completa por teclado.
- Todo el contenido está en HTML real, accesible a lectores de pantalla; el avatar es decorativo y lleva una descripción breve.
- Se respeta `prefers-reduced-motion` (ver 6.5).
- El detalle de proyecto atrapa el foco mientras está abierto y lo devuelve a la tarjeta al cerrarse.

### 10.3 SEO y compartición

- Metadatos, Open Graph e imagen de vista previa por idioma.
- Datos estructurados de tipo `Person`.
- Etiquetas `hreflang` para los dos idiomas.

### 10.4 Privacidad

- Sin cookies de terceros ni rastreo. Si se añade analítica, será sin cookies.

### 10.5 Compatibilidad

- Últimas dos versiones de Chrome, Firefox, Safari y Edge; iOS Safari y Chrome en Android.

---

## 11. Propuesta técnica

| Área | Elección |
|---|---|
| Base | React + TypeScript + Vite |
| 3D | React Three Fiber (Three.js), modelo en GLB |
| Animación y scroll | GSAP con ScrollTrigger |
| Estado | Zustand (idioma, tema, sección activa, proyecto abierto) |
| Estilos | CSS Modules con variables para los temas |
| Idiomas | Ficheros de traducción por idioma (ES / EN) |
| Calidad | Playwright, Husky, Commitlint |
| Despliegue | GitHub Pages en `andervarela.es`, publicado con GitHub Actions |

El contenido (experiencia, proyectos, skills) vive en ficheros de datos separados del código, para poder actualizarlo sin tocar componentes.

---

## 12. Diseño

- Dirección: **oscuro tech** — fondo oscuro, un color de acento, tipografía monoespaciada en los detalles, sensación de IDE refinado. Con variante clara.
- No hay color de marca definido. Se pedirán a Claude Design **tres versiones con paletas distintas**, elegidas libremente, para escoger una.
- El prompt de diseño está en `prompt-claude-design.md`.

---

## 13. Pendientes

Información que falta para completar el contenido:

| # | Pendiente | Afecta a |
|---|---|---|
| 1 | Nombre, descripción y stack de los proyectos de HackSpain '26 y HackUDC '25 | Proyectos, Logros |
| 2 | URL de la web de Panadería Rubicón | Proyectos |
| 3 | Confirmar qué proyectos de Rubicón son públicos, cuáles privados, y si hay permiso para mostrar capturas | Proyectos |
| 4 | Enlaces a repositorios (RequiFy, portfolio, hackatones) | Proyectos |
| 5 | Capturas de pantalla de cada proyecto | Proyectos |
| 6 | Las cinco fotos de referencia para el avatar | Avatar |
| 7 | Decidir quién modela el avatar (herramienta de IA, modelador 3D o propio) | Avatar |
| 8 | Versión del CV en inglés | Descarga de CV |
| 9 | Elegir una de las tres paletas tras el prototipo | Diseño |
