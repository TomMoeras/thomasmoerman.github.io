#!/usr/bin/env python3
"""Generate llms.txt and llms-full.txt into the built site (Quarto post-render).

Writing into the output directory (not the watched project tree) avoids the
quarto preview re-render loop that a pre-render writing watched files causes.
"""
import glob, os, yaml

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SITE = "https://tommoeras.github.io/thomasmoerman.github.io"   # project page; update when a custom domain is set
PUB_DIR = "publications"
OUT_DIR = os.environ.get("QUARTO_PROJECT_OUTPUT_DIR", "docs")  # write into the built site

def front_matter(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    if not text.startswith("---"):
        return {}, ""
    _, fm, body = text.split("---", 2)
    return (yaml.safe_load(fm) or {}), body.strip()

papers = []
for path in glob.glob(os.path.join(PUB_DIR, "20*.qmd")):
    meta, body = front_matter(path)
    slug = os.path.splitext(os.path.basename(path))[0]
    meta["_url"] = f"{SITE}/{PUB_DIR}/{slug}.html"
    meta["_slug"] = slug
    meta["_summary"] = body
    papers.append(meta)

papers.sort(key=lambda m: str(m.get("date", "")), reverse=True)

HEADER = (
    "# Thomas Moerman - NLP and AI Research\n\n"
    "> PhD researcher in natural language processing (NLP) and artificial intelligence (AI) at Ghent University (LT3). "
    "Develops retrieval-augmented and synthetic-data methods, with application to various tasks "
    "including machine translation, educational NLP, and fairness in language models.\n\n"
)
OPTIONAL = (
    "\n## Optional\n\n"
    "- [Google Scholar](https://scholar.google.be/citations?user=_c_5EIoAAAAJ)\n"
    "- [LinkedIn](https://www.linkedin.com/in/thomas-andreas-moerman/)\n"
)

def publications(full):
    lines = ["## Publications\n"]
    for m in papers:
        lines.append(f"- [{m.get('title') or m.get('_slug','')}]({m['_url']}): {m.get('subtitle','')}. {m.get('description','')}")
        if full and m.get("_summary"):
            lines.append(f"\n  {m['_summary']}\n")
    return "\n".join(lines) + "\n"

os.makedirs(OUT_DIR, exist_ok=True)
with open(os.path.join(OUT_DIR, "llms.txt"), "w", encoding="utf-8") as fh:
    fh.write(HEADER + publications(False) + OPTIONAL)
with open(os.path.join(OUT_DIR, "llms-full.txt"), "w", encoding="utf-8") as fh:
    fh.write(HEADER + publications(True) + OPTIONAL)
print(f"Generated llms.txt and llms-full.txt from {len(papers)} papers into {OUT_DIR}/.")
