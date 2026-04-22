import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { config } from "../config.js";

export async function persistProof(taskId: number, payload: unknown) {
  await fs.mkdir(config.proofDirectory, { recursive: true });

  const serialized = JSON.stringify(payload, null, 2);
  const hash = createHash("sha256").update(serialized).digest("hex");
  const filename = `task-${taskId}.json`;
  const filePath = path.join(config.proofDirectory, filename);

  await fs.writeFile(filePath, serialized, "utf8");

  return {
    hash,
    outputURI: `${config.proofBaseUrl}/proofs/${filename}`,
    filePath,
  };
}
