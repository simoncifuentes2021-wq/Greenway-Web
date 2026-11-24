# Greenway — dirección de experiencia

Registro de la primera etapa. La evolución posterior a cinco momentos, interacción táctil y motor compartido está documentada en [Greenway Living System](greenway-living-system.md); sus decisiones sustituyen las restricciones de movimiento de esta propuesta inicial.

## Auditoría previa (14 septiembre 2026)

Base: Next 16.3.3, React 19, Tailwind 4, CSS Modules. Sin librerías de motion o WebGL. Componentes de servidor con islas interactivas. Árbol limpio al comenzar. Se revisaron home, navegación, footer, componentes compartidos, datos comerciales, rutas, formulario, SEO, assets y pruebas existentes; capturas iniciales en `artifacts/visual-audit/before-premium`.

Conservar: logo oficial, Manrope/Inter, verde bosque, diez servicios y sus URLs, contenidos técnicos, cifras marcadas como confirmadas en data/site.ts, metadatos y schema, selección de servicio al cotizar, art direction móvil de fotografía. La cifra 42.000 no tiene unidad: no inferir toneladas. Las fotos temporales, personas ficticias y dispositivos ilustrativos deben seguir identificados como referencias. Dominio, contacto, backend de cotización, WhatsApp y portal no están configurados; no simularlos.

Problemas: hero sin control suficiente del contraste móvil; peso tipográfico y bloques repetidos; saltos entre superficies; exceso de halos en servicios; selección con retraso artificial de 620 ms; cuatro listeners de scroll para contadores; falta de enlace de salto y confinamiento del foco en menú móvil; múltiples fotografías grandes sin una relación de composición; placeholders comerciales dominan algunas secciones.

## Los cuatro momentos

1. Terreno: hero panorámico con jerarquía editorial, sombra cinematográfica, trayectoria de marca y profundidad de imagen (sin mover el texto).
2. Trayectoria: propósito editorial con fotografía recortada y recorrido continuo que baja al ecosistema. Scroll nativo y revelado de encabezados principales.
3. Operación conectada: conservar y evolucionar los diez nodos reales, conexiones y núcleo con materialidad; respuesta inmediata, mínima perspectiva, selector táctil independiente.
4. Evidencia: EcoEvent 360 explícitamente como capacidad Greenway; capas de dispositivos existentes, ejecución → medición → evidencia, cierre que retoma la trayectoria.

## Sistema

Bosque #163d35, petróleo #245d4f, papel #f5f4ed, blanco cálido #fdfcf8, oliva #a6b58a. Mantener verde de marca en logo; acento de texto claro solamente sobre superficies oscuras. Grid máximo 86rem, gutters fluidos, spacing basado en 4/8px, títulos Manrope y lectura Inter. Radios pequeños en controles, fotografías editoriales sin tarjetas. Texto continuo con ancho limitado. Sombras físicas solamente en núcleo y dispositivos.

Motion: fast 160ms, normal 280ms, slow 720ms, cinematic 1200ms; reutilizar --ease-out y --ease-in-out. Tres superficies de profundidad: foto hero, sistema de servicios, dispositivos. Máximo ±2°/±3°. Sin rotación continua, partículas, cursor sustituto ni scroll hijacking. Hover solo con pointer fine; reduced motion y móvil reciben composición estática. Contenido visible sin JavaScript. IntersectionObserver para entradas únicas. Transform y opacity para movimiento.

## Validación

Por bloques: capturas desktop/móvil, errores de consola, overflow, navegación y focus. Final: typecheck, lint, build, pruebas de rutas, servicios, menú, reduced motion, CLS y revisión visual a 360/390/768/1280/1440. Las mediciones locales no equivalen a Core Web Vitals de usuarios reales.

## Implementación y resultado

- Hero fotográfico con composición editorial, degradado hasta métricas, imagen responsive y prioridad alta. Calidad normalizada a 75 (configuración soportada por Next). Sin video automático.
- Trayectoria SVG propia reutilizada en hero, propósito, servicios, EcoEvent y cierre. Su menor contraste en propósito protege la lectura.
- `DepthSurface` limita la perspectiva a mouse de escritorio y restablece transformaciones al cambiar reduced motion; contenido y enlaces siguen renderizados en servidor.
- Ecosistema conserva los diez destinos, muestra conexiones y elimina la espera de 620 ms. Paneles comprobados con todos los servicios sin variaciones de altura.
- `StoryReveals` limita entradas a tres encabezados importantes, una vez por visita. Contadores con IntersectionObserver y valores finales persistentes.
- Menú móvil con Escape, foco confinado, contenido de fondo inerte y restauración al pasar a escritorio. Enlace de salto al contenido.
- EcoEvent se identifica como tecnología al servicio de la operación Greenway. Sus imágenes referenciales se cargan al aproximarse la sección: se corrigió un caso en que la carga diferida nativa no se activaba dentro de los planos superpuestos.
- Cierre marfil/oliva y footer con continuidad de marca. Sin dependencias nuevas, sin modificar datos comerciales ni rutas.

Validación: compilación de producción y lint correctos; 41 pruebas de regresión de home, páginas de servicio, sitios institucionales, metadatos, schema y formulario pasaron. Capturas finales por escena en `artifacts/premium`; mediciones locales en `artifacts/premium/performance-local.json`. CLS local observado: 0 en escritorio y móvil. No es una certificación de accesibilidad ni una medición de rendimiento de usuarios reales.

Pendientes comerciales preexistentes: fotografías reales aprobadas, casos de proyectos, logos autorizados, unidad de la cifra 42.000, datos de contacto, dominio definitivo, URL EcoEvent y backend del formulario. No se inventaron ni se simularon estos elementos.
