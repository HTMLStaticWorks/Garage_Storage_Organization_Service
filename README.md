# GaragePro — Luxury Garage & Storage Organization Service

A premium, modern, highly responsive website built for a professional garage and storage organization service.

## 🚀 Key Highlights & Architectural Features

1. **Brand & Unique Visual Identity**:
   - **Direction**: Luxury Architectural Precision & Modern Workshop Engineering.
   - **Colors**: Deep Carbon Slate (`#0B1320`), Architectural Steel (`#475569`), and Precision Safety Copper-Amber (`#EA580C`).
   - **Typography System**: Google Fonts `'Outfit'` (for titles & modern clean display) and `'Plus Jakarta Sans'` (for body & UI labels), adhering strictly to a maximum heading font weight of **580** (never 600+) with fractional intermediate weights (`540`, `520`, `500`, `420`, `460`).

2. **Interactive Before / After Transformation Engine**:
   - Touch and mouse-draggable comparison slider showing dramatic before/after garage transformations.
   - Multi-device compatibility with smooth hardware-accelerated animations.

3. **Dynamic Interactive Space Estimator (Home 2)**:
   - Configurable space planner calculating real-time pricing based on bay size (1-car, 2-car, 3-car, custom) and upgrade options (diamond polyaspartic floors, welded steel cabinets, motorized lifts).

4. **Strict Responsive Breakpoints & Navigation Rules**:
   - `> 1024px`: Full horizontal navbar with all links, theme toggle, and "Login" button.
   - `≤ 1024px`: Hamburger menu triggering a smooth slide drawer from the right (or left in RTL mode).
   - `360px`: Full-width mobile slide drawer with centered layouts and touch-friendly targets.

5. **Bidirectional RTL Support**:
   - Seamless RTL toggling via `dir="rtl"` on `<html>` and `.rtl` class on `<body>`.
   - Dedicated `assets/css/rtl.css` for clean direction-based layout and drawer overrides.
   - ⇆ icon toggle in desktop header and mobile drawer.

6. **Comprehensive Dark / Light Mode**:
   - System preference detection (`prefers-color-scheme`) with `localStorage` persistence.
   - Sun/Moon icon toggle smoothly switching design tokens in `:root` and `[data-theme="dark"]`.
   - Excluded strictly from authentication pages (`login.html` & `register.html`).

7. **Client-Side Form Validation**:
   - Real-time regex email checking, minimum password lengths, password match verification, and terms acceptance checkboxes.
   - Instant visual error and success states with inline alerts without page reloads.

---

## 📁 File Structure

```
Garage & Storage Organization Service/
├── index.html              # Main Home (Hero animation, Before/After slider, Services, Features, Testimonials, CTA)
├── home2.html              # Alternative Home (Interactive Space Planner / Estimator, 4-step workflow, gallery)
├── services.html           # 6 Core services, Tier comparison matrix, specs, interactive FAQ accordion
├── about.html              # Heritage story, engineering philosophy, 10-year timeline, leadership team
├── blog.html               # Magazine grid, search/filter, read times, newsletter
├── blog-single.html        # Comprehensive workshop case study, author bio, interactive comments
├── contact.html            # 3D Consultation & quote form, direct hotline cards, map placeholder
├── login.html              # Centered auth card (Email, Password, Google, Apple, Register link)
├── register.html           # Centered auth card (Name, Email, Password, Confirm, Terms, Social buttons)
├── dashboard.html          # Client project tracker, 3D render status, specs, engineer messenger
├── 404.html                # Custom blueprint 404 error page with quick links
├── coming-soon.html        # Countdown timer & early beta access signup for iOS AR LiDAR App
├── assets/
│   ├── css/
│   │   ├── style.css       # Design tokens, typography rules, dark mode, animations, breakpoints
│   │   └── rtl.css         # RTL direction overrides and drawer left-slide rules
│   └── js/
│       └── main.js         # Mobile drawer, RTL toggle, Dark mode, Before/After sliders, Form validation
└── README.md               # Documentation & setup overview
```

---

## 💻 How to Run Locally

You can open any `.html` file directly in your browser, or start a local lightweight web server:

```bash
# Python 3
python -m http.server 8000

# Node.js npx serve
npx serve .
```

Navigate to `http://localhost:8000` to view the website.
