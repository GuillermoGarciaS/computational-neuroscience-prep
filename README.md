# From Entropy to Experience #

> A computational notebook on how signals become structure, how structure becomes detectable, and why detection is still not experience.

**From Entropy to Experience** is a small research-style portfolio built with HTML, Tailwind CSS, and vanilla JavaScript. It turns coursework-style experiments into interactive computational studies about entropy, predictability, representation, signal detection, and the limits of computational explanation.

This is not a finished theory of consciousness. It is a public notebook: experimental, revisable, and intentionally careful about what it can and cannot claim.

---

## Core Question ##

**To what extent can reducing uncertainty in computational systems explain structured representation and perception — and where does that explanation stop before subjective experience?**

The project follows a simple arc:

```text
signal → structure → detection → representation → integration → limit
```

Each experiment isolates one layer. Each synthesis project connects several layers into a broader model.

---

## Live Site ##

https://guillermogarcias.github.io/computational-neuroscience-prep/index.html

## Project Map ##

### Experiments ##

| Page | Focus | Core Idea |
|---|---|---|
| **Experiment 1 — File Size, Structure, and Predictability** | Storage growth | Repetition and controlled structure make file size easier to model, but predictability is not meaning. |
| **Experiment 2 — Entropy, Content, and Representation** | Shannon entropy | Equal-length texts can differ in uncertainty depending on symbol distribution and representation mode. |
| **Experiment 3 — Signals Over Time** | Temporal windows | Entropy depends on the scale and window through which a signal is observed. |
| **Experiment 4 — Detectability of Structure** | Pattern detection | Entropy alone can miss order; a rule must be able to detect the relevant structure. |
| **Experiment 5 — Representation Under Constraint** | Usable structure | Detected structure becomes representational only when a system can use it for a task. |
| **Experiment 6 — Signal Integration and Interference** | Multi-channel inference | More signals do not automatically improve representation; they can cooperate, conflict, or mislead. |

### Synthesis Projects

| Page | Focus | Role in the Arc |
|---|---|---|
| **Project 1 — From Signals to Representation** | Signal → usable structure | Synthesizes the early experiments into a model of representational transformation. |
| **Project 2 — Multi-Channel Integration and Uncertainty** | Signal integration | Explores how multiple channels reduce or amplify uncertainty. |
| **Project 3 — The Boundary of Computational Explanation** | Functional explanation vs experience | Marks what computation explains well and what remains unresolved. |

---

## What This Project Is

This project is:

- an interactive computational notebook;
- a portfolio of small experiments;
- a bridge between software, data science, and computational neuroscience;
- a way to practice explaining formal ideas visually;
- a careful exploration of entropy, representation, and explanatory limits.

It is not:

- a professional neuroscience claim;
- a completed scientific paper;
- a proof that entropy explains consciousness;
- a claim that high entropy means semantic depth;
- a claim that computational models automatically produce experience.

That distinction matters. The project is strongest when it shows both what the models reveal and what they fail to explain.

---

## Conceptual Spine

### 1. Signal

A signal is raw variation: text, bits, symbols, pixels, or measurements.

### 2. Entropy

Entropy measures uncertainty in a chosen representation.

```text
H(X) = -Σ p(x) log₂ p(x)
```

But entropy depends on the lens. Character entropy, word entropy, bigram entropy, and temporal-window entropy can all describe different aspects of the same object.

### 3. Detection

A pattern only matters computationally if a system has a rule that can find it.

```text
Detection = metric > threshold
```

### 4. Representation

A detected pattern becomes representational only when it is preserved in a usable form.

```text
raw signal → detector → compressed feature → task output
```

### 5. Integration

Real systems do not receive one perfect signal. They combine noisy channels, priors, memory, and context.

```text
visual signal ┐
temporal cue  ├→ integration rule → final representation
memory/prior  ┘
```

### 6. Boundary

Computational models can explain useful structure, prediction, classification, and behavior. They do not automatically explain first-person experience.

That boundary is the philosophical pressure point of the project.

---

## Tech Stack

- **HTML** — standalone pages
- **Tailwind CSS CDN** — fast visual prototyping
- **Vanilla JavaScript** — interactive sliders, canvases, and live calculations
- **Canvas API** — custom charts and visual models
- **GitHub Pages** — public deployment

No build step is required.

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/guillermogarcias/computational-neuroscience-prep.git
cd computational-neuroscience-prep
```

Open the site directly:

```bash
start index.html
```

Or serve it locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## File Structure

```text
.
├── index.html
├── experiment-1.html
├── experiment-2.html
├── experiment-3.html
├── experiment-4.html
├── experiment-5.html
├── experiment-6.html
├── project-1.html
├── project-2.html
├── project-3.html
└── README.md
```

The pages are designed as independent notebooks, but they also form a sequence.

Navigation pattern:

```text
Experiment 1 → Experiment 2 → Experiment 3 → Experiment 4 → Experiment 5 → Experiment 6
                  ↓                          ↓                          ↓
              Project 1                  Project 2                  Project 3
```

---

## Design Direction

The site uses a dark, minimal, research-notebook aesthetic:

- glass-like panels;
- soft blue/cyan/violet accents;
- canvas-based diagrams;
- compact side notes;
- bilingual English/Spanish toggles;
- interactive controls that expose the logic of each model.

The goal is not to look like a product landing page. The goal is to feel like a living computational notebook.

---

## Current Status

| Area | Status |
|---|---|
| Landing page | In progress |
| Experiment 1 | Revised |
| Experiment 2 | Revised with branch navigation |
| Experiment 3 | In review |
| Experiment 4 | Built |
| Experiment 5 | Planned / starter built |
| Experiment 6 | Planned / starter built |
| Project 1 | Planned synthesis |
| Project 2 | Planned synthesis |
| Project 3 | Planned philosophical capstone |

---

## Future Work

Planned improvements:

- add empirical data where possible;
- add regression outputs and downloadable tables;
- improve chart consistency across all pages;
- add forward/backward navigation to every experiment;
- connect Experiments 2, 4, and 6 to synthesis projects;
- refine the bilingual copy;
- separate reusable CSS and JavaScript after the prototype stabilizes;
- add notes explaining what each model can and cannot infer.

---

## Epistemic Rule

This project should avoid overclaiming.

The strongest version of the project is not:

```text
entropy explains consciousness
```

The stronger claim is:

```text
entropy and related computational tools can explain several functional layers of structure, uncertainty, representation, and behavior — but subjective experience requires an additional argument.
```

That is the standard this notebook tries to hold.

---

## Author

Built by **Guillermo G. Sainz** as part of a long-term computational neuroscience and philosophy portfolio.

---

## License

No license has been selected yet. Add one before encouraging reuse.

