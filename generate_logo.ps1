$base64 = Get-Content -Path "backend\logo_base64.txt" -Raw
$base64 = $base64 -replace '\s+', ''

$methodLimit = 20000 # 20KB per method
$chunkSize = 1000   # 1KB per append call

$javaContent = @"
package com.iconnect.damagedetection;

public class LogoUtils {
    public static String getLogo() {
        StringBuilder sb = new StringBuilder();
"@

$totalLen = $base64.Length
$numMethods = [Math]::Ceiling($totalLen / $methodLimit)

for ($i = 0; $i -lt $numMethods; $i++) {
    $javaContent += "`n        sb.append(getPart$i());"
}

$javaContent += @"

        return sb.toString();
    }
"@

for ($i = 0; $i -lt $numMethods; $i++) {
    $start = $i * $methodLimit
    $len = [Math]::Min($methodLimit, $totalLen - $start)
    $methodPart = $base64.Substring($start, $len)
    
    $javaContent += "`n`n    private static String getPart$i() {`n        StringBuilder sb = new StringBuilder();"
    
    for ($j = 0; $j -lt $methodPart.Length; $j += $chunkSize) {
        $partLen = [Math]::Min($chunkSize, $methodPart.Length - $j)
        $chunk = $methodPart.Substring($j, $partLen)
        $javaContent += "`n        sb.append(`"$chunk`");"
    }
    
    $javaContent += "`n        return sb.toString();`n    }"
}

$javaContent += "`n}"

$javaContent | Set-Content -Path "backend\src\main\java\com\iconnect\damagedetection\LogoUtils.java" -Encoding Ascii
Write-Host "LogoUtils.java generated with $numMethods parts."
