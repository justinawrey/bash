import { bold } from "https://deno.land/std@0.159.0/fmt/colors.ts";

export class BashError extends Error {}

export async function bash(cmd: string): Promise<string> {
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

  if (status.code === 0) {
    return new TextDecoder().decode(stdout);
  } else {
    throw new BashError(
      `bash invocation ${bold(`'${cmd}'`)} failed with error:\n\n` +
        new TextDecoder().decode(stderr),
    );
  }
}
