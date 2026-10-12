@echo off
setlocal
cd /d "%~dp0"
echo NBS4MED demo - starting a local server on http://127.0.0.1:8765
echo Close this window to stop the server.
where py >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:8765/index.html"
  py -m http.server 8765 --bind 127.0.0.1
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:8765/index.html"
  python -m http.server 8765 --bind 127.0.0.1
  goto :eof
)
echo Python was not found. Opening index.html directly (this also works).
start "" "%~dp0index.html"
