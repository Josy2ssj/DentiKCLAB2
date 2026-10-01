# Timeline Branch Geometry Refinement

## Cambios Implementados

### 1. Ramas Orgánicas Determinísticas

**Antes:**
- Ramas verticales rectas
- Todos los nodos alineados verticalmente
- Sin variación visual

**Ahora:**
- Ramas con curvas suaves usando SVG paths (cubic bezier)
- 3 variantes determinísticas basadas en el índice de la orden:
  - Variante 0: Tallo de 40px, sin desplazamiento horizontal, nodo en Y=60px
  - Variante 1: Tallo de 50px, desplazamiento -15px, nodo en Y=80px
  - Variante 2: Tallo de 45px, desplazamiento +15px, nodo en Y=70px
- Las variantes se aplican cíclicamente según el índice de la orden
- Layout determinístico: misma orden siempre aparece en la misma posición

### 2. Eje Principal del Timeline

**Mantenido:**
- Línea horizontal perfectamente recta en `top: 80px`
- Gradiente sutil de transparent a #CBD5E1
- Ancho de 2px
- No se curva ni ondula

### 3. Anclajes de Día

**Mantenido:**
- Días vacíos: punto gris pequeño (8px)
- Días con órdenes: punto azul más grande (12px) con glow
- Día actual: borde azul de 2px
- Alineados en el eje principal

### 4. Nodos de Orden

**Mejorado:**
- Tamaño: 48px (w-12 h-12)
- Fondo blanco con sombra suave
- Borde sutil del color del estado (20% opacidad)
- Icono de tratamiento en el centro (18px)
- Indicador de estado en esquina superior derecha (16px)

**Glow Refinado:**
- Efecto de luz ambiental más sutil
- Opacidad base: 0.4 (antes 0.6)
- Opacidad hover: 0.8 (antes 1.0)
- Escala base: 1.4x (antes 1.5x)
- Escala hover: 1.8x (antes 2.0x)
- Blur: 6px (antes 4px) para difusión más suave

**Indicador de Estado:**
- Glow más refinado con múltiples capas:
  - Borde blanco de 2px
  - Glow interno de 10px
  - Glow externo de 20px
- Opacidad base: 0.85
- Opacidad hover: 1.0
- Transición suave de 200ms

### 5. Comportamiento Hover

**Nodo:**
- Escala a 1.08x (antes 1.1x) para ser más sutil
- Sombra se intensifica con glow del estado
- Borde del estado se hace más visible (40% opacidad)

**Tooltip:**
- Aparece arriba del nodo (-top-24)
- Centrado horizontalmente
- Ancho de 208px (w-52)
- Fondo blanco translúcido con blur
- Información: paciente, tratamiento, estado, responsable

### 6. Posicionamiento de Ramas

**Estructura:**
```
Eje Principal (top: 80px)
    ↓
Anclaje de Día
    ↓
Rama SVG (curva bezier)
    ↓
Nodo de Orden (posicionado absolutamente)
```

**Variantes Visuales:**
- Rama 1: Desciende recto, nodo centrado
- Rama 2: Curva hacia la izquierda, nodo desplazado -15px
- Rama 3: Curva hacia la derecha, nodo desplazado +15px

**Alturas Escalonadas:**
- Nodo 1: Y=60px (más arriba)
- Nodo 2: Y=80px (más abajo)
- Nodo 3: Y=70px (intermedio)

Esto crea un ritmo visual escalonado que evita la monotonía.

### 7. SVG Branches

**Implementación:**
- SVG absoluto superpuesto al contenedor de ramas
- Paths con curvas cubic bezier para suavidad
- Color: #CBD5E1 con 60% opacidad
- Ancho de trazo: 1.5px
- Bordes redondeados (strokeLinecap="round")

**Cálculo de Curvas:**
```javascript
startX = 50%  // Centro de la columna del día
startY = 0    // Top del área de ramas
endX = startX + offsetX  // Desplazamiento horizontal
endY = nodeY             // Posición vertical del nodo

control1X = startX
control1Y = startY + stemLength * 0.5
control2X = endX
control2Y = endY - curveDepth

Path: M startX startY C control1X control1Y, control2X control2Y, endX endY
```

### 8. Overflow de Órdenes

**Mantenido:**
- Máximo 3 órdenes visibles por día
- Indicador "+N" para órdenes adicionales
- Posicionado en la parte inferior del área de ramas

## Archivos Modificados

1. **src/components/Timeline.tsx**
   - Reemplazada sección de ramificación (líneas 226-256)
   - Agregado sistema de variantes determinísticas
   - Implementado SVG paths para curvas orgánicas
   - Refinado glow de nodos (líneas 459-493)
   - Posicionamiento absoluto de nodos en ramas

## Verificación de Aceptación

- [x] Línea principal del timeline perfectamente recta
- [x] Anclajes de día alineados en la línea principal
- [x] Días vacíos visualmente discretos
- [x] Ramas con curvas controladas y desviaciones orgánicas
- [x] No todas las ramas tienen geometría idéntica
- [x] Nodos en posiciones verticales variadas
- [x] Algunos nodos con desplazamiento horizontal sutil
- [x] Múltiples órdenes del mismo día se ramifican visiblemente
- [x] Ramas no crean "espagueti" visual
- [x] Ramas no se cruzan innecesariamente
- [x] Nodos no colisionan
- [x] Cada orden pertenece claramente a su fecha correcta
- [x] Glow de estado visible y refinado
- [x] Layout de ramas determinístico (no aleatorio)
- [x] Hover no causa movimiento de layout
- [x] Geometría actual del Home sin cambios
- [x] Build exitoso

## Características Clave

### Determinismo
- Mismo orden → misma posición siempre
- Basado en índice de orden dentro del día
- No usa Math.random() ni timestamps

### Orgánico pero Controlado
- Curvas suaves con bezier cúbico
- Variación en profundidad, desplazamiento y altura
- Sin colisiones ni cruces innecesarios

### Visual Refinado
- Glow sutil pero visible
- Transiciones suaves de 200-300ms
- Sombras en capas para profundidad
- Bordes semitransparentes para integración

### Responsive
- SVG se adapta al ancho del contenedor
- Posicionamiento en porcentajes
- Mínimo de 280px de altura mantenido

## Próximos Pasos (No Implementados)

- Interacción de click en indicador "+N" para expandir
- Animación de entrada de ramas al cambiar de semana
- Tooltip inteligente que evita bordes del viewport
- Modo mes/año con densidad adaptativa
- Exportación de vista de timeline

## Notas Técnicas

- Las curvas bezier usan 3 variantes predefinidas
- El cálculo de posiciones es puramente matemático
- No hay dependencias externas para el layout
- SVG paths son generados dinámicamente pero determinísticamente
- El glow usa múltiples capas de box-shadow para profundidad
