import { bold } from "https://deno.land/std@0.159.0/fmt/colors.ts";

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
    if (options.stripTrailingNewline) {
      return result.replace(/\n$/, "");
    }

    return result;
  }

  // Failure!
  throw new BashError(
    `bash invocation ${bold(`'${cmd}'`)} failed with error:\n\n` +
      new TextDecoder().decode(stderr),
  );
}
