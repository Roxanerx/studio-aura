(function () {
  "use strict";

  const BUILD_SEQUENCE_ID = "build-sequence";
  const BUILD_VIDEO_SRC = "src/assets/video-camadas.mp4";

  function setupHeader() {
    const header = document.getElementById("header");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    function updateHeader() {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    function closeNav() {
      if (!navToggle || !navMenu) return;
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function openNav() {
      if (!navToggle || !navMenu) return;
      navToggle.setAttribute("aria-expanded", "true");
      navMenu.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeNav();
      else openNav();
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  function setupReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  function setupHeroParallax() {
    const heroVideo = document.querySelector(".hero__video");
    if (!heroVideo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          const offset = Math.min(window.scrollY * 0.12, 80);
          heroVideo.style.transform =
            "translate3d(0, " + offset * 0.25 + "px, 0) scale(1.05)";
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function setupMediaVisibility() {
    document.querySelectorAll("video").forEach(function (video) {
      if (video.classList.contains("build-sequence__video")) return;

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          video.pause();
        } else if (video.hasAttribute("autoplay")) {
          video.play().catch(function () {});
        }
      });
    });
  }

  function setupBuildSequence() {
    const section = document.querySelector(".build-sequence");
    const stage = section && section.querySelector(".build-sequence__stage");
    const video = section && section.querySelector(".build-sequence__video");
    const panels = section
      ? Array.from(section.querySelectorAll(".build-sequence__panel"))
      : [];

    if (!section || !stage || !video || !window.gsap || !window.ScrollTrigger) {
      return null;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.preload = "auto";

    let masterTimeline = null;
    let scrollTrigger = null;
    let videoDuration = 0;
    let videoReady = false;
    let pendingFrameUpdate = false;
    let queuedProgress = 0;

    function killBuildSequence() {
      if (scrollTrigger) {
        scrollTrigger.kill();
        scrollTrigger = null;
      }

      if (masterTimeline) {
        masterTimeline.kill();
        masterTimeline = null;
      }
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function setVideoReady() {
      if (videoReady) {
        return;
      }
      if (!video.duration || !Number.isFinite(video.duration)) {
        return;
      }
      videoDuration = video.duration;
      videoReady = true;
      updateVideoFrame(0);
    }

    if (video.readyState >= 2) {
      setVideoReady();
    } else {
      video.addEventListener("loadedmetadata", setVideoReady);
      video.addEventListener("durationchange", setVideoReady);
      video.addEventListener("canplay", setVideoReady);
    }

    video.addEventListener("loadeddata", function () {
      if (!videoReady) {
        setVideoReady();
      }
    }, { once: true });

    video.load();

    function updateVideoFrame(progress) {
      queuedProgress = clamp(progress, 0, 1);
      if (!videoReady) {
        return;
      }
      if (pendingFrameUpdate) {
        return;
      }
      pendingFrameUpdate = true;
      requestAnimationFrame(function () {
        video.currentTime = clamp(videoDuration * queuedProgress, 0, videoDuration);
        pendingFrameUpdate = false;
      });
    }

    function buildPanelsTimeline(timeline) {
      const timings = [0, 0.28, 0.56];
      const xOffsets = [-82, 82, -82];
      const yOffsets = [-62, -58, -54];

      panels.forEach(function (panel, index) {
        const appearAt = timings[index] || 0;
        const hideAt = appearAt + 0.32;
        const xFrom = xOffsets[index] || -82;
        const yFrom = yOffsets[index] || -62;

        timeline.fromTo(
          panel,
          { autoAlpha: 0, yPercent: yFrom, x: xFrom, scale: 0.98 },
          {
            autoAlpha: 1,
            yPercent: -50,
            x: 0,
            scale: 1,
            duration: 0.34,
            ease: "power3.out",
          },
          appearAt
        );

        timeline.to(
          panel,
          {
            autoAlpha: 0,
            yPercent: -42,
            duration: 0.26,
            ease: "power2.inOut",
          },
          hideAt
        );
      });
    }

    function buildSequence() {
      gsap.set(panels, { autoAlpha: 0, yPercent: -50, visibility: "visible" });
      if (panels[0]) gsap.set(panels[0], { x: -40 });
      if (panels[1]) gsap.set(panels[1], { x: 40 });
      if (panels[2]) gsap.set(panels[2], { x: -40 });

      masterTimeline = gsap.timeline({ defaults: { ease: "none" } });
      buildPanelsTimeline(masterTimeline);

      scrollTrigger = ScrollTrigger.create({
        id: BUILD_SEQUENCE_ID,
        trigger: stage,
        start: "top top",
        end: function () {
          return "+=" + Math.round(window.innerHeight * 1.2);
        },
        pin: stage,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        animation: masterTimeline,
        onUpdate: function (self) {
          if (videoReady) {
            updateVideoFrame(self.progress);
          }
        },
        onEnter: function (self) {
          if (videoReady) {
            updateVideoFrame(self.progress);
          }
        },
        onEnterBack: function (self) {
          if (videoReady) {
            updateVideoFrame(self.progress);
          }
        },
        onLeave: function () {
          if (videoReady) {
            updateVideoFrame(1);
          }
        },
        onLeaveBack: function () {
          if (videoReady) {
            updateVideoFrame(0);
          }
        },
        onRefresh: function (self) {
          if (videoReady) {
            updateVideoFrame(self.progress);
          }
        },
      });
    }

    video.addEventListener("error", function () {
      console.warn("[Build Sequence] Erro ao carregar:", BUILD_VIDEO_SRC);
    });

    buildSequence();

    let resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        killBuildSequence();
        buildSequence();
        ScrollTrigger.refresh(false);
      }, 300);
    });

    return {
      refresh: function () {
        ScrollTrigger.refresh(false);
      },
      destroy: killBuildSequence,
    };
  }

  function setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formSuccess = document.getElementById("form-success");
    if (!contactForm) return;

    const messages = {
      nome: "Informe seu nome completo (mínimo 2 caracteres).",
      email: "Informe um e-mail válido.",
      mensagem: "Descreva seu projeto com pelo menos 10 caracteres.",
    };

    function showFieldError(field, message) {
      const wrapper = field.closest("[data-field]");
      if (!wrapper) return;
      const errorEl = wrapper.querySelector(".form-field__error");
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.hidden = false;
      }
    }

    function clearFieldError(field) {
      const wrapper = field.closest("[data-field]");
      if (!wrapper) return;
      const errorEl = wrapper.querySelector(".form-field__error");
      field.classList.remove("is-invalid");
      field.removeAttribute("aria-invalid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }
    }

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateField(field) {
      const name = field.name;
      const value = field.value.trim();

      if (name === "nome" && value.length < 2) {
        showFieldError(field, messages.nome);
        return false;
      }

      if (name === "email" && !validateEmail(value)) {
        showFieldError(field, messages.email);
        return false;
      }

      if (name === "mensagem" && value.length < 10) {
        showFieldError(field, messages.mensagem);
        return false;
      }

      clearFieldError(field);
      return true;
    }

    contactForm.querySelectorAll(".form-field__input").forEach(function (input) {
      input.addEventListener("blur", function () {
        validateField(input);
      });

      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) validateField(input);
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (formSuccess) formSuccess.hidden = true;

      const fields = contactForm.querySelectorAll(".form-field__input");
      let valid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        const firstInvalid = contactForm.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = contactForm.querySelector(".form__submit");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      window.setTimeout(function () {
        contactForm.reset();
        fields.forEach(clearFieldError);
        if (formSuccess) formSuccess.hidden = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar mensagem";
        }
      }, 800);
    });
  }

  function init() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    setupHeader();
    setupReveal();
    setupHeroParallax();
    setupMediaVisibility();

    const buildSequence = setupBuildSequence();
    setupContactForm();

    window.addEventListener("load", function () {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh(false);
      }
      if (buildSequence && buildSequence.refresh) {
        buildSequence.refresh();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
