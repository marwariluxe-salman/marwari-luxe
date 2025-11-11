# PowerShell script to restart Next.js development server
Write-Host "Stopping any existing processes on port 3000..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($processes) {
    foreach ($process in $processes) {
        $pid = $process.OwningProcess
        $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Host "Killing process $($proc.ProcessName) with PID $pid" -ForegroundColor Red
            Stop-Process -Id $pid -Force
        }
    }
} else {
    Write-Host "No processes found on port 3000" -ForegroundColor Green
}

Write-Host "Starting Next.js development server..." -ForegroundColor Yellow
npm run dev