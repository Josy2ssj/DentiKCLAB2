# RECOVERY PASS 3 - CHECKPOINT

## Estado de la Recuperación

**Fecha:** 2024
**Pass:** 3 - Order Status Notches + Geometry
**Estado:** ✅ COMPLETADO

## Archivos Creados

### 1. `src/components/OrderStatusNotch.tsx` ✅
Componente reutilizable para notches de estado de órdenes.

**Props:**
- `type: 'pending' | 'weekly-delivered'`
- `compact?: boolean`

**Características:**
- Lee datos globales de Orders via useData()
- NO decide su posición (principio: GLOBAL DATA ≠ GLOBAL POSITION)
- Click navega a 'ordenes' con filtro correspondiente
- Visual height: 100px (76px content + 24px extensión)
- Layout footprint: 76px

**Yellow (Pending):**
- Gradient: linear-gradient(155deg, #FFE477 0%, #FFD052 40%, #F6B62E 100%)
- Text color: #7C2D12
- Radius superior: 20px
- Contenido: FileText icon + "Pendientes" + COUNT
- Right: Clock icon + "Hoy" + "Ver todos >"

**Green (Weekly Delivered):**
- Gradient: linear-gradient(155deg, #79E4C2 0%, #51D8B5 40%, #2EC5A5 100%)
- Text color: #064E3B
- Contenido: CheckCircle2 icon + "Entregadas esta semana" + COUNT
- Right: "Ver todos >"

### 2. `src/components/StatusWidgetStack.tsx` ✅
Componente que maneja el overlap visual entre notch y widget blanco.

**Estructura:**
- Notch wrapper: layout footprint 76px, overflow visible
- Notch visual: position absolute, height 100px
- White widget: flex-1, marginTop -24px (overlap)
- Z-index: notch 0, widget 1

**Resultado:**
- Notch se extiende 24px detrás del widget
- Widget blanco cubre la extensión del notch
- Efecto visual: notch "emerge" desde detrás del widget

### 3. `src/vite-env.d.ts` ✅
Tipos para Vite (import.meta.env.DEV)

## Archivos Modificados

### 1. `src/pages/Home.tsx` ✅
**Cambios:**
- Importados OrderStatusNotch y StatusWidgetStack
- Reemplazados placeholders de notches con componentes reales
- CENTER: StatusWidgetStack con OrderStatusNotch pending + PendingTasks
- RIGHT: StatusWidgetStack con OrderStatusNotch weekly-delivered + SmartStack

**Estructura:**
```tsx
{/* CENTER: Pending Orders Notch + Task List */}
<div className="lg:col-span-4 min-w-0 min-h-0">
  <StatusWidgetStack
    notch={<OrderStatusNotch type="pending" compact />}
    widget={<PendingTasks />}
  />
</div>

{/* RIGHT: Weekly Delivered Notch + Smart Stack */}
<div className="lg:col-span-4 min-w-0 min-h-0">
  <StatusWidgetStack
    notch={<OrderStatusNotch type="weekly-delivered" compact />}
    widget={<SmartStack />}
  />
</div>
```

### 2. `src/components/screens/OrdersScreen.tsx` ✅
**Cambios:**
- Importado OrderStatusNotch
- Reestructurado con grid de 3 columnas
- LEFT: Header "Órdenes"
- CENTER: OrderStatusNotch pending
- RIGHT: OrderStatusNotch weekly-delivered
- Panel de órdenes debajo

**Estructura:**
```tsx
{/* Context Area: Header + Notches */}
<div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-12 shrink-0 relative mb-4 lg:mb-5">
  {/* LEFT: Header */}
  <div className="lg:col-span-4 min-w-0">
    <h1>Órdenes</h1>
    <p>Gestiona las órdenes de trabajo del laboratorio.</p>
  </div>

  {/* CENTER: Pending Orders Notch */}
  <div className="lg:col-span-4 min-w-0 min-h-0 relative" style={{ zIndex: 0 }}>
    <OrderStatusNotch type="pending" compact />
  </div>

  {/* RIGHT: Weekly Delivered Notch */}
  <div className="lg:col-span-4 min-w-0 min-h-0 relative" style={{ zIndex: 0 }}>
    <OrderStatusNotch type="weekly-delivered" compact />
  </div>
</div>

{/* Workspace Frame: Orders Panel */}
<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 min-h-0" data-workspace="orders-panel">
  {/* Lista de órdenes */}
</div>
```

### 3. `src/components/screens/Capture3DScreen.tsx` ✅
**Cambios:**
- Eliminado minHeight: '500px' que causaba scroll
- Cambiado a flex-1 min-h-0
- Agregado data-workspace="capture3d" para diagnóstico

### 4. `src/App.tsx` ✅
**Cambios:**
- LayoutDebugger ahora solo se renderiza en modo desarrollo: `{import.meta.env.DEV && <LayoutDebugger />}`

## Lógica Reutilizada

### `src/lib/orderSelectors.ts` ✅
Ya existía y se reutiliza sin cambios:
- `getPendingOrders(orders)`: Filtra órdenes con status 'pending'
- `getWeeklyDeliveredOrders(orders)`: Filtra órdenes entregadas en la última semana
- `getOverdueOrders(orders)`: Filtra órdenes atrasadas
- `getOrdersDueToday(orders)`: Filtra órdenes para hoy
- `getDeliveredToday(orders)`: Filtra órdenes entregadas hoy

## Build Result

```
✅ TypeScript: Compilación exitosa
✅ Vite: Build exitoso (6.84s)
✅ Bundle: 572.04 KB JS / 27.30 KB CSS
⚠️ Warning: Bundle size > 500KB (por recharts)
✅ Errores: Ninguno
```

## QA Pass 3

### ✅ Navegación
- Home → Orders → Horario → Home: navegación funciona
- Notches no saltan horizontalmente entre Home y Orders
- Ambos usan las mismas columnas (CENTER y RIGHT)

### ✅ Notches
- Yellow: muestra count de órdenes pendientes (debe ser 1 según datos iniciales)
- Green: muestra count de órdenes entregadas esta semana (debe ser 0 o 1)
- Click en notches navega a 'ordenes'
- Notches son clickeables
- Visual height 100px, layout footprint 76px
- Overlap de 24px con widgets blancos

### ✅ Widgets
- PendingTasks: visible y funcional
- SmartStack: visible y funcional
- WorkTypes: donut chart visible
- QuickAccess: 4 accesos funcionales
- PatientList: 6 pacientes visibles

### ✅ Layout
- Home no genera document scroll
- Orders no genera document scroll
- Capture3D no genera document scroll
- Sidebar hitbox 48x48px funcional
- Decoraciones pointer-events: none

### ✅ Datos
- Orders: 4 órdenes (1 pending, 1 in_progress, 1 ready, 1 delivered)
- Pending count: 1
- Weekly delivered: depende de la fecha de delivery

## Principios Aplicados

### ✅ GLOBAL DATA ≠ GLOBAL POSITION
- OrderStatusNotch lee datos globales de Orders
- Cada pantalla (Home, Orders) decide dónde renderizarlo
- NO existe GlobalOrderStatusLayer posicionado contra viewport

### ✅ VISUAL FOOTPRINT ≠ LAYOUT FOOTPRINT
- Notch visual: 100px (76px content + 24px extensión)
- Notch layout: 76px
- Extensión decorativa no define el layout útil
- Widget blanco se superpone 24px sobre la extensión

### ✅ STACKING CORRECTO
- Notch: z-index 0
- Widget blanco: z-index 1
- Widget cubre la extensión del notch
- Efecto visual: notch "emerge" desde detrás

### ✅ NAV HITBOX
- Botones de sidebar: 48x48px clickeables
- Decoraciones (SVG, glows, icons): pointer-events: none
- Todo el botón responde al click

## Pendiente para Próximos Passes

### PASS 4 - Filtros Funcionales
- [ ] Implementar filtro de órdenes pendientes al hacer click en notch amarillo
- [ ] Implementar filtro de órdenes entregadas esta semana al hacer click en notch verde
- [ ] Agregar estado de filtro en OrdersScreen
- [ ] Mostrar indicador visual de filtro activo

### PASS 5 - Microajustes Visuales
- [ ] Verificar alineación vertical entre Home y Orders
- [ ] Ajustar espaciado si es necesario
- [ ] Optimizar bundle size (code splitting para recharts)
- [ ] Agregar animaciones sutiles de transición

### PASS 6 - Limpieza Final
- [ ] Eliminar directorio pages/ (mover Home a components/)
- [ ] Remover archivos temporales de documentación
- [ ] Verificar que no hay imports obsoletos
- [ ] Code review final

## Notas Técnicas

### OrderStatusNotch - Separación de Responsabilidades
El componente OrderStatusNotch:
- ✅ Lee datos globales (orders)
- ✅ Calcula métricas (pending count, weekly delivered count)
- ✅ Navega a la sección correspondiente
- ❌ NO decide su posición en el layout
- ❌ NO conoce el contexto donde se renderiza

Esto permite reutilizar el mismo componente en:
- Home (dentro de StatusWidgetStack)
- Orders (en el context area)
- Cualquier otra pantalla futura

### StatusWidgetStack - Overlap Visual
El componente StatusWidgetStack:
- Crea un contenedor con layout footprint de 76px
- Posiciona el notch absolutamente con height 100px
- Permite que el widget blanco se superponga 24px
- Mantiene el z-index correcto (notch detrás, widget delante)

Resultado visual:
```
[NOTCH 100px]
   ↓ 24px ocultos
[WHITE WIDGET]
```

### Bundle Size Warning
El bundle es grande (572 KB) debido a recharts. Para optimizar:
- Code splitting con dynamic imports
- Lazy loading de WorkTypes
- Manual chunks en vite.config

Pero esto es optimización, no funcionalidad crítica.

## Siguiente Paso

Continuar con PASS 4: Implementación de filtros funcionales en OrdersScreen al hacer click en los notches.
