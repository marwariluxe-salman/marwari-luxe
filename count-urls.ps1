# Count the number of <url> tags in the sitemap.xml file
$content = Get-Content -Path "public\sitemap.xml" -Raw
$urlCount = ($content | Select-String -Pattern "<url>" -AllMatches).Matches.Count
Write-Host "Number of URLs in sitemap: $urlCount"