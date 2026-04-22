import type { Express } from "express";
import express from "express";
import type { BackendTaskRecord } from "../types.js";

export function registerApiRoutes(app: Express, state: Map<number, BackendTaskRecord>, contractAddress: string) {
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", contractAddress, trackedTasks: state.size });
  });

  app.get("/api/tasks", async (_req, res) => {
    const tasks = [...state.values()].sort((a, b) => a.id - b.id);
    res.json({ tasks });
  });

  app.get("/api/tasks/:taskId", (req, res) => {
    const taskId = Number(req.params.taskId);
    const task = state.get(taskId);

    if (!task) {
      res.status(404).json({ error: "Task not found in backend state" });
      return;
    }

    res.json({ task });
  });

  app.use("/proofs", express.static("data/proofs"));
}
