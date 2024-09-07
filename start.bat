@echo off
color 0A
:menu
cls
echo Welcome to Azure Team Launcher!
echo.
echo Please choose an option:
echo 1. Start the bot
echo 2. Update dependencies
echo 3. View logs
echo 4. Clear logs
echo 5. Exit
echo.
set /p choice=Enter your choice (1-5): 


if "%choice%"=="1" (
    echo Starting the bot...
    node index.js
    type logs.txt
    pause
    goto menu
) else if "%choice%"=="2" (
    echo Updating dependencies...
    npm update
    type logs.txt
    pause
    goto menu
) else if "%choice%"=="3" (
    echo Viewing logs...
    type logs.txt
    pause
    goto menu
) else if "%choice%"=="4" (
    echo Clearing logs...
    if exist logs.txt (
        echo. > logs.txt
        echo Logs cleared.
    ) else (
        echo No logs file found.
    )
    pause
    goto menu
) else if "%choice%"=="5" (
    echo Exiting...
    exit /b
) else (
    echo Invalid choice. Please select a number between 1 and 5.
    pause
    goto menu
)
