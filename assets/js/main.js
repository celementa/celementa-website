/* ============================================================
   Celementa — site scripts
   ------------------------------------------------------------
   FORM SETTINGS: change these two lines if you ever need to.
   Form submissions are delivered by FormSubmit.co (free).
   ============================================================ */
const FORM_EMAIL   = "sergei@celementa.com";
const FORM_SUBJECT = "RE [Form Celementa website]";

/* Header: solid background once you scroll, mobile menu */
const header = document.querySelector(".header");
const onScroll = () => header && header.classList.toggle("solid", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const menuBtn = document.querySelector(".menu-btn");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav a").forEach(a =>
    a.addEventListener("click", () => header.classList.remove("open"))
  );
}

/* Reveal-on-scroll + number counters */
const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    if (e.target.dataset.count) countUp(e.target);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 }) : null;

document.querySelectorAll(".reveal,[data-count]").forEach((el) => {
  if (io) io.observe(el); else { el.classList.add("in"); if (el.dataset.count) countUp(el); }
});

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
  const dur = 1600, t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + Math.round(target * eased) + suf;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* Contact form → email via FormSubmit */
const form = document.querySelector("#contact-form");
if (form) {
  const msg = form.querySelector(".form-msg");
  const btn = form.querySelector("button[type=submit]");
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (form.querySelector("[name=_honey]").value) return; // bot
    const data = Object.fromEntries(new FormData(form).entries());
    delete data._honey;
    const payload = {
      "Last name": data.last_name,
      "First name": data.first_name,
      "Email": data.email,
      "Phone": data.phone,
      "Message": data.message,
      "Page": location.href,
      _subject: FORM_SUBJECT,
      _replyto: data.email,
      _template: "table",
      _captcha: "false"
    };
    btn.disabled = true; btn.textContent = "Sending…";
    msg.className = "form-msg";
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + FORM_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error(json.message || "Error");
      form.reset();
      msg.textContent = "Thank you! Your message has been sent — we'll get back to you shortly.";
      msg.className = "form-msg ok";
    } catch (e) {
      console.error("Contact form:", e.message); // e.g. FormSubmit "needs activation"
      msg.textContent = "Sorry, something went wrong. Please email us at sergei@celementa.com.";
      msg.className = "form-msg err";
    } finally {
      btn.disabled = false; btn.textContent = "Submit";
    }
  });
}
