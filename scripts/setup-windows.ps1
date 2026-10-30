# Run from the folder where you extracted Make-My-Marriage-MERN.zip:
# powershell -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
Write-Host 'Make My Marriage - MERN development setup' -ForegroundColor Green
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js not found. Install Node.js 22 LTS first.' }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm not found.' }
if (-not (Test-Path '.env')) {
  Copy-Item '.env.example' '.env'
  $secret = node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  $contents = Get-Content '.env' -Raw
  $contents = $contents.Replace('REPLACE_WITH_A_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS', $secret.Trim())
  [System.IO.File]::WriteAllText((Join-Path $root '.env'), $contents)
  Write-Host 'Created .env with a random JWT_SECRET.' -ForegroundColor Green
}
Write-Host 'Installing dependencies (requires internet access)...'
npm install
if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }
Write-Host ''
Write-Host 'MongoDB must be running locally, or MONGODB_URI must point to Atlas.' -ForegroundColor Yellow
Write-Host 'Run npm run dev and open http://localhost:5173' -ForegroundColor Green
