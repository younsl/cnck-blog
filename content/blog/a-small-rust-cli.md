+++
title = "A Small Rust CLI That Earns Its Keep"
date = 2026-04-27
description = "When a shell script grows up: reaching for Rust without over-engineering."
[taxonomies]
tags = ["rust", "tooling"]
[extra]
toc = false
+++

Not every script needs to become a program. But once a shell script grows past
a screen, sprouts flags, and starts parsing JSON, the maintenance cost flips.
A tiny Rust CLI is often the cheaper long-term option.

```rust
use std::process::ExitCode;

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    match args.first().map(String::as_str) {
        Some("version") => {
            println!("{}", env!("CARGO_PKG_VERSION"));
            ExitCode::SUCCESS
        }
        _ => {
            eprintln!("usage: tool <command>");
            ExitCode::FAILURE
        }
    }
}
```

The win isn't speed, it's the type system catching the edge cases you'd
otherwise discover in production: the empty input, the missing field, the
timezone. Ship a single static binary and the operational story gets simpler too.
