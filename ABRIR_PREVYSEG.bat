@echo off
title PrevySeg 2026 - Plataforma Educativa y Laboral
color 0B
cls
echo =====================================================================
echo       BIENVENIDO A PREVYSEG 2026 - OTEC Y BOLSA DE EMPLEO
echo =====================================================================
echo.
echo Iniciando servidor de demostracion...
where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Node.js detectado. Ejecutando plataforma optimizada...
    node scripts/serve_dist.cjs
) else (
    where python >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [OK] Python detectado. Abriendo en puerto 8000...
        cd dist
        start http://localhost:8000
        python -m http.server 8000
    ) else (
        echo Abriendo interfaz en el navegador...
        start dist/index.html
    )
)
pause
