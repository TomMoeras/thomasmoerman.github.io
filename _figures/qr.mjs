// QR codes for the resource links on publication pages. Run: node qr.mjs
// Writes ../images/qr/<name>.svg, UGent blue modules on white, quiet zone of one module.
import { writeFileSync } from 'node:fs';
import QRCode from 'qrcode';

const links = {
  'contragand-paper': 'https://aclanthology.org/2026.emnlp-main.485/',
  'contragand-code': 'https://github.com/TomMoeras/ContraGAND',
  'contragand-dataset': 'https://huggingface.co/datasets/TomMoeras/ContraGAND',
  'contragand-model-closed': 'https://huggingface.co/TomMoeras/contragand-qwen3.5-4b-closed',
  'contragand-model-open': 'https://huggingface.co/TomMoeras/contragand-qwen3.5-4b-open',
  'contragand-demo': 'https://huggingface.co/spaces/TomMoeras/contragand-demo',
  'sorbian-paper': 'https://www2.statmt.org/wmt26/pdf/2026.wmt-1.210.pdf',
  'sorbian-code': 'https://github.com/TomMoeras/wmt26-lt3-sorbian',
  'sorbian-models': 'https://huggingface.co/TomMoeras/wmt26-lt3-sorbian',
  'sorbian-dataset': 'https://huggingface.co/datasets/TomMoeras/wmt26-lt3-sorbian-data',
};

for (const [name, url] of Object.entries(links)) {
  const svg = await QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#1E64C8', light: '#ffffff' } });
  writeFileSync(`../images/qr/${name}.svg`, svg);
  console.log(name, url);
}
