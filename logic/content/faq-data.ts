export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "How is Remora different from standard llms.txt?",
    answer:
      "Standard llms.txt files are flat Markdown dumps written for human eyes: they contain verbose prose, introductory fluff, and unstructured text that waste model context. Remora compiles documentation into a machine-native Abstract Syntax Tree (AST) with strict type boundaries, schemas, and zero conversational padding.",
  },
  {
    question: "Does Remora support private repositories?",
    answer:
      "Yes. Remora connects to private GitHub and GitLab repositories using isolated worker sandboxes. Your code and internal schemas are never logged, exposed publicly, or used for model training.",
  },
  {
    question: "Can I keep my existing human documentation?",
    answer:
      "Yes. Remora runs alongside existing platforms like Mintlify, GitBook, Docusaurus, or Nextra. Human engineers browse your normal web documentation, while AI coding agents query Remora's dedicated machine endpoint.",
  },
  {
    question: "Can I host the schemas on my own domain?",
    answer:
      "Yes. You can route queries through a custom domain (e.g. docs.api.yourcompany.com) or commit static AST manifests directly to your repository for offline and local LLM workflows.",
  },
  {
    question: "How do I connect Remora to my codebase?",
    answer:
      "Install our GitHub App or run `npx remora init` in your repository. Initial AST indexing finishes in under a minute, and continuous webhooks keep schemas updated on every commit.",
  },
];

