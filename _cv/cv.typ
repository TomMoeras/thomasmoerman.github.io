// One-page academic CV, Thomas Moerman.
// Compile: quarto typst compile cv.typ --font-path fonts
// House style: plain register, no em dashes, no semicolons.

#let ugentblue = rgb("#1E64C8")
#let ink = rgb("#1a1a1a")
#let muted = rgb("#5a6570")

#set page(paper: "a4", margin: (x: 1.6cm, top: 1.4cm, bottom: 1.3cm))
#set text(font: "Source Sans 3", size: 9.2pt, fill: ink)
#set par(leading: 0.5em)
#show link: set text(fill: ugentblue)

#let section(title) = {
  v(0.55em)
  text(size: 10.5pt, weight: 600, fill: ugentblue, upper(title))
  v(-0.65em)
  line(length: 100%, stroke: 0.6pt + ugentblue.lighten(55%))
  v(-0.15em)
}

#let entry(left-content, right-content) = grid(
  columns: (1fr, auto),
  column-gutter: 1em,
  left-content,
  align(right, text(fill: muted, size: 8.8pt, right-content)),
)

// ---------- Header ----------
#align(center)[
  #text(size: 20pt, weight: 700)[Thomas Moerman]
  #v(-0.5em)
  #text(size: 10.5pt, fill: muted)[PhD researcher in natural language processing and AI, Ghent University (LT3)]
  #v(-0.45em)
  #text(size: 9pt)[
    #link("mailto:thomas.moerman@ugent.be")[thomas.moerman\@ugent.be] #h(0.7em)|#h(0.7em)
    #link("https://thomasmoerman.dev")[thomasmoerman.dev] #h(0.7em)|#h(0.7em)
    #link("https://orcid.org/0009-0001-6021-8031")[ORCID 0009-0001-6021-8031] #h(0.7em)|#h(0.7em)
    #link("https://github.com/TomMoeras")[github.com/TomMoeras]
  ]
]
#v(-0.2em)
My research develops retrieval-augmented and synthetic-data methods for language technology, with machine translation as the primary focus and applications in educational NLP, fairness in language models, and vision-language OCR. A consistent finding is that these techniques let smaller specialized models reach or exceed the quality of much larger general-purpose LLMs.

// ---------- Education ----------
#section[Education]
#entry[*PhD in Natural Language Processing*, Ghent University, LT3 #linebreak() #text(size: 8.8pt)[Machine translation augmented with automatically extracted similar translations. Supervisors: Arda Tezcan and Els Lefever.]][2023 to 2027 (expected)]
#v(0.15em)
#entry[*Advanced MA in Linguistics: Natural Language Processing*, Ghent University and KU Leuven][2023]
#v(0.15em)
#entry[*MA in Linguistics and Literature*, English and Scandinavian studies, Ghent University, cum laude][2022]
#v(0.15em)
#entry[*BA in Linguistics and Literature*, English and Swedish, Ghent University, cum laude][2021]

// ---------- Publications ----------
#section[Selected publications]
9 published or accepted works, 6 first-authored, 3 journal articles. Full list: #link("https://thomasmoerman.dev/publications/")[thomasmoerman.dev/publications]
#v(0.15em)
#entry[Moerman, Gkovedarou, Hackenbuchner. *ContraGAND: Auditing and Repairing Gender Ambiguity Failures in LLMs with Neurosymbolic Contrastive Data Augmentation.* EMNLP, main conference.][2026]
#v(0.15em)
#entry[Moerman, Tezcan, Macken. *Multilingual Communication in the Asylum Context: LLM-Based MT with Fuzzy Match Augmentation.* EAMT. Shortlisted for the best-paper award.][2026]
#v(0.15em)
#entry[Moerman, Degraeuwe, Tezcan. *Fuzzy Semantic Retrieval Strategies for Automated Short-Answer Grading with LLMs.* Computational Linguistics in the Netherlands Journal, 15.][2026]
#v(0.15em)
#entry[Moerman, Lefever, Tezcan. *Advancing Fuzzy Match Augmentation for Domain-Specific Machine Translation.* Under review at the Journal of Artificial Intelligence Research.][2025]

// ---------- Awards ----------
#section[Awards and competitions]
#entry[*Joint winner, Sorbian track, WMT 2026 shared task on multitask LLMs with limited resources* (team LT3, team lead). One 2B model jointly handling translation, QA, spelling, grammar, and maths tasks for Upper and Lower Sorbian.][2026]
#v(0.15em)
#entry[*Best-paper award shortlist*, EAMT 2026.][2026]

// ---------- Grants ----------
#section[Research grants]
#entry[*Principal applicant*, VSC Tier-1 compute project grant on the Sofia cluster (38,546 GPU hours), after earlier Tier-1 project allocations (2024, 2025) and a Tier-1 Starting Grant (2024).][2024 to 2026]
#v(0.15em)
#entry[*Named collaborator* on five further Tier-1 compute grants across four Ghent University research groups, contributing LLM fine-tuning and retrieval pipelines.][2025 to 2026]

// ---------- Teaching ----------
#section[Teaching]
Guest lectures on Neural Machine Translation and on LLMs in Translation (MTPE course, Ghent University). Co-taught Introduction to Python for Humanities. Hands-on HPC workshop for the LT3 team. Python module at the MILS summer school (Methods in Language Sciences).

// ---------- Service ----------
#section[Academic service]
Reviewer for EAMT 2026 (three papers) and ACL (one paper). Presented at EAMT 2026, the Machine Translation Marathon 2025, CLIN, and LREC 2026.

// ---------- Skills ----------
#section[Technical skills and languages]
Python, PyTorch, Hugging Face Transformers, vLLM, axolotl, LoRA fine-tuning, FAISS retrieval, OpenNMT, Moses, SLURM on Tier-1 HPC (A100 and H200 clusters). #linebreak()
Dutch (native), English (C2), Swedish (C1), French (B2), German (B1), Norwegian (B1).
