# DentiKC LAB OS — Protocolo de Recuperación

## SOURCE OF TRUTH

- **Repository:** Josy2ssj/DentiKCLAB2
- **Working Branch:** dentikc-lab-os-design-399a7
- **Último Commit Remoto Conocido:** 15e2a4a8197fb4c95fbd0e183c977c5984800963
- **Método de Recuperación:** GitHub API/raw content mediante web_fetch

**NOTA IMPORTANTE:** El SHA escrito arriba NO debe considerarse permanentemente fijo. La working branch es la referencia principal. En cada recuperación, consulta primero el HEAD actual de esa rama.

---

## PROTOCOLO "RECOVER PROJECT"

Cuando el usuario diga **"RECOVER PROJECT"**, ejecutar los siguientes pasos:

### 1. Verificar Estado del Workspace

Listar todos los archivos del workspace actual:
```
list_files(path=".")
```

### 2. Consultar HEAD Actual de la Working Branch

Obtener la referencia actual de la rama:
```
web_fetch(
  url="https://api.github.com/repos/Josy2ssj/DentiKCLAB2/git/ref/heads/dentikc-lab-os-design-399a7",
  format="text"
)
```

Extraer el SHA del commit HEAD de la respuesta JSON.

### 3. Obtener Árbol Recursivo del Commit

Obtener el árbol completo de archivos:
```
web_fetch(
  url="https://api.github.com/repos/Josy2ssj/DentiKCLAB2/git/trees/{SHA}?recursive=1",
  format="text"
)
```

Donde `{SHA}` es el HEAD obtenido en el paso anterior.

### 4. Comparar Workspace vs Árbol Remoto

Clasificar archivos en:
- **Faltantes:** Archivos que están en el árbol remoto pero no en el workspace
- **Diferentes:** Archivos que existen en ambos pero con contenido diferente (comparar SHA si es posible)
- **Adicionales:** Archivos que están en el workspace pero no en el árbol remoto (ignorar, no eliminar)

### 5. Restaurar Archivos Faltantes/Diferentes

Para cada archivo faltante o diferente:

```
web_fetch(
  url="https://raw.githubusercontent.com/Josy2ssj/DentiKCLAB2/{SHA}/{ruta_del_archivo}",
  format="text"
)
```

Luego crear/sobrescribir el archivo en el workspace con el contenido exacto obtenido.

**IMPORTANTE:**
- NUNCA reconstruir archivos manualmente
- NUNCA usar la rama `main` como fuente
- NUNCA eliminar archivos adicionales del workspace
- El contenido debe provenir directamente de GitHub

### 6. Validar Proyecto

Ejecutar en orden:

```bash
# Instalar dependencias si es necesario
npm install

# Verificar TypeScript
npm run typecheck

# Verificar build
npm run build
```

Si alguno falla, reportar el error exacto y DETENERSE.

### 7. Restaurar Preview

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

Verificar que la aplicación carga correctamente en el Preview de Qwen.

### 8. Reportar Resultados

Al finalizar, responder con:

```
RECOVERY: OK / FAILED
SOURCE BRANCH: dentikc-lab-os-design-399a7
SOURCE COMMIT: {SHA utilizado}
FILES RESTORED: {número de archivos restaurados}
TYPECHECK: PASS / FAIL
BUILD: PASS / FAIL
PREVIEW: PASS / FAIL
```

---

## FALLBACK

Si la working branch `dentikc-lab-os-design-399a7` ya no existe:

1. **DETENERSE inmediatamente**
2. **NO recuperar automáticamente desde `main`**
3. Reportar al usuario:
   - La working branch ya no existe
   - Solicitar instrucciones sobre qué hacer
   - Esperar decisión del usuario

---

## ESTRUCTURA ESPERADA DEL PROYECTO

El proyecto debe contener como mínimo:

### Archivos de Configuración
- `.gitignore`
- `index.html`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vite.config.js`

### Código Fuente (`src/`)
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/vite-env.d.ts`

### Contextos (`src/contexts/`)
- `src/contexts/DataContext.tsx`
- `src/contexts/NavigationContext.tsx`
- `src/contexts/WorkspaceFrameContext.tsx`

### Componentes Principales (`src/components/`)
- `src/components/AdaptiveNavRail.tsx`
- `src/components/OrderStatusNotch.tsx`
- `src/components/StatusWidgetStack.tsx`
- `src/components/TopHeader.tsx`
- `src/components/SettingsModal.tsx`

### Widgets (`src/components/widgets/`)
- `src/components/widgets/PatientList.tsx`
- `src/components/widgets/PendingTasks.tsx`
- `src/components/widgets/SmartStack.tsx`
- `src/components/widgets/WorkTypes.tsx`
- `src/components/widgets/QuickAccess.tsx`

### Screens (`src/components/screens/`)
- `src/components/screens/OrdersScreen.tsx`
- `src/components/screens/ScheduleScreen.tsx`
- `src/components/screens/InventoryScreen.tsx`
- `src/components/screens/Capture3DScreen.tsx`

### Páginas (`src/pages/`)
- `src/pages/Home.tsx`
- `src/pages/OrdersScreen.tsx` (puede estar en screens/)
- `src/pages/ScheduleScreen.tsx` (puede estar en screens/)
- `src/pages/InventoryScreen.tsx` (puede estar en screens/)
- `src/pages/Capture3DScreen.tsx` (puede estar en screens/)

### Librerías (`src/lib/`)
- `src/lib/orderSelectors.ts`
- `src/lib/workspaceGeometry.ts`

### Debug (`src/components/debug/`)
- `src/components/debug/LayoutDebugger.tsx`

---

## COMANDOS ÚTILES

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Verificar tipos TypeScript
npm run typecheck

# Preview (después de build)
npm run preview
```

---

## NOTAS IMPORTANTES

1. **Nunca modificar el código durante la recuperación** - Solo restaurar exactamente lo que está en GitHub
2. **Nunca hacer commit/push** - Este entorno no tiene Git configurado
3. **Nunca eliminar archivos adicionales** - Solo agregar/restaurar lo faltante
4. **Siempre validar después de restaurar** - typecheck + build + preview
5. **Reportar cualquier discrepancia** - Si un archivo no puede restaurarse, detenerse y reportar

---

## HISTORIAL DE RECUPERACIONES

### Recuperación 1
- **Fecha:** 2026-01-18
- **Commit:** 15e2a4a8197fb4c95fbd0e183c977c5984800963
- **Estado:** OK
- **Archivos restaurados:** 1 (.gitignore)
- **Archivos verificados:** Todos idénticos al remoto
- **Typecheck:** PASS
- **Build:** PASS (577.89 KB JS / 29.48 KB CSS)
- **Preview:** Funcionando

---

**Última actualización:** 2026-01-18
