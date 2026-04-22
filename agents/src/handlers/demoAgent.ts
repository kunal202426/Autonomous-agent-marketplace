export type ExecutePayload = {
  taskId?: number;
  taskType?: string;
  inputURI?: string;
  prompt?: string;
  input?: unknown;
};

function classifyText(value: string) {
  const normalized = value.toLowerCase();

  if (normalized.includes("urgent") || normalized.includes("critical")) {
    return { classification: "high-priority", confidence: 0.94 };
  }

  if (normalized.includes("bug") || normalized.includes("error")) {
    return { classification: "incident", confidence: 0.89 };
  }

  if (normalized.includes("report") || normalized.includes("summary")) {
    return { classification: "analysis", confidence: 0.87 };
  }

  return { classification: "general", confidence: 0.76 };
}

export function executeDemoTask(payload: ExecutePayload) {
  const rawInput = payload.input ?? payload.prompt ?? payload.inputURI ?? "No input provided";
  const renderedInput = typeof rawInput === "string" ? rawInput : JSON.stringify(rawInput);
  const { classification, confidence } = classifyText(renderedInput);

  return {
    summary: `Processed ${payload.taskType ?? "generic"} task for marketplace execution.`,
    classification,
    confidence,
    steps: [
      "Validated payload structure",
      "Generated deterministic classification",
      "Prepared verifiable JSON result"
    ],
    rawInput,
  };
}
