const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const counters = document.querySelectorAll(".counter");
const skillSpans = document.querySelectorAll(".skill-bar span");

const blogPosts = [
  {
    title: "Designing Multi-Vendor Architectures for Rwanda",
    category: "Web Development",
    date: "Nov 2025",
    excerpt:
      "Behind the scenes of Bugufi.rw — from merchant onboarding flows to escrow logic and analytics for SMEs.",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=80",
    slug: "multi-vendor-architectures",
    tags: ["PHP", "Spring", "Payments"],
    content: `
      Building Bugufi.rw meant balancing merchant experience, compliance, and
      performance. I leaned on Spring Boot services with MySQL sharding for
      orders, plus a PHP storefront for rapid UI iterations. Escrow logic
      synchronizes Flutterwave and MTN Momo so payouts stay transparent.
    `,
  },
  {
    title: "How DevzChallenge Blends Training with C Compiler Sandboxes",
    category: "Programming Tips",
    date: "Oct 2025",
    excerpt:
      "Creating fair, timed assessments with an online C compiler, anti-plagiarism checks, and instant feedback loops.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    slug: "devzchallenge-c-compiler",
    tags: ["C", "Education", "Security"],
    content: `
      DevzChallenge merges coaching and fair assessments. The C compiler
      container runs on isolated sandboxes, while timed tests push event data to
      dashboards for instructors. Students get hints, but submissions run through
      plagiarism heuristics before scoring.
    `,
  },
  {
    title: "AI + Agritech: Potatoes Disease Detection Journey",
    category: "Project Updates",
    date: "Sep 2025",
    excerpt:
      "Collecting farmer data, fine-tuning models, and shipping a WhatsApp bot for instant potato disease insights.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
    slug: "potato-disease-detection",
    tags: ["AI", "Agritech", "UX"],
    content: `
      Farmers snap a photo, WhatsApp handles the upload, and a lightweight CNN
      runs inference before returning actionable advice. We obsessed over low
      bandwidth regions and added offline tips, while agronomists helped
      validate the dataset.
    `,
  },
  {
    title: "My School Journey: Balancing Coursework and Freelance",
    category: "My School Journey",
    date: "Aug 2025",
    excerpt:
      "Time blocking, automation, and accountability systems that keep me shipping products while studying.",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=900&q=80",
    slug: "school-journey-productivity",
    tags: ["Productivity", "Student Life"],
    content: `
      Task batching, templates, and ruthless prioritization allow me to serve
      clients, learn new stacks, and still ace coursework. This post breaks down
      my weekly rhythm, mentorship takeaways, and resilience lessons.
    `,
  },
  {
    title: "Secure Auth Flows for Training Platforms",
    category: "Cybersecurity",
    date: "Jul 2025",
    excerpt:
      "Multi-factor auth, device trust, and rate limiting patterns I deploy across training dashboards.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80",
    slug: "secure-auth-flows",
    tags: ["Security", "APIs"],
    content: `
      From WhatsApp OTP fallbacks to device fingerprints, this guide covers
      every safeguard I add to learning platforms so cohorts stay safe and data
      remains private. Includes sample middleware logic for Spring Boot and PHP.
    `,
  },
];

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (navLinks) {
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
    }
  });
}

