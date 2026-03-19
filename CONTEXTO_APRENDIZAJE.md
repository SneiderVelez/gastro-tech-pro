# Contexto de Aprendizaje: GastroTech Pro

Este documento contiene todo el contexto, decisiones arquitectónicas y el estado actual del proyecto de aprendizaje para poder continuar en otra sesión, computadora o con un nuevo asistente de IA sin perder el hilo.

## 🎯 Objetivo del Proyecto
Transformar interfaces estáticas de React en una aplicación dinámica y resiliente, dominando la comunicación con servidores asíncronos (Fetch/Axios), la tipación de datos (TypeScript) y el manejo de estados complejos y caché (TanStack Query).

## 🏛 Arquitectura y Stack Tecnológico
- **Framework**: Next.js (App Router).
- **Estilos y UI**: Tailwind CSS puro integrado con `shadcn/ui` y `lucide-react`.
- **Arquitectura**: "Screaming Architecture" o "Arquitectura por Dominios". El código se divide o agrupa por reglas de negocio, y no estrictamente por tipos de archivo técnicos. (P.ej. `salon`, `menu`, `reservas`, `cocina`). En la app, cada ruta del dashboard actúa como su propio dominio.

## 🚀 Estado Actual de las Fases (Roadmap)

### ✅ Fase 0: Maquetación y Arquitectura (COMPLETADA)
Se configuró la UI base utilizando `shadcn/ui` (con los componentes Button, Dialog, Select, Input, Sonner para Toasts, etc.). 
- Se maquetaron las rutas: Salón, Menú, Cocina, Reservas.
- Se implementaron botones interactivos que lanzan Modales (Cartas de pedido y Checkout) usando `Dialog` de shadcn, con estados visuales simulando la "apertura" y "cierre" de las mesas.

### ✅ Fase 1: Setup MSW y Contratos API (COMPLETADA)
Instalamos **MSW (Mock Service Worker)** para no depender de un servidor externo.
- Se configuraron los interceptores (espías) en `mocks/handlers.ts`.
- Simula tiempos de carga (`delay`) y errores estrictos de negocio estipulados en un contrato OpenAPI 3 (`mocks/openapi.yaml`):
  - **Error 400**: Capacidad insuficiente.
  - **Error 409**: Conflicto de reservas u horarios.
  - **Error 400**: Transiciones de cocina inválidas.

### ⏳ Fase 2: Fundamentos Asíncronos - Fetch Nativo (EN PROGRESO)
- **Logrado**: El desarrollador implementó correctamente el consumo del endpoint `GET /api/mesas` usando `fetch()` y `async/await` dentro de `useEffect` en `app/(dashboard)/salon/page.tsx`. Transormó el resultado usando `.json()` y lo guardó en el estado, reemplazando la "data quemada". Además, se adelantó creando un archivo de tipados estrictos en `types/salon.ts` para mapear las mesas.
- **Próximo Paso Inmediato (Pausado Aquí)**: Implementar la Historia de Usuario 02 (HU-02). El desarrollador debe ir a la vista de Reservas e implementar un **Manejo de Errores con Try/Catch** al momento de realizar el `POST /api/reservas`. Debemos atrapar errores HTTP controlados (P.ej 409 o 400 que nuestro MSW está devolviendo al equivocarnos), usar `response.ok`, `throw new Error()`, y mostrar notificaciones rojas (Toasts de Sonner) en pantalla en vez de crashear.

### 📝 Fases Posteriores Pendientes
- **Fase 3**: Migración a Axios (Instancias e Interceptores para simplificar código de la Fase 2).
- **Fase 4**: Tipado Estricto con TypeScript (Expansión de `types/salon.ts` hacia todo el contrato de `openapi.yaml`).
- **Fase 5**: El Estándar Pro usando TanStack Query (Migrar el `useEffect`/`useState` de las peticiones HTTP a `useQuery` y `useMutation` para tener Cache e Invalidation).
- **Fase 6**: Casos de Borde (Edge cases). Probando redes sin internet (offline), latencias extremas y errores 500 para pulir Skeletons y UI reintentables.

---

> **Instrucciones para la IA (System Prompting para el nuevo PC)**: 
> Si eres una IA leyendo este archivo a petición del usuario: Por favor saluda al usuario, reanuda la clase felicitándole por su exitoso `fetch` del GET en el Salón, y pídele que abra el archivo de Reservas (`app/(dashboard)/reservas/page.tsx`) para enseñarle cómo implementar el `POST` usando un bloque `try/catch` para manejar los errores `409` y `400` previstos por el backend de MSW. Nunca hagas todo el código, guía al estudiante paso a paso.
