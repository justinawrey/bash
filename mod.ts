function stripTrailingNewline(input: string): string {
  return input.replace(/\n$/, "");
}

export class BashError extends Error {}

export interface BashOptions {
  stripTrailingNewline: boolean;
}

export async function bash(
  cmd: string,
  options: BashOptions = {
    stripTrailingNewline: true,
  },
): Promise<string> {
  const process = Deno.run({
    cmd: ["bash", "-c", cmd],
    stdout: "piped",
    stderr: "piped",
  });

  const [status, stdout, stderr] = await Promise.all([
    process.status(),
    process.output(),
    process.stderrOutput(),
  ]);

  // Success!
  if (status.code === 0) {
    const result = new TextDecoder().decode(stdout);
    return options.stripTrailingNewline ? stripTrailingNewline(result) : result;
  }

  // Failure!
  const error = new TextDecoder().decode(stderr);
  throw new BashError(
    options.stripTrailingNewline ? stripTrailingNewline(error) : error,
  );
}