const storedTheme = localStorage.getItem("aimable-theme");
if (storedTheme) {
  body.setAttribute("data-theme", storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = body.getAttribute("data-theme") === "light" ? "dark" : "light";
    body.setAttribute("data-theme", current);
    localStorage.setItem("aimable-theme", current);
  });
}

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const increment = target / 200;
    const update = () => {
      const value = +counter.innerText;
      if (value < target) {
        counter.innerText = Math.ceil(value + increment);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

if (counters.length) {
  observer.observe(counters[0]);
}

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillSpans.forEach((span, index) => {
          span.style.width = `${70 + index * 5}%`;
        });
        skillsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

if (skillSpans.length) {
  skillsObserver.observe(skillSpans[0]);
}

/* Blog Rendering */
const blogGrid = document.getElementById("blogGrid");
if (blogGrid) {
  blogGrid.innerHTML = blogPosts
    .slice(0, 3)
    .map(
      (post) => `
    <article class="blog-card">
      <img src="${post.image}" alt="${post.title}" loading="lazy" />
      <span class="category">${post.category}</span>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="blog-detail.html?slug=${post.slug}">Read More →</a>
    </article>
  `
    )
    .join("");
}

/* Blog page */
const blogList = document.getElementById("blogList");
const blogFilters = document.querySelectorAll(".filter-btn");

const renderBlogList = (category = "All") => {
  if (!blogList) return;
  const filtered =
    category === "All" ? blogPosts : blogPosts.filter((post) => post.category === category);
  blogList.innerHTML = filtered
    .map(
      (post) => `
      <article class="blog-card">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
        <span class="category">${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <small>${post.date}</small>
        <a href="blog-detail.html?slug=${post.slug}">Read More →</a>
      </article>
    `
    )
    .join("");
};

if (blogList) {
  renderBlogList();
  blogFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      blogFilters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderBlogList(btn.dataset.category);
    });
  });
}

/* Blog detail page */
const detailContainer = document.getElementById("blogDetail");
if (detailContainer) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const post = blogPosts.find((item) => item.slug === slug) || blogPosts[0];
  detailContainer.innerHTML = `
      <header>
        <p class="eyebrow">${post.category}</p>
        <h1>${post.title}</h1>
        <p>${post.date} • ${post.tags.join(" • ")}</p>
      </header>
      <img src="${post.image}" alt="${post.title}" />
      <article>
        <p>${post.content}</p>
        <p>
          Every build is a case study. Need a deeper dive into ${post.category.toLowerCase()}?
          <a href="mailto:aimableshyaka@gmail.com">Let’s talk.</a>
        </p>
      </article>
  `;
}

/* EmailJS Integration */
emailjs.init("JSL3QlS_LCyfNb0Cb");

/* Contact form */
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    try {
      const userName = form.querySelector('input[name="name"]').value;
      const userEmail = form.querySelector('input[name="email"]').value;
      const projectType = form.querySelector('select[name="project"]').value;
      const userMessage = form.querySelector('textarea[name="message"]').value;
      
      // Auto-reply to user (sender) - goes to the person who filled the form
      const autoReplyData = {
        name: userName,
        email: userEmail, // Sender's email - auto-reply goes to them
        title: projectType,
        message: userMessage,
      };
      
      // Notification to owner (you) - includes ALL form data
      // This email goes to YOU (shyakaaimable07@gmail.com) with all the form submission details
      // Using template_s1zm645 which shows all the details
      // Note: email field is set to YOUR email so the notification goes to you, not the client
      const notificationData = {
        name: `${userName} (${userEmail})`, // Sender's name with their email
        email: "shyakaaimable07@gmail.com", // YOUR email - so notification goes to you
        project: projectType, // Project type (matches template variable {{project}})
        message: userMessage, // The message they sent
      };
      
      // Send both emails using different templates
      // Auto-reply to user (sender) - goes to their email with existing template
      console.log("Sending auto-reply to:", userEmail);
      const autoReplyPromise = emailjs.send("service_6bk47ho", "template_ufszpfe", autoReplyData);
      
      // Notification to owner (you) - goes to your email with all form details
      // Using template_s1zm645 which displays: name, email, project, and message
      console.log("Sending notification to: shyakaaimable07@gmail.com");
      const notificationPromise = emailjs.send("service_6bk47ho", "template_s1zm645", notificationData);
      
      await Promise.all([autoReplyPromise, notificationPromise]);
      console.log("Both emails sent successfully!");
      
      alert("Thank you! I've received your message and will get back to you shortly.");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Oops! Something went wrong. Please try again or contact me directly at shyakaaimable07@gmail.com");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

