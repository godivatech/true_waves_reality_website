/**
 * kill-ports.mjs — Cross-platform port killer for Windows.
 * Kills any processes occupying the ports used by this workspace
 * before `pnpm dev` starts, so stale servers never block a fresh run.
 */
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const PORTS = [3000, 5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180, 5181, 5182, 5183, 5184, 5185];

async function killPort(port) {
  try {
    // Using PowerShell to find and kill processes on a port is much more reliable on Windows
    const command = `powershell -Command "Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue; Write-Host 'Killed PID $_' }"`;
    const { stdout } = await execAsync(command);
    if (stdout.includes("Killed PID")) {
      console.log(`  ✓ Killed processes on port ${port}`);
    } else {
      console.log(`  · Port ${port} is free`);
    }
  } catch (error) {
    console.log(`  · Port ${port} is free`);
  }
}

console.log("Freeing dev ports…");
await Promise.all(PORTS.map(killPort));
console.log("Done. Starting servers.\n");
