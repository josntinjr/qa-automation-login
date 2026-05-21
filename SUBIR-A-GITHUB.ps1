# Ejecutar con clic derecho → "Ejecutar con PowerShell"
# O en PowerShell: .\SUBIR-A-GITHUB.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== Subir proyecto a GitHub ===" -ForegroundColor Cyan
Write-Host "Repo: https://github.com/josntinjr/prueba_tecnica_QA`n"

# 1) Iniciar sesión en GitHub CLI (abre el navegador)
Write-Host "Paso 1: Iniciar sesión en GitHub (sigue las preguntas)..." -ForegroundColor Yellow
& "C:\Program Files\GitHub CLI\gh.exe" auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  & "C:\Program Files\GitHub CLI\gh.exe" auth login -h github.com -p https -w
}

# 2) Push
Write-Host "`nPaso 2: Subiendo rama main..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
  Write-Host "`nListo. Abre: https://github.com/josntinjr/prueba_tecnica_QA" -ForegroundColor Green
} else {
  Write-Host "`nSi falla, usa GitHub Desktop: File → Add local repository → esta carpeta → Push origin" -ForegroundColor Red
}

Read-Host "Presiona Enter para cerrar"
