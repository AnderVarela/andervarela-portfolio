#!/bin/sh
# En git flow, main y develop solo reciben cambios mediante merges.

current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)

if [ "$current_branch" = "main" ] || [ "$current_branch" = "develop" ]; then
  echo "✖ No se hacen commits directos en '$current_branch'."
  echo "  Crea una rama feature/*, bugfix/*, release/* o hotfix/* y haz merge."
  exit 1
fi
