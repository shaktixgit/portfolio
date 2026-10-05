<div align="center">

  # Shakti Pad Mahato
  ### Full Stack Developer & Data Analyst

  [![Live Site](https://img.shields.io/badge/LIVE_WEBSITE-shaktipadmahato.vercel.app-0d0d0d?style=for-the-badge&logo=vercel&logoColor=white)](https://shaktipadmahato.vercel.app)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-@shaktixlin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shaktixlin/)
  [![GitHub](https://img.shields.io/badge/GitHub-shaktixgit-0d0d0d?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shaktixgit)

  <br />

  <a href="https://shaktipadmahato.vercel.app">
    <img src="public/intro.png" alt="Shakti Pad Mahato Portfolio Preview" width="800" style="border-radius: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.12);" />
  </a>

  <br />

  [![Next.js 15](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React 19](https://img.shields.io/badge/React_19-23272f?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Lenis Scroll](https://img.shields.io/badge/Lenis_Scroll-1.3-111111?style=flat-square)](https://github.com/darkroomengineering/lenis)
  [![First Load JS](https://img.shields.io/badge/First_Load_JS-127_kB-success?style=flat-square)](#performance)
  [![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

</div>

---

## ✦ Live Production URL

The site is hosted on Vercel's global edge network:  
🔗 **[https://shaktipadmahato.vercel.app](https://shaktipadmahato.vercel.app)**

---

## ✦ Overview

An Awwwards-inspired personal portfolio designed around a **quiet luxury** aesthetic: pure black, white, and warm off-white (`#f4f2ee`), with smooth single-page scrolling, zero heavy 3D/WebGL dependencies, and 100% factual accuracy to the résumé.

- **Palette**: Warm off-white (`#f4f2ee`), pure card white (`#ffffff`), solid ink (`#0d0d0d`), and fine typography grays. Real brand logos retain their authentic colors with subtle ambient glows.
- **Lightweight**: First-load JavaScript bundle is only **127 kB**.
- **No Third-Party Font CDNs**: All typography is self-hosted locally in WOFF2 format using `next/font/local`.
- **Zero Hallucination Policy**: Every single project, metric, date, certification, skill, and hyperlink is sourced directly from Shakti's official résumé.

---

## ✦ Key Features

| Section | Component | Description & Interactions |
| :--- | :--- | :--- |
| **00 — Navigation** | `Navigation.tsx` | Capsule navbar with frosted glass (`backdrop-filter: blur(12px)`), rotating monogram, sliding ink indicator, top progress bar, and mobile full-screen clip-path drawer. |
| **01 — Hero** | `Hero.tsx` | Centered presenter video seamlessly integrated onto the `#f4f2ee` canvas with zero border mismatch. One-click audio activation pill and round toggle button (`▶` / `❚❚`). |
| **02 — About** | `About.tsx` | Realistic hanging lanyard Developer ID card with damped spring pendulum motion, idle sway, and 3D backface flip displaying credentials and verified competencies. |
| **03 — Skills** | `Skills.tsx` | Categorized tech matrix with official SVG vectors, subtle brand-tinted glows, and interactive category filter chips. |
| **04 — Work** | `Work.tsx` | Interactive project cards featuring *Stock Market Prediction*, *Dynamic Pricing Engine*, and *E-Commerce Pricing Optimization* with modal previews and résumé hyperlinks. |
| **05 — Certifications** | `Certifications.tsx` | Verified credentials from Google, Meta, IBM, Harvard, Cisco, PwC, Microsoft, and Infosys with direct credential links. |
| **06 — Experience** | `Experience.tsx` | Unified timeline detailing internships at Cloud Counselage, Cognifyz, Encryptix, and academics at ITER, SOA University (2024–2028) & Techno India. |
| **07 — Achievements** | `Achievements.tsx` | Competitive coding rankings across LeetCode, CodeChef, HackerRank, GeeksforGeeks, and Unstop. |
| **08 — Contact** | `Contact.tsx` | One-click email copy chip with live feedback, direct LinkedIn/GitHub channels, and downloadable résumé. |

---

## ✦ Design System Tokens

```css
:root {
  --paper:  #f4f2ee; /* Page canvas (warm off-white) */
  --card:   #ffffff; /* Surface cards */
  --ink:    #0d0d0d; /* Primary typography & active buttons */
  --ink-2:  #3a3a3a; /* Secondary text */
  --mute:   #77756f; /* Muted accents & italic counters */
  --faint:  #a9a6a0; /* Borders & hairline outlines */
  --line:   rgba(13, 13, 13, 0.1);
  --ease:   cubic-bezier(0.16, 1, 0.3, 1); /* Universal spring ease */
}
```

### Typography Hierarchy
* **Inter Tight** (Variable): Display headlines and clean body text with tight tracking (`-0.045em`).
* **Instrument Serif** (Regular & Italic): Exactly one italic accent word per section headline.
* **JetBrains Mono** (Variable): Index numbers, section tags, timestamps, and metadata.

---

## ✦ Looping Hero Video Pipeline

The presenter video in the hero is processed using an automated Python & FFmpeg pipeline (`scripts/render_perfect_video.py`):

1. **Neural Studio Matting**: Uses `isnet-general-use` with custom alpha thresholding and edge defringing to cleanly eliminate studio key-light shadows around shoulders and clothing.
2. **Native Canvas Compositing**: Composites the segmented frames directly onto `#f4f2ee` (RGB: 244, 242, 238) for H.264/MP4, and exports transparent alpha for VP9/WebM.
3. **Seamless Loop**: Cross-fades the transition window sample-accurately to ensure zero visible jumps and zero audio pops.
4. **Smart Unmute**: Listens for the visitor's first gesture (`pointerdown`, `click`, `scroll`) to smoothly unlock audio while respecting browser autoplay policies.

---

## ✦ Repository Architecture

```
PORTFOLIO/
├── public/
│   ├── hero/
│   │   ├── hero.mp4            # Clean H.264 video composited on #f4f2ee
│   │   └── hero.webm           # VP9 video with transparent alpha
│   ├── logos/                  # Official SVG brand logos & LICENSE
│   ├── og.jpg                  # OpenGraph preview image (1200x630)
│   ├── portrait-bust.webp      # 480x600 bust portrait
│   └── resume.pdf              # Official downloadable résumé
├── scripts/
│   ├── render_perfect_video.py # Full neural matting & export script
│   └── verify-site.py          # Playwright headless verification suite
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind 4 layers & custom utilities
│   │   ├── layout.tsx          # Local fonts, metadata, themeColor
│   │   └── page.tsx            # Main layout wrapper
│   ├── components/
│   │   ├── hero/Hero.tsx       # Video hero & audio controller
│   │   ├── sections/           # Modular section components
│   │   ├── ui/                 # Reusable UI primitives & RevealObserver
│   │   ├── App.tsx             # Main client shell
│   │   └── Navigation.tsx      # Frosted glass capsule navbar
│   └── lib/
│       ├── data.ts             # Single source of truth for all content
│       ├── hooks.ts            # useInView, useScrollProgress, a11y
│       └── scroll.tsx          # Lenis smooth-scroll provider
├── package.json
└── README.md
```

---

## ✦ Local Development

### 1. Clone & Install
```bash
git clone https://github.com/shaktixgit/portfolio.git
cd portfolio
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run start -p 3000
```

---

## ✦ Performance & Compliance

* **Bundle Weight**: 127 kB First Load JS.
* **Performance**: 0 runtime font downloads, 0 CDN scripts.
* **Accessibility**: Fully keyboard-navigable, valid semantic landmark structure, clear focus outlines, and `prefers-reduced-motion` compliance.

---

## ✦ Author & Contact

**Shakti Pad Mahato**  
*Full Stack Developer & Data Analyst*

* 🌐 **Website**: [shaktipadmahato.vercel.app](https://shaktipadmahato.vercel.app)
* 💼 **LinkedIn**: [linkedin.com/in/shaktixlin](https://www.linkedin.com/in/shaktixlin/) (@shaktixlin)
* 🐙 **GitHub**: [@shaktixgit](https://github.com/shaktixgit)
* ✉️ **Email**: [shaktimahatokumar@gmail.com](mailto:shaktimahatokumar@gmail.com)
* 📍 **Location**: Bhubaneswar, India.

* NEW PROJECTS COMING SOON
