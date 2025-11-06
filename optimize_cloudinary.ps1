# PowerShell script to add optimization parameters to Cloudinary URLs in blogs.ts

# Read the content of blogs.ts
$content = Get-Content -Path "src\data\blogs.ts" -Raw

# Pattern to match Cloudinary URLs without optimization parameters
# Looking for URLs that have "upload/" followed by "v" (version) but don't have the optimization parameters
$pattern = '(https://res\.cloudinary\.com/[^/]+/image/upload/)(v\d+/[^''"\)]+\.(jpg|png|jpeg|gif))'

# Replacement pattern with optimization parameters
$replacement = '${1}f_auto,q_auto,w_auto,dpr_auto/${2}'

# Perform the replacement
$updatedContent = $content -creplace $pattern, $replacement

# Write the updated content back to the file
Set-Content -Path "src\data\blogs.ts" -Value $updatedContent

Write-Host "Cloudinary URLs optimized successfully!" -ForegroundColor Green