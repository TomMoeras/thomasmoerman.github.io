# Numbers used in the publication figures, with their sources

Every value drawn in `papers/*.mjs` is listed here with the table or figure it comes from. Checked 20 October 2026.

## 2026-wmt-sorbian (WMT 2026)
Table 10, official results. LT3 primary: MT chrF++ 69.57, QA accuracy 65.05, spell checking 76.11, grammar checking 78.32, maths accuracy 30.40, 22 rank points, joint winner with HeyBusan. Best other team per task: MT HeyBusan 72.75, QA Hitsz 57.33, SC HeyBusan 78.03, GC HeyBusan 79.52, MR HeyBusan 29.00. Pool sizes from Section 3: 1,069,274 authentic pairs, 1,735,012 with back-translations at inference. Source: `research_stay_alicante/talk/DETAILS.md`, WMT section.

## 2026-eamt (EAMT 2026)
Figure 2, chrF by tier with TranslateGemma 27B and 15 examples: high resource zero-shot 61.7, random 64.9, fuzzy 67.0; mid 59.7, 61.2, 63.8; low 36.1, 41.6, 47.2. Table 4, Tigrinya chrF: TranslateGemma zero-shot 14.04, TranslateGemma fuzzy 29.99, ModernMT with memory 34.29, Gemini 2.5 Pro fuzzy 43.00. Dataset Section 4: memory of 358 sentences, 14 target languages (8 high, 3 mid, 3 low). Source: `DETAILS.md`, EAMT section.

## 2026-lrec-shanel (LREC 2026)
Section 3: 1,185 responses, 237 exercises, 9 grammar topics, 15 learners, 3 teachers, 847 correct and 338 incorrect. Table 2, overall with Gemma 3 27b-it, accuracy and recall of the incorrect class: off-the-shelf .83 / .90, textbook RAG .83 / .92, few-shot RAG .90 / .95. Source: `ShAnEL-2_LREC2026/LREC2026 Author's kit/paper_text_v2.tex`.

## 2026-clinj-grading (CLiN Journal 2026)
Abstract and Section 5.1: 306 experiments, ten strategies, 1,185 responses. Accuracy per strategy (best shot count per topic): zero-shot 82.8, textbook RAG 83.1, exercise-level RAG 88.4, sentence-level RAG 89.2, KB + response similarity 87.2 (recall 93.0), exercise similarity 89.4. Table (shot count): k = 1, 2, 3, 4, 6, 8 with accuracy .878, .847, .844, .841, .829, .825 and recall .854, .883, .895, .904, .906, .911. Source: `RAG_shanel_CLIN/fewshotshanel_clin.tex`.

## 2025-pslt (PSLT 2025)
NMT table (talk slide 21, the paper's NMT results), BLEU: neuroscience 1d 39.11, 3d+Ext 44.40, 3d+ExtTF_FM 46.33; climatology 29.57, 35.70, 36.97; mobility 30.14, 36.11, 37.68. NMT against LLMs on neuroscience (slide 31), BLEU: NMT 3d+ExtTF_FM 46.33, Mistral 7B FM 3d+Ext 40.5, Tower 7B FM 3d+Ext 43.17, Nemo 13B 40.81, Mistral 24B FM 3d+ExtTF 45.05. Filter shares (slide 17): neuroscience 23.1%, climatology 46.6%, mobility 40.4% kept. Source: `thomasmoerman-website/talks/pslt2025.pdf`. The paper PDF itself was not on this machine, so the values come from the talk, which reproduces the paper's tables.

## 2024-pbml (PBML 2024)
Table 5, BLEU: EN to UK BASE 54.85, best baseline (NFR mono) 60.39, BT + NFR 66.95; EN to FR 51.50, 54.88 (BT), 61.91; FR to EN 53.95, 56.99 (BT), 64.69. Gains over the best baseline 6.56, 7.03, 7.70. Source: `DETAILS.md`, PBML section.

## 2024-kemt (KeMT 2024)
Table 4, EN to FR legal, BLEU: baseline 45.76, BT 1:2 45.79, NFR 45.61, BT 1:2 + NFR 47.20. Source: `phd_thomas/clin_talk_mt_synthetic_data/papers/1_kemt2024_synthetic_monolingual_fm_nmt.pdf`.

## 2025-clin35-feedback (CLIN 35)
Schematic only, no numbers. Source: the abstract on the publication page.

## 2024-constructions (Constructions 2024)
Table 4, composite performance scores on the REMAIN frame, F1: local dependency preference +17.7, network connection strength +7.1, frequency-based priority -63.6. Section 4: best grammar F1 0.70 (precision 0.81, recall 0.61) with network connection strength. Source: the paper PDF in `phd_thomas/publications/`.
