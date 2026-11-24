# Greenway Living System

Implementación del 15 de septiembre de 2026. Evoluciona la dirección editorial existente; no cambia servicios, cifras, datos comerciales ni rutas.

## Los cinco momentos

1. Awakening: el Flow del hero responde al movimiento con peso, energía y reposo. La foto recibe la perspectiva del mismo motor. Las ondas son transitorias y requieren proximidad a la trayectoria.
2. Connection: la geometría compartida continúa en métricas y propósito, detrás de fotografías y texto. Las páginas interiores reutilizan una versión contenida.
3. Ecosystem: ramificación progresiva, preview al hover/foco, nodos visitados durante la sesión, relaciones manuales y arrastre con momentum. En móvil el anillo tiene botones reales de 44px; el gesto horizontal no captura el scroll vertical.
4. Transformation: la misma curva se convierte progresivamente en trazado, puntos y retícula; el avance descubre las interfaces existentes de EcoEvent. En móvil se pueden explorar escritorio y teléfono por swipe o botones.
5. Cycle: al llegar al final, los puntos de control convergen en un ciclo cerrado que recuerda al comienzo.

## Arquitectura

- `LivingProvider`: una instancia por árbol de rutas, estado efímero y contexto estable.
- `motion-engine.ts`: un muestreador de puntero y scroll; RAF bajo demanda; posición, velocidad, dirección, energía, modo y servicio activo. No actualiza React por frame.
- `motion-physics.ts`: normalización, damping exponencial y resortes con paso acotado.
- `GreenwayFlow` + `flow-geometry.ts`: una base Bézier común; sus seis variantes comparten geometría, partículas y entradas. Coordenadas SSR redondeadas para evitar diferencias numéricas de hidratación.
- `useKineticDrag`: intención horizontal, captura de puntero tras umbral, inercia acotada, resorte y snap; captura cancelable y limpieza de listeners.
- `ServiceOrbit`: alternativa táctil estructural al escenario de escritorio; todas las opciones siguen siendo botones accesibles.
- `TechnologyExperience`: exploración táctil con alternativa de botones.
- `service-relations.ts`: relaciones explícitas según los alcances comerciales existentes; sin asociaciones aleatorias.

Estados internos: dormant, awakening, flowing, connecting, expanding, digitizing, completing. Eventos: section, node, metric, cta, activate, drag-start, drag-end, technology, cycle. No se muestran nombres técnicos en la interfaz.

## Límites y accesibilidad

Rotación ambiental menor que ±2°/±3°, sin scroll hijacking, canvas o WebGL. Una respiración CSS de 9.7 s solo en entidades visibles. El motor detiene el RAF tras asentarse y al ocultarse la pestaña. Las representaciones ocultas por responsive tampoco se animan.

Reduced motion conserva geometría y controles, elimina movimiento continuo/parallax y permite explorar sin gestos. Low-memory/save-data/capacidad de CPU reducen la calidad; una sesión con frames lentos degrada el muestreo. CSS/SVG para transform, opacity y revelado; ninguna dependencia adicional.

Los contadores se activan secuencialmente cuando el Flow alcanza sus indicadores. Los valores son los mismos del repositorio; las cifras sin confirmar siguen sin números. Las imágenes y dispositivos referenciales conservan su identificación.

No se escribe en cookies, localStorage o sessionStorage. La memoria de servicios visitados vive en el proveedor y desaparece al recargar. El contenido comercial permanece en HTML renderizado en servidor.

## Verificación

Pruebas en `living-system.spec.ts`: mouse, touch real por protocolo Chromium, scroll vertical, relaciones válidas, memoria de nodos, reduced motion y cierre de ciclo. `living-visual.spec.ts` registra los cinco momentos en escritorio/móvil. `living-performance.spec.ts` mide FPS, p95 de frame, CPU, heap, CLS y LCP con cuatro perfiles sintéticos. Las mediciones no sustituyen pruebas en hardware físico ni datos de usuarios reales.

Capturas y resultados: `artifacts/living-system/`. Se mantienen las pruebas previas de rutas, SEO, formulario, navegación y responsive.
