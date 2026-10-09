# andervarela.es

Portfolio de Ander Varela: una única página con scroll, construida con React, TypeScript y Vite.
El funcional está en [`docs/documento-funcional.md`](docs/documento-funcional.md).

## Puesta en marcha

```bash
nvm use
npm install
npm run dev
```

## Scripts

| Script                | Qué hace                                                       |
| --------------------- | -------------------------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo                                         |
| `npm run build`       | Comprobación de tipos y build de producción                    |
| `npm run typecheck`   | Comprobación de tipos                                          |
| `npm run lint`        | ESLint sin warnings permitidos                                 |
| `npm run lint:styles` | Stylelint sobre los `.css`                                     |
| `npm run format`      | Formatea con Prettier                                          |
| `npm run test`        | Tests con Vitest y Testing Library                             |
| `npm run verify`      | Todo lo anterior en cadena; es lo que se ejecuta antes de push |

## Convenciones de código

- **Responsabilidad única**: un componente por fichero (`react/no-multi-comp`), incluso para los
  elementos más simples (`<Text kind={TextTypes.P} label={...} />`).
- **Una carpeta por componente**, con el nombre en PascalCase:

  ```
  src/components/Text/
  ├── Text.tsx           # solo render
  ├── Text.module.css    # estilos propios del componente
  ├── Text.helper.ts     # lógica, si la hay
  ├── Text.types.ts      # tipos y constantes públicas, si los hay
  └── Text.test.tsx
  ```

- **Nombres declarativos**: sin abreviaturas; las funciones dicen qué hacen y las variables qué contienen.
- **Clases CSS en camelCase** (CSS Modules).
- Imports absolutos desde `src` con el alias `@/`.

## Flujo de trabajo

Se sigue **git flow**:

| Rama                    | Sale de   | Se integra en      |
| ----------------------- | --------- | ------------------ |
| `main`                  | —         | —                  |
| `develop`               | `main`    | —                  |
| `feature/*`, `bugfix/*` | `develop` | `develop`          |
| `release/*`             | `develop` | `main` y `develop` |
| `hotfix/*`              | `main`    | `main` y `develop` |

Las integraciones se hacen con `git merge --no-ff`. Los mensajes siguen
[Conventional Commits](https://www.conventionalcommits.org/).

### Comprobaciones locales (Husky)

| Hook         | Comprueba                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Nombre de rama válido, que no se haga commit directo en `main`/`develop`, y lint-staged sobre lo preparado |
| `commit-msg` | Mensaje con formato Conventional Commits (commitlint)                                                      |
| `pre-push`   | Nombre de rama válido y `npm run verify` completo                                                          |
