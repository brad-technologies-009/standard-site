// Planet Earth Website JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initThemeToggle()
  initSmoothScrolling()
  initScrollAnimations()
  initFormHandling()
  initScrollToTop()
  initNavbarScroll()
  initLazyLoading()
})

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleMobile = document.getElementById("themeToggleMobile")
  const themeIcon = document.getElementById("themeIcon")
  const themeIconMobile = document.getElementById("themeIconMobile")
  const body = document.body

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"

  // Apply the current theme
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark")
    if (themeIcon) themeIcon.className = "bi bi-moon-fill"
    if (themeIconMobile) themeIconMobile.className = "bi bi-moon-fill"
  } else {
    body.removeAttribute("data-theme")
    if (themeIcon) themeIcon.className = "bi bi-sun-fill"
    if (themeIconMobile) themeIconMobile.className = "bi bi-sun-fill"
  }

  // Function to toggle theme
  const toggleTheme = (button, icon) => {
    const isDark = body.getAttribute("data-theme") === "dark"

    if (isDark) {
      body.removeAttribute("data-theme")
      if (themeIcon) themeIcon.className = "bi bi-sun-fill"
      if (themeIconMobile) themeIconMobile.className = "bi bi-sun-fill"
      localStorage.setItem("theme", "light")
    } else {
      body.setAttribute("data-theme", "dark")
      if (themeIcon) themeIcon.className = "bi bi-moon-fill"
      if (themeIconMobile) themeIconMobile.className = "bi bi-moon-fill"
      localStorage.setItem("theme", "dark")
    }

    // Add a subtle animation to the toggle
    button.style.transform = "scale(0.9)"
    setTimeout(() => {
      button.style.transform = "scale(1)"
    }, 150)
  }

  // Desktop theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      toggleTheme(themeToggle, themeIcon)
    })
  }

  // Mobile theme toggle event listener
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", () => {
      toggleTheme(themeToggleMobile, themeIconMobile)
    })
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements that should animate
  const animateElements = document.querySelectorAll(
    ".feature-card, .topic-card, .product-card, .blog-card, .section-title, .section-subtitle",
  )

  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Form Handling
function initFormHandling() {
  // Contact Form
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleFormSubmission(this, "contact")
    })
  }

  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleFormSubmission(this, "newsletter")
    })
  }
}

function handleFormSubmission(form, type) {
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  // Show loading state
  submitBtn.innerHTML = '<span class="loading"></span> Sending...'
  submitBtn.disabled = true

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Show success message
    showNotification(type === "contact" ? "Message sent successfully!" : "Subscribed successfully!", "success")

    // Reset form
    form.reset()
  }, 2000)
}

// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `alert alert-${type === "success" ? "success" : "info"} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px;"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Scroll to Top Button
function initScrollToTop() {
  // Create scroll to top button
  const scrollTopBtn = document.createElement("button")
  scrollTopBtn.className = "scroll-top"
  scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>'
  scrollTopBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollTopBtn)

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })

  // Scroll to top when clicked
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById("mainNav")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Carousel Auto-play Control
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("#natureCarousel")
  if (carousel) {
    // Pause carousel on hover
    carousel.addEventListener("mouseenter", () => {
      window.bootstrap.Carousel.getInstance(carousel).pause()
    })

    // Resume carousel when mouse leaves
    carousel.addEventListener("mouseleave", () => {
      window.bootstrap.Carousel.getInstance(carousel).cycle()
    })
  }
})

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Performance Optimization: Debounced Scroll Handler
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add any scroll-based functionality here
  updateActiveNavLink()
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)

// Update Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Accessibility Improvements
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
    const mainContent = document.querySelector("main") || document.querySelector("#home")
    if (mainContent) {
      mainContent.focus()
      e.preventDefault()
    }
  }
})

// Error Handling for External Resources
window.addEventListener("error", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.src = "/placeholder.svg?height=200&width=300&text=Image+Not+Found"
    e.target.alt = "Image not available"
  }
})

const nav = document.getElementById('mainNav');
function onScroll() {
  if (window.scrollY >= 20) {
    nav.classList.add('scrolled', 'navbar-light');
    nav.classList.remove('navbar-dark');
  } else {
    nav.classList.remove('scrolled', 'navbar-light');
    nav.classList.add('navbar-dark');
  }
}

window.addEventListener('scroll', onScroll);
onScroll(); // run once when the page loads