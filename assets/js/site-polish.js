(function () {
  "use strict";

  const pages = [
    { file: "experiment-1.html", en: "Experiment 1", es: "Experimento 1", prev: null, next: "experiment-2.html", related: "project-1.html" },
    { file: "experiment-2.html", en: "Experiment 2", es: "Experimento 2", prev: "experiment-1.html", next: "experiment-3.html", related: "project-1.html" },
    { file: "experiment-3.html", en: "Experiment 3", es: "Experimento 3", prev: "experiment-2.html", next: "experiment-4.html", related: "project-1.html" },
    { file: "experiment-4.html", en: "Experiment 4", es: "Experimento 4", prev: "experiment-3.html", next: "experiment-5.html", related: "project-1.html" },
    { file: "experiment-5.html", en: "Experiment 5", es: "Experimento 5", prev: "experiment-4.html", next: "experiment-6.html", related: "project-1.html" },
    { file: "experiment-6.html", en: "Experiment 6", es: "Experimento 6", prev: "experiment-5.html", next: "project-2.html", related: "project-2.html" },
    { file: "project-1.html", en: "Project 1", es: "Proyecto 1", prev: "experiment-4.html", next: "project-2.html", related: "experiment-5.html" },
    { file: "project-2.html", en: "Project 2", es: "Proyecto 2", prev: "experiment-6.html", next: "project-3.html", related: "experiment-6.html" },
    { file: "project-3.html", en: "Project 3", es: "Proyecto 3", prev: "project-2.html", next: null, related: "experiment-6.html" }
  ];

  const pageMap = new Map(pages.map((page) => [page.file, page]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function currentFile() {
    return decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  }

  function currentLang() {
    return localStorage.getItem("siteLang") === "es" ? "es" : "en";
  }

  function localize(en, es) {
    return currentLang() === "es" ? es : en;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function addLocalizedText(element, en, es) {
    element.dataset.en = en;
    element.dataset.es = es;
    element.textContent = localize(en, es);
  }

  function installScrollProgress() {
    const progress = document.createElement("div");
    progress.id = "site-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      document.documentElement.style.setProperty("--site-scroll", ratio.toFixed(4));
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  function installPageTransitions() {
    const veil = document.createElement("div");
    veil.id = "site-transition";
    veil.setAttribute("aria-hidden", "true");
    document.body.appendChild(veil);

    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const url = new URL(link.getAttribute("href"), location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      if (!url.pathname.endsWith(".html") && !url.pathname.endsWith("/")) return;

      event.preventDefault();
      if (reduceMotion) {
        location.href = url.href;
        return;
      }

      document.body.classList.add("is-transitioning");
      window.setTimeout(() => {
        location.href = url.href;
      }, 170);
    });
  }

  function installReveals() {
    const targets = Array.from(document.querySelectorAll([
      "main section",
      ".hero-card",
      ".info-card",
      ".thesis-card",
      ".timeline-card",
      ".hub-card",
      ".group-shell",
      ".section-card"
    ].join(","))).filter((element) => !element.classList.contains("site-sequence-nav"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    targets.forEach((element, index) => {
      element.classList.add("site-reveal");
      element.style.transitionDelay = `${Math.min(index * 28, 180)}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((element) => observer.observe(element));
  }

  function installActiveLinks() {
    const links = Array.from(document.querySelectorAll("aside nav a[href^='#'], .top-link[href^='#']"));
    const sections = links
      .map((link) => {
        const id = link.getAttribute("href").slice(1);
        return { id, element: document.getElementById(id) };
      })
      .filter((item, index, list) => item.element && list.findIndex((other) => other.id === item.id) === index);

    if (!links.length || !sections.length) return;

    let ticking = false;
    const update = () => {
      const line = Math.max(120, window.innerHeight * 0.28);
      let activeId = sections[0].id;

      sections.forEach((section) => {
        if (section.element.getBoundingClientRect().top <= line) {
          activeId = section.id;
        }
      });

      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
  }

  function navSlot(kind, targetFile, emptyLabel) {
    if (!targetFile) {
      const span = document.createElement("span");
      const small = document.createElement("small");
      const strong = document.createElement("strong");
      addLocalizedText(small, kind.en, kind.es);
      addLocalizedText(strong, emptyLabel.en, emptyLabel.es);
      span.append(small, strong);
      return span;
    }

    const target = pageMap.get(targetFile);
    const anchor = document.createElement("a");
    anchor.href = targetFile;
    const small = document.createElement("small");
    const strong = document.createElement("strong");
    addLocalizedText(small, kind.en, kind.es);
    addLocalizedText(strong, target ? target.en : targetFile, target ? target.es : targetFile);
    anchor.append(small, strong);
    return anchor;
  }

  function installSequenceNav() {
    const file = currentFile();
    const page = pageMap.get(file);
    if (!page || document.querySelector(".site-sequence-nav")) return;

    const nav = document.createElement("nav");
    nav.className = "site-sequence-nav site-reveal";
    nav.setAttribute("aria-label", "Notebook sequence");
    nav.append(
      navSlot({ en: "Previous", es: "Anterior" }, page.prev, { en: "Beginning", es: "Inicio" }),
      navSlot({ en: "Hub", es: "Indice" }, "index.html", { en: "Hub", es: "Indice" }),
      navSlot({ en: "Next", es: "Siguiente" }, page.next, { en: "End", es: "Final" }),
      navSlot({ en: "Related", es: "Relacionado" }, page.related, { en: "None", es: "Ninguno" })
    );

    const main = document.querySelector("main");
    if (main) {
      main.insertAdjacentElement("afterend", nav);
    } else {
      document.body.appendChild(nav);
    }

    if (reduceMotion) {
      nav.classList.add("is-visible");
    } else {
      window.requestAnimationFrame(() => nav.classList.add("is-visible"));
    }
  }

  function installLanguageMotion() {
    const toggle = document.getElementById("langToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      document.body.classList.add("is-language-flipping");
      window.setTimeout(() => {
        document.body.classList.remove("is-language-flipping");
      }, 210);
    }, true);
  }

  function storageKeyFor(control) {
    return `neuroNotebook:${currentFile()}:${control.id}`;
  }

  function installControlPersistence() {
    const controls = Array.from(document.querySelectorAll("input[id], select[id], textarea[id]"))
      .filter((control) => {
        const type = (control.getAttribute("type") || "").toLowerCase();
        return !["button", "submit", "reset", "hidden"].includes(type) && control.id !== "langToggle";
      });

    if (!controls.length) return;

    const restore = (control) => {
      const key = storageKeyFor(control);
      const stored = localStorage.getItem(key);
      if (stored === null) return;

      if (control.type === "checkbox" || control.type === "radio") {
        control.checked = stored === "true";
      } else {
        control.value = stored;
      }

      control.dispatchEvent(new Event("input", { bubbles: true }));
      control.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const save = (control) => {
      const key = storageKeyFor(control);
      const value = control.type === "checkbox" || control.type === "radio" ? String(control.checked) : control.value;
      localStorage.setItem(key, value);
    };

    controls.forEach((control) => {
      restore(control);
      control.addEventListener("input", () => save(control));
      control.addEventListener("change", () => save(control));
    });

    document.querySelectorAll("button[data-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        window.setTimeout(() => controls.forEach(save), 0);
      });
    });
  }

  function installCanvasPulse() {
    const canvases = Array.from(document.querySelectorAll("canvas"));
    if (!canvases.length || reduceMotion) return;

    let timer = null;
    const pulse = () => {
      canvases.forEach((canvas) => {
        canvas.classList.remove("site-canvas-pulse");
        void canvas.offsetWidth;
        canvas.classList.add("site-canvas-pulse");
      });

      clearTimeout(timer);
      timer = window.setTimeout(() => {
        canvases.forEach((canvas) => canvas.classList.remove("site-canvas-pulse"));
      }, 320);
    };

    document.addEventListener("input", (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.matches("input[type='range'], select, textarea")) pulse();
    });
    document.addEventListener("change", (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.matches("select")) pulse();
    });
  }

  function installHomepageArc() {
    if (currentFile() !== "index.html") return;

    const timeline = document.getElementById("timeline");
    if (!timeline || timeline.querySelector(".research-arc")) return;

    const arc = document.createElement("div");
    arc.className = "research-arc";
    arc.setAttribute("aria-hidden", "true");
    arc.innerHTML = `
      <svg viewBox="0 0 900 210" role="img">
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6ca8ff" />
            <stop offset="46%" stop-color="#8ee7dc" />
            <stop offset="100%" stop-color="#b8a4ff" />
          </linearGradient>
        </defs>
        <path class="arc-path" d="M70 140 C150 48 250 48 330 126 S510 198 610 100 S750 34 830 126" />
        ${[
          [70, 140, "Signal"],
          [210, 70, "Entropy"],
          [350, 132, "Detection"],
          [500, 166, "Representation"],
          [650, 78, "Integration"],
          [830, 126, "Limit"]
        ].map(([x, y, label], index) => `
          <g style="animation-delay:${index * 90}ms">
            <circle class="arc-node" cx="${x}" cy="${y}" r="18"></circle>
            <circle class="arc-core" cx="${x}" cy="${y}" r="6"></circle>
            <text x="${x}" y="${y + 38}" text-anchor="middle">${escapeHtml(label)}</text>
          </g>
        `).join("")}
      </svg>`;

    const title = timeline.querySelector(".hub-title, h2");
    if (title) {
      title.insertAdjacentElement("afterend", arc);
    } else {
      timeline.prepend(arc);
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      arc.classList.add("is-live");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        arc.classList.add("is-live");
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(arc);
  }

  ready(() => {
    document.body.classList.add("site-enhanced");
    installScrollProgress();
    installPageTransitions();
    installHomepageArc();
    installSequenceNav();
    installActiveLinks();
    installReveals();
    installLanguageMotion();
    installControlPersistence();
    installCanvasPulse();
  });
})();
