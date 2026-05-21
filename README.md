# Pruebas E2E – Login (Practice Test Automation)

Automatización con **Cypress** de los tres casos obligatorios de login en  
[https://practicetestautomation.com/practice-test-login/](https://practicetestautomation.com/practice-test-login/).

**Repositorio:** https://github.com/josntinjr/prueba_tecnica_QA

## Requisitos

| Requisito | Versión recomendada |
|-----------|---------------------|
| Node.js   | 18.x o superior     |
| npm       | 9.x o superior      |

## Instalación

```bash
npm install
```

Opcional: copiar variables de entorno:

```bash
cp .env.example .env
```

## Estructura del proyecto

```
cypress/
├── e2e/
│   └── login.spec.js              # 3 casos + edge case E2E
├── fixtures/
│   └── loginCases.json            # Fuente única de datos (importada en spec)
├── support/
│   ├── config/
│   │   └── envValidator.js        # Opción C: validación de URL/env
│   ├── helpers/
│   │   └── waitHelpers.js         # Opción B: waitForVisible / safeClick
│   ├── login_rules/
│   │   ├── LoginExpectation.js    # Opción A: reglas programables
│   │   └── LoginExpectation.test.js
│   ├── pageObjects/
│   │   └── LoginPage.js
│   └── commands.js
├── reports/                       # Mochawesome (generado)
├── screenshots/
└── videos/
```

## Cómo ejecutar (local)

| Comando | Descripción |
|---------|-------------|
| `npm test` | Unit tests + E2E (completo) |
| `npm run test:unit` | Solo Vitest (`LoginExpectation`) |
| `npm run test:e2e` | Solo Cypress headless |
| `npm run cypress:open` | Modo interactivo |
| `npm run test:report` | E2E + reporte HTML consolidado |
| `npm run ci` | Lint + unit + E2E (igual que CI) |
| `npm run cypress:run:chrome` | E2E en Chrome |
| `npm run cypress:run:firefox` | E2E en Firefox |

## Cómo ver el reporte

1. `npm run test:report` o `npm run test:e2e`
2. HTML por corrida: `cypress/reports/mochawesome_*.html`
3. HTML unificado: `cypress/reports/html/report.html` (tras `report:merge`)

En fallos: `cypress/screenshots/` y `cypress/videos/`.

## Casos de prueba

| Caso | Usuario | Contraseña | Validaciones |
|------|---------|------------|--------------|
| 1 – Positive LogIn | `student` | `Password123` | URL `/logged-in-successfully/`, mensaje de éxito, **Log out** |
| 2 – Negative username | `incorrectUser` | `Password123` | `#error` con `Your username is invalid!` |
| 3 – Negative password | `student` | `incorrectPassword` | `#error` con `Your password is invalid!` |

Datos en `cypress/fixtures/loginCases.json` (sin duplicar en el spec).

## Piezas programables (rúbrica)

| Opción | Implementación |
|--------|----------------|
| **A** | `LoginExpectation.evaluate({ username, password })` → expectativa completa |
| **B** | `waitHelpers.js`: `waitForVisible`, `safeClick` (sin `cy.wait(ms)`) |
| **C** | `envValidator.js` + `.env.example` + `CYPRESS_*` en `cypress.config.js` |

### Tests unitarios (bloque D)

```bash
npm run test:unit
```

Cubre: credenciales válidas/inválidas, vacíos, `null`/`undefined`, trim, aliases de éxito.

## Calidad de código

```bash
npm run lint
npm run format:check
npm run format
```

**Pre-commit (Husky):** `lint-staged` + `npm run test:unit` en cada commit (desde carpeta `cypress/`).

## CI (GitHub Actions)

Workflow: [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml)

1. **quality:** lint, format check, unit tests  
2. **cypress-e2e:** matriz `electron`, `chrome`, `firefox` + artefactos Mochawesome y evidencias en fallo  

Pestaña *Actions* → *Cypress E2E* → descargar `cypress-report-<browser>`.

## Decisiones técnicas

- **baseUrl** configurable vía `CYPRESS_BASE_URL` (default: `https://practicetestautomation.com`).
- **Page Object** con `assertOutcome(expectation)` — una sola vía de aserciones.
- **Selectores:** `#username`, `#password`, `#submit`, `#error`; éxito `h1.post-title`; logout por texto accesible.
- **Esperas:** retries de Cypress + helpers explícitos; timeouts en config.
- **Reporte:** Mochawesome HTML/JSON.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| `Invalid baseUrl` al iniciar | Revisar `.env` / `CYPRESS_BASE_URL` (URL completa con `https://`) |
| Tests fallan por red | Verificar acceso a `practicetestautomation.com` |
| Firefox/Chrome local | Instalar binarios: `npx cypress install` |
| Husky no corre | Ejecutar `npm install` en `cypress/` (script `prepare`) |

## Supuestos

- El sitio de práctica mantiene IDs y mensajes del enunciado.
- Se requiere Internet en local y en CI.
- No hay secretos reales en el repo; credenciales de práctica son públicas.
