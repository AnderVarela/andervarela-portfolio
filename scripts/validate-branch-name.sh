#!/bin/sh
# Comprueba que la rama actual sigue la nomenclatura de git flow.

current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
git_flow_branch_pattern='^(main|develop|(feature|bugfix|release|hotfix|support)/[a-z0-9][a-z0-9._-]*)$'

if ! echo "$current_branch" | grep -Eq "$git_flow_branch_pattern"; then
  echo "✖ La rama '$current_branch' no sigue git flow."
  echo "  Usa: feature/<nombre>, bugfix/<nombre>, release/<version>, hotfix/<nombre> o support/<nombre>."
  exit 1
fi
