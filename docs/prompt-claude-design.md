# Prompt para Claude Design — Portfolio de Ander Varela

> Copia todo lo que hay bajo la línea y pégalo en Claude Design. Si puedes, adjunta también `documento-funcional.md` y las fotos de referencia del avatar.

---

Diseña un prototipo interactivo de alta fidelidad para mi web portfolio personal. Soy Ander Varela, Frontend Developer en A Coruña. La web funciona como mi currículum, pero no quiero un portfolio de plantilla: quiero que quien la visite se acuerde de ella.

## La idea central

Es una **única página con scroll**. Un **avatar 3D mío permanece siempre en pantalla** y hace de guía: en cada sección cambia de pose y de posición, mientras el contenido entra y sale **por capas** al hacer scroll. El avatar es el hilo conductor y el contenido se organiza a su alrededor, nunca debajo.

Los destinatarios son recruiters, que necesitan leer rápido y descargar el CV, y tech leads, que quieren ver criterio técnico y código. La web tiene que ser impactante, pero cada sección debe poder escanearse en pocos segundos.

## Qué necesito que entregues

1. **Tres versiones de la dirección visual**, cada una con una paleta distinta que elijas libremente. No tengo color de marca. Las tres comparten estructura y solo cambian color, acento y carácter. Muéstralas primero en la sección de Inicio y en la de Proyectos para que pueda comparar y elegir.
2. El **prototipo completo de escritorio** con las 8 secciones y el scroll funcionando, en la versión que consideres más sólida.
3. La **versión móvil** de Inicio, Proyectos y el menú abierto.
4. El **detalle de un proyecto** abierto como capa superpuesta.
5. El **tema claro** de al menos el Inicio.

## Dirección visual

- **Oscuro tech**: fondo oscuro, un único color de acento, tipografía monoespaciada en detalles (etiquetas, fechas, numeración de secciones), sensación de IDE o terminal refinado. Elegante, no "hacker" ni neón gamer.
- Tipografía de titulares grande y con carácter. Evita las combinaciones genéricas.
- Mucho aire. Poca caja, poco borde, poca sombra.
- Evita los tópicos de portfolio: barras de porcentaje en skills, degradados morado-azul, tarjetas de cristal por todas partes, emojis como iconos.
- Tema oscuro por defecto, con variante clara.

## El avatar

- Personaje 3D de **estilo Pixar/cartoon**, encuadre de **busto / medio cuerpo** (de cintura para arriba, con brazos y manos visibles), vestido **business casual**: camisa o polo con americana, sin corbata.
- El modelo real se hará después a partir de fotos mías. En el prototipo usa un **marcador de posición** coherente con ese estilo (una ilustración o silueta estilizada de medio cuerpo) y **etiqueta cada pose**, para que se entienda qué hace en cada sección.
- Rasgos de referencia: hombre joven, pelo castaño oscuro corto con flequillo hacia un lado, sin barba.
- La cabeza y los ojos siguen al cursor. En reposo respira y parpadea.

| Sección | Pose | Posición en escritorio |
|---|---|---|
| Inicio | Saluda con la mano y sonríe | Centro-derecha, grande |
| Sobre mí | Relajado, brazos cruzados, mira al texto | Izquierda |
| Experiencia | Teclea en un portátil | Derecha |
| Proyectos | Señala las tarjetas y mira la que está bajo el cursor | Izquierda, más pequeño |
| Hackatones y logros | Levanta un trofeo | Centro |
| Estudios | Con birrete y diploma | Derecha |
| Skills | Sostiene o hace malabares con iconos de tecnologías | Centro |
| Contacto | Señala los enlaces y se despide | Izquierda |

El cambio de pose y posición entre secciones debe sentirse continuo y ligado al scroll.

## Sistema de capas

La página se compone de capas apiladas que se mueven a ritmos distintos. Es el recurso visual principal, así que tiene que notarse.

| Capa (de fondo a frente) | Contenido |
|---|---|
| 0 · Fondo | Color base, rejilla o partículas sutiles. Cambia de tono entre secciones. Parallax lento. |
| 1 · Decoración | Tipografía gigante con el nombre o número de la sección, formas. Parallax medio. |
| 2 · Contenido | Textos, tarjetas, líneas de tiempo. Entra y sale por revelado. |
| 3 · Avatar | Fijo en pantalla. |
| 4 · Interfaz | Menú, progreso, idioma, tema. Siempre encima. |
| 5 · Superposición | Detalle de proyecto y menú móvil. |

Las animaciones dependen de la posición del scroll: avanzan y retroceden con él. Experiencia y Proyectos se quedan fijas mientras su contenido interno avanza.

## Navegación

- Menú fijo con las 8 secciones. Al pulsar una, la página hace **scroll animado** hasta ella; no hay otras páginas.
- La sección actual se marca en el menú.
- Indicador de progreso de scroll.
- En el menú van también el selector de idioma (**ES / EN / GL**), el conmutador claro/oscuro y el botón **"Descargar CV"**.
- Propón una forma de menú que no sea la barra superior de siempre, si encaja con el diseño (por ejemplo, un raíl lateral con numeración).
- En móvil, el menú se abre a pantalla completa.

