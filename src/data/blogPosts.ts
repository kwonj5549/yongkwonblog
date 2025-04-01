
import { BlogPost } from "@/components/BlogCard";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt: "Explore the emerging technologies and methodologies that are reshaping how we build for the web, from WebAssembly to Edge Computing.",
    date: "May 15, 2023",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    category: "Web Development",
    author: {
      name: "Alex Johnson",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    slug: "future-web-development-trends-2023"
  },
  {
    id: "2",
    title: "Building Accessible UIs: A Comprehensive Guide",
    excerpt: "Learn how to create interfaces that are usable by everyone, including people with disabilities, and why accessibility should be a priority.",
    date: "April 22, 2023",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    category: "Accessibility",
    author: {
      name: "Sarah Chen",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    slug: "building-accessible-uis-comprehensive-guide"
  },
  {
    id: "3",
    title: "From Monolith to Microservices: A Journey",
    excerpt: "A case study on how our team transitioned a legacy monolithic application to a modern microservices architecture.",
    date: "March 10, 2023",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    category: "Architecture",
    author: {
      name: "Michael Rodriguez",
      avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    slug: "monolith-to-microservices-journey"
  },
  {
    id: "4",
    title: "The Psychology of Great User Experience Design",
    excerpt: "Understanding how human psychology influences user interactions and how designers can leverage these insights.",
    date: "February 18, 2023",
    imageUrl: "https://images.unsplash.com/photo-1555421689-d68471e189f2",
    category: "UX Design",
    author: {
      name: "Emily Taylor",
      avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    slug: "psychology-great-user-experience-design"
  },
  {
    id: "5",
    title: "Optimizing Performance: Web Vitals Explained",
    excerpt: "A deep dive into Core Web Vitals and how to measure and improve these critical performance metrics.",
    date: "January 29, 2023",
    imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2",
    category: "Performance",
    author: {
      name: "David Kim",
      avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    slug: "optimizing-performance-web-vitals-explained"
  },
  {
    id: "6",
    title: "The Art of Technical Writing: Documentation That Doesn't Suck",
    excerpt: "Strategies and best practices for creating documentation that developers actually want to read and use.",
    date: "January 15, 2023",
    imageUrl: "https://images.unsplash.com/photo-1519291884310-9472f14f0a8e",
    category: "Documentation",
    author: {
      name: "Rachel Lee",
      avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    slug: "art-technical-writing-documentation"
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export const fullBlogContent = {
  "future-web-development-trends-2023": `
## The Future of Web Development: Trends to Watch in 2023

As we move through 2023, the web development landscape continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging that promise to change how we build and interact with web applications.

### WebAssembly: Beyond JavaScript

WebAssembly (Wasm) has been gaining significant traction. It allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. This opens up new possibilities for web applications, especially those requiring intensive calculations or processing.

Key developments include:

- **Component Model**: Making it easier to share and compose Wasm modules
- **Garbage Collection**: Enabling languages like Java and C# to compile efficiently to Wasm
- **Integration with Web APIs**: Tighter integration with existing web platform features

### Edge Computing: The New Frontier

The edge computing paradigm is shifting how we think about deployment and processing. Instead of centralizing everything in a handful of data centers, computation is moving closer to where users are.

\`\`\`
// Example of an Edge Function on Cloudflare Workers
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // The request location is automatically detected
  const userRegion = request.cf.region
  
  // Process based on user's location
  return new Response(\`Hello from \${userRegion}!\`, {
    headers: { 'content-type': 'text/plain' },
  })
}
\`\`\`

### The Rise of Headless Architecture

Headless CMS and commerce platforms continue to grow in popularity, separating content and business logic from presentation. This approach offers several benefits:

- Greater flexibility in frontend technologies
- Better performance through targeted optimization
- Easier omnichannel content delivery

### AI-Enhanced Development

Artificial intelligence is transforming how developers work:

- **Copilot-style assistants**: Suggesting code completions and helping solve problems
- **Automated testing**: Generating test cases and identifying potential issues
- **Design-to-code tools**: Converting mockups directly to implementation code

### Web Components and Custom Elements

While frameworks like React, Vue, and Angular remain popular, there's growing interest in standardized Web Components:

\`\`\`
<custom-datepicker format="MM/DD/YYYY" theme="dark">
  <input type="text" placeholder="Select a date">
</custom-datepicker>
\`\`\`

The ability to create reusable, framework-agnostic components has obvious advantages for large organizations and design systems.

### Accessibility as a Priority

Web accessibility is finally getting the attention it deserves. With legal requirements becoming stricter and ethical considerations more prominent, developers are focusing on making web applications usable by everyone:

- Screen reader compatibility
- Keyboard navigation
- Color contrast and readability
- Reduced motion options

### Conclusion

The web development ecosystem continues to mature and evolve. The trends we're seeing reflect a focus on performance, developer experience, and inclusivity. By staying informed about these developments, developers can position themselves to build better, more effective web applications in the years to come.
  `,
  
  "building-accessible-uis-comprehensive-guide": `
## Building Accessible UIs: A Comprehensive Guide

Creating accessible user interfaces isn't just a nice-to-have—it's an essential part of web development that ensures your applications can be used by everyone, regardless of disability or impairment. This guide will walk you through key considerations and techniques for building truly accessible UIs.

### Understanding Accessibility

Web accessibility, often abbreviated as a11y (11 letters between 'a' and 'y'), refers to designing and developing websites that can be used by people with:

- Visual impairments
- Hearing impairments
- Motor disabilities
- Cognitive disabilities

By building accessible interfaces, you're not only doing the right thing ethically but also:

- Increasing your potential user base
- Improving SEO (many accessibility practices align with SEO best practices)
- Often meeting legal requirements (such as ADA compliance in the US)

### Key Principles of Accessible Design

#### Perceivable

Information must be presentable to users in ways they can perceive:

- Provide text alternatives for non-text content
- Create content that can be presented in different ways
- Make it easier for users to see and hear content

\`\`\`
<!-- Bad example -->
<img src="chart-data.png">

<!-- Good example -->
<img src="chart-data.png" alt="Bar chart showing sales growth of 25% in Q1, 30% in Q2, and 15% in Q3">
\`\`\`

#### Operable

User interface components must be operable:

- Make all functionality available from a keyboard
- Give users enough time to read and use content
- Avoid content that could cause seizures or physical reactions
- Help users navigate and find content

#### Understandable

Information and operation of the user interface must be understandable:

- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes

#### Robust

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies:

- Maximize compatibility with current and future tools

### Practical Implementation Steps

#### Semantic HTML

One of the most effective ways to improve accessibility is to use proper semantic HTML elements:

\`\`\`
<!-- Bad -->
<div class="header">
  <div class="navigation">
    <div class="navItem">Home</div>
    <div class="navItem">About</div>
  </div>
</div>

<!-- Good -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
\`\`\`

#### ARIA when necessary

ARIA (Accessible Rich Internet Applications) attributes can enhance accessibility when HTML semantics aren't sufficient:

\`\`\`
<button 
  aria-expanded="false" 
  aria-controls="dropdown-menu"
  aria-haspopup="true">
  Options
</button>
<ul id="dropdown-menu" hidden>
  <!-- Menu items -->
</ul>
\`\`\`

#### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

- Maintain a logical tab order
- Provide visible focus states
- Create keyboard shortcuts for common actions

#### Color and Contrast

- Maintain a minimum contrast ratio of 4.5:1 for normal text
- Don't rely solely on color to convey information
- Consider color blindness in your design choices

### Testing for Accessibility

Regular testing is crucial for maintaining accessibility:

- **Automated tools**: Lighthouse, axe, Wave
- **Screen reader testing**: NVDA, VoiceOver, JAWS
- **Keyboard navigation testing**: Navigate your entire application without a mouse
- **User testing**: Work with users who have disabilities

### Conclusion

Building accessible UIs requires deliberate effort and awareness, but it's a skill worth developing. By incorporating these principles and practices into your workflow, you'll create applications that can be used by everyone—and that's something to be proud of.
  `,
};
