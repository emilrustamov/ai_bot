@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Экспорт данных в Excel...
python export_to_csv.py
echo.
echo Готово! Файл all_answers.xlsx обновлён.
pause