# bash :boxing_glove:

![deno module](https://shield.deno.dev/x/bash)
![release](https://github.com/justinawrey/bash/actions/workflows/release.yml/badge.svg)

Ergonomically run `bash` commands in Deno.

## Usage

Run any `bash` command:

```ts
import { bash } from "https://deno.land/x/bash/mod.ts";

const result = await bash("echo 'hello world'");
console.log(result); // hello world
```

If the underlying command fails, `bash` will throw an error:

```ts
import { bash, BashError } from "https://deno.land/x/bash/mod.ts";

try {
  const result = await bash("laskdjf");
} catch (error) {
  if (error instanceof BashError) {
    console.error(error.message);
  }
}
```

By default, `bash` will strip the trailing newline from both the `stdout` output
and `stderr` output. If you want to disable this behavior, pass
`{ stripTrailingNewline: true }` as the second argument:

```ts
import { bash } from "https://deno.land/x/bash/mod.ts";

const result = await bash("echo 'hello world'", { stripTrailingNewline: true });
console.log(result); // hello world\n
```
