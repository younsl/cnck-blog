# CNCK Blog

[![Zola](https://img.shields.io/badge/Zola-0.22.1-black?style=flat-square&logo=zola&logoColor=white)](https://www.getzola.org)
[![Homepage](https://img.shields.io/badge/Homepage-cnck.tech-black?style=flat-square&logo=googlechrome&logoColor=white)](https://cnck.tech)
[![GitHub](https://img.shields.io/badge/GitHub-cloud--native--community--korea-black?style=flat-square&logo=github&logoColor=white)](https://github.com/cloud-native-community-korea)

The blog of [Cloud Native Community Korea](https://github.com/cloud-native-community-korea), live at [cnck.tech](https://cnck.tech). Built with [Zola](https://www.getzola.org) 0.22 and the CNCK theme, a minimal monochrome design with a light/dark toggle.

## Prerequisites

Install [Zola](https://www.getzola.org/documentation/getting-started/installation/) 0.22.1. The version is pinned to match the [Zola](https://www.getzola.org) badge above and the CI build. On macOS, the easiest path is [Homebrew](https://brew.sh); other platforms are covered in the official install guide. Confirm the version before running the commands below.

```bash
brew install zola
zola --version
```

## Development

```bash
zola serve   # preview at http://127.0.0.1:1111
zola build   # output to ./public
```

Pushing to `main` builds and deploys to GitHub Pages via [`deploy.yml`](.github/workflows/deploy.yml).

## Writing a post

Create `content/blog/<slug>.md` with TOML front matter between `+++` fences, then Markdown body:

```toml
+++
title = "Post title"
date = 2026-06-01          # required, YYYY-MM-DD; controls ordering
description = "One-line summary for meta tags and listings."
[taxonomies]
tags = ["kubernetes", "rust"]   # optional
[extra]
toc = true                 # optional, render a table of contents
+++

Body in Markdown.
```

`title` and `date` are required; the rest are optional.

## License

Theme code is MIT. Post content belongs to its authors.
