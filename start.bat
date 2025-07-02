@echo off
echo ========================================
echo    MCB - Sistema de Cursos Online
echo ========================================
echo.

echo Verificando se o Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Instalando dependencias...
npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo Dependencias instaladas com sucesso!
echo.

echo Iniciando o servidor...
echo.
echo ========================================
echo    Servidor iniciado com sucesso!
echo ========================================
echo.
echo Acesse:
echo - Site principal: http://localhost:3000
echo - Painel admin: http://localhost:3000/admin-cursos.html
echo - API: http://localhost:3000/api
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm start 