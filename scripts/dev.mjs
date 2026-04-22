import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();

const processes = [
  {
    name: "contracts",
    cwd: path.join(root, "contracts"),
    command: "npm",
    args: ["run", "dev:node"],
  },
  {
    name: "agent",
    cwd: path.join(root, "agents"),
    command: "npm",
    args: ["run", "dev"],
  },
  {
    name: "backend",
    cwd: path.join(root, "backend"),
    command: "npm",
    args: ["run", "dev"],
  },
  {
    name: "frontend",
    cwd: path.join(root, "frontend"),
    command: "npm",
    args: ["run", "dev"],
  },
];

const children = processes.map(({ name, cwd, command, args }) => {
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
    }
  });

  return child;
});

const shutdown = () => {
  for (const child of children) {
    child.kill();
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