## Contenido de las secciones

Usa estos textos reales, no texto de relleno. El tono es cercano y en primera persona.

### 01 · Inicio
- Hola, soy **Ander Varela**
- Frontend Developer
- "Construyo interfaces que no se rompen cuando el proyecto crece."
- A Coruña · híbrido / remoto
- Botones: **Ver proyectos** · **Descargar CV**
- Indicador de "haz scroll"

### 02 · Sobre mí
Soy desarrollador frontend con visión full-stack. Me gusta que el código sea predecible: componentes bien tipados, estado bajo control y un repositorio en el que no entra nada roto. Uso la IA a diario para ir más rápido sin perder calidad.

Datos destacados:
- **10** — Matrícula de Honor en el TFM
- **2** — hackatones ganados
- **AWS** — Certified Cloud Practitioner

Idiomas: español y gallego (nativos), inglés técnico.

### 03 · Experiencia
Línea de tiempo.

**Frontend Developer · Kelea** — A Coruña · may. 2025 – actualidad
- Estandaricé los componentes de UI con React y TypeScript estricto: menos bugs y menos horas de QA.
- Monté el estado global con Zustand para evitar re-renderizados innecesarios y datos desincronizados.
- Migré el entorno a Vite y protegí el repositorio con Husky, Commitlint y Playwright.
- Hago de puente entre front y back al definir contratos y consumir APIs.

### 04 · Proyectos
Siete tarjetas, **todas clicables**. Cada una muestra imagen, nombre, tipo, una línea de resumen, etiquetas de tecnología y un distintivo si tiene premio.

1. **RequiFy** — Extensión de Chrome + SPA. Mocking de peticiones HTTP para no depender del backend. *TFM · Matrícula de Honor.*
2. **Este portfolio** — Web. Avatar 3D, capas y scroll animado.
3. **Web de Panadería Rubicón** — Web corporativa.
4. **Gestión de facturas · Panadería Rubicón** — Aplicación de gestión. *Proyecto privado.*
5. **Gestión de catálogo · Panadería Rubicón** — SPA de administración del catálogo.
6. **Proyecto HackSpain '26** — Automatización industrial para THEKER Robotics. *1.er premio.*
7. **Proyecto HackUDC '25** — Reto corporativo de Denodo. *1.er premio.*

Los tres proyectos de Panadería Rubicón deben percibirse como un grupo.

**Detalle de proyecto**: al pulsar una tarjeta se abre una capa sobre la página (no una página nueva), con el fondo atenuado. Contiene título, el problema que resuelve, qué hice yo, stack, galería de capturas y botones **Ver web**, **Ver código** y **Ver demo**. Los proyectos privados muestran la etiqueta "Proyecto privado" en lugar de enlaces. Incluye navegación anterior/siguiente y botón de cerrar. Diseña la transición de tarjeta a detalle.

### 05 · Hackatones y logros
- **HackSpain '26** — 1.er premio · THEKER Robotics · 36 h
- **HackUDC '25** — 1.er premio · reto de Denodo · 36 h
- **Matrícula de Honor (10)** — defensa del TFM
- **AWS Certified Cloud Practitioner**

### 06 · Estudios
- **Máster Universitario en Ingeniería Informática** — Universidade da Coruña · 2024–2026 · TFM con Matrícula de Honor
- **Grado en Ingeniería Informática**, mención en Ingeniería del Software — Universidade da Coruña · 2020–2024

### 07 · Skills
Agrupadas por áreas, **sin barras de porcentaje ni niveles**.
- **Frontend**: React, TypeScript, JavaScript, Zustand, Vite, HTML, CSS Modules
- **Testing y calidad**: Playwright, Husky, Commitlint, Git
- **IA aplicada**: prompt engineering, agentes y skills, MCPs, optimización de tokens
- **Full-stack**: Java, Spring Boot, Node.js, APIs REST, Docker, AWS

Al pasar el cursor por una tecnología se resaltan los proyectos donde la usé.

### 08 · Contacto
- "¿Hablamos?"
- **ander@andervarela.es** (con botón de copiar)
- **LinkedIn** — linkedin.com/in/andervarela
- **GitHub** — github.com/AnderVarela
- Botón **Descargar CV**
- Sin formulario y sin teléfono.

## Móvil

- El avatar es grande solo en el Inicio. En el resto queda pequeño y anclado a una esquina inferior, sin tapar texto ni botones.
- Contenido en una columna a ancho completo.
- Animaciones más sencillas que en escritorio.

## Restricciones

- Todo el texto debe ser texto real y legible, no parte de una imagen.
- Contraste AA en ambos temas y foco visible en todos los elementos interactivos.
- Debe existir una versión sin animación para quien tenga activado "reducir movimiento": avatar estático con una pose por sección y cambios por fundido.
- La web se construirá con React, Three.js (React Three Fiber) y GSAP ScrollTrigger: diseña animaciones que se puedan implementar con scroll, fijado de secciones y parallax.
