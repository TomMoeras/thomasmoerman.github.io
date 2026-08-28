#!/usr/bin/env python3
"""Generate _news.qmd from news.yml plus the publication pages (Quarto pre-render).

Manual entries come from news.yml. Publications dated on or after `auto_since`
whose slug is not covered by a manual entry's `pub` field get an automatic line,
so a newly added publication page shows up in News without further edits.

Writes _news.qmd only when the content changed, to avoid the quarto preview
re-render loop that pre-render writes can cause.
"""
import glob, os, yaml

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

PUB_DIR = "publications"
OUT = "_news.qmd"

MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


def front_matter(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    if not text.startswith("---"):
        return {}
    _, fm, _ = text.split("---", 2)
    return yaml.safe_load(fm) or {}


def month_year(date):
    parts = str(date).split("-")
    return f"{MONTHS[int(parts[1]) - 1]} {parts[0]}"


def sort_key(date):
    parts = str(date).split("-")
    return (int(parts[0]), int(parts[1]))


with open("news.yml", encoding="utf-8") as fh:
    config = yaml.safe_load(fh)

entries = [
    {"date": str(item["date"]), "text": item["text"]}
    for item in config.get("items", [])
]
covered = {item["pub"] for item in config.get("items", []) if item.get("pub")}
auto_since = str(config.get("auto_since", "9999-99"))

for path in sorted(glob.glob(os.path.join(PUB_DIR, "*.qmd"))):
    slug = os.path.splitext(os.path.basename(path))[0]
    if slug == "index" or slug in covered:
        continue
    meta = front_matter(path)
    date = str(meta.get("date", ""))
    if not date or date[:7] < auto_since:
        continue
    title = str(meta.get("title", slug))
    short = title.split(":")[0].strip()
    subtitle = str(meta.get("subtitle", "")).strip()
    text = f"New publication: [{short}]({PUB_DIR}/{slug}.qmd)"
    if subtitle:
        text += f", {subtitle}"
    entries.append({"date": date[:7], "text": text + "."})

entries.sort(key=lambda entry: sort_key(entry["date"]), reverse=True)
entries = entries[: int(config.get("max_items", 6))]

lines = [f"- [{month_year(entry['date'])}]{{.item-date}} {entry['text']}"
         for entry in entries]
content = "\n".join(lines) + "\n"

existing = None
if os.path.exists(OUT):
    with open(OUT, encoding="utf-8") as fh:
        existing = fh.read()
if content != existing:
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(content)
    print(f"Generated {OUT} with {len(entries)} news entries.")
else:
    print(f"{OUT} unchanged ({len(entries)} news entries).")
