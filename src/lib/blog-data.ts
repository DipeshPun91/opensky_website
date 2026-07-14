export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[]; // paragraphs — swap for real copy whenever it's ready
}

// Dummy placeholder posts — swap in real content whenever the actual blog
// copy is ready. Images are Unsplash stock, same as the rest of the
// site's placeholder imagery. readTime is a placeholder estimate.
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "paragliding-in-pokhara-for-beginners",
    title: "Paragliding in Pokhara for Beginners: Everything You Need to Know",
    excerpt:
      "New to paragliding? Here's what to expect on your first tandem flight, from pre-flight briefing to touchdown over Phewa Lake.",
    category: "Beginners Guide",
    date: "June 12, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=1200&auto=format&fit=crop&crop=center",
    content: [
      "If you've never paraglided before, the idea of running off a mountainside can sound a little intimidating. In practice, a tandem flight in Pokhara is one of the most approachable adventure activities you can try — no experience, fitness level, or special gear required.",
      "Every tandem flight starts with a short briefing at the launch site. Your pilot will walk you through the harness, the launch run, and what to expect during the flight itself — including how to sit back and let the glider do the work once you're airborne.",
      "The launch itself is over in a few seconds. A short run downhill, the wing fills with air above you, and then the ground simply falls away. From there, it's just you, your pilot, and a slow, quiet drift over the Annapurna foothills.",
      "Most flights last between 20 and 30 minutes, gliding above Phewa Lake, forested ridgelines, and small hillside villages before a gentle landing on the lakeshore. Bring a light jacket, closed-toe shoes, and a camera — the views are worth it.",
    ],
  },
  {
    id: 2,
    slug: "no-1-paragliding-in-nepal",
    title: "No. 1 Paragliding in Nepal",
    excerpt:
      "What makes Pokhara one of the world's top paragliding destinations, and why pilots and adventurers keep coming back.",
    category: "Destination",
    date: "May 28, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=1200&auto=format&fit=crop&crop=center",
    content: [
      "Pokhara is consistently ranked among the best paragliding destinations on earth, and it's not hard to see why once you're in the air. Reliable thermals, a dramatic mountain backdrop, and a gentle lakeside landing zone make it an ideal spot for pilots of every level.",
      "The launch site at Sarangkot sits roughly 1,600 meters above the valley floor, giving pilots a long, scenic descent with the Annapurna and Machhapuchhre ranges as a backdrop for nearly the entire flight.",
      "Beyond the scenery, Pokhara's weather patterns are unusually consistent for paragliding — predictable thermals form most afternoons for much of the year, which is part of why the city attracts cross-country pilots from around the world in addition to first-time tandem flyers.",
    ],
  },
  {
    id: 3,
    slug: "best-paragliding-company-in-pokhara",
    title: "Best Paragliding Company in Pokhara",
    excerpt:
      "A look at what to check for when picking a paragliding operator — certifications, pilot experience, and safety record.",
    category: "Guide",
    date: "May 15, 2026",
    readTime: "6 min read",
    image:
      "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=1200&auto=format&fit=crop&crop=center",
    content: [
      "With dozens of paragliding operators in Pokhara, picking the right one can feel overwhelming. A few things are worth checking before you book: pilot certification, years of active flying experience, and whether the company tracks weather conditions daily rather than flying regardless of conditions.",
      "Ask how long your specific pilot has been flying tandem, not just how long the company has existed. Experienced pilots read thermals and wind conditions more conservatively, which matters far more to your safety than a flashy website.",
      "It's also worth asking about equipment maintenance schedules and whether gliders and harnesses are replaced on a regular cycle — reputable operators will have a clear answer ready.",
    ],
  },
  {
    id: 4,
    slug: "price-of-paragliding-in-pokhara",
    title: "Price of Paragliding in Pokhara",
    excerpt:
      "A breakdown of what typically goes into tandem flight pricing, and what's usually included in the package.",
    category: "Planning",
    date: "April 30, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=1200&auto=format&fit=crop&crop=center",
    content: [
      "Tandem paragliding prices in Pokhara vary based on flight duration, add-ons like photo and video packages, and pickup/drop-off arrangements from your hotel. Standard flights run 20-30 minutes, with longer cross-country options available for more experienced flyers.",
      "Most packages include hotel transfers, all safety equipment, a pre-flight briefing, and a certified tandem pilot. Photo and video packages are usually offered as an add-on, since your pilot's hands are occupied flying rather than filming during a standard flight.",
      "It's worth booking directly with a certified operator rather than through an unlicensed street tout — pricing is often similar, but you'll have far more clarity on who's actually flying with you.",
    ],
  },
  {
    id: 5,
    slug: "why-choose-open-sky-paragliding",
    title: "Why Choose Open Sky Paragliding?",
    excerpt:
      "Certified pilots, daily weather tracking, and a launch site away from the crowds — here's what sets us apart.",
    category: "About Us",
    date: "April 18, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=1200&auto=format&fit=crop&crop=center",
    content: [
      "Every pilot on our team is certified and has years of active flying experience over the Pokhara valley. We check weather conditions every morning before deciding whether flights go ahead, rather than flying on a fixed schedule regardless of conditions.",
      "We keep our groups small and our launch times spaced out, so you're not rushed through a briefing or waiting in a long line at the top of the hill with dozens of other flyers.",
      "Above all, we care about making your first (or fiftieth) flight feel unhurried and genuinely enjoyable — not just another item checked off a tourist itinerary.",
    ],
  },
  {
    id: 6,
    slug: "all-about-paragliding",
    title: "All About Paragliding",
    excerpt:
      "The basics of how paragliding actually works — from thermals and launch technique to landing safely.",
    category: "Basics",
    date: "April 2, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&crop=center",
    content: [
      "A paraglider is, at its core, a fabric wing shaped by internal air pressure rather than a rigid frame. Once inflated, it behaves aerodynamically much like a small aircraft wing — generating lift as air moves over its curved surface.",
      "Pilots launch by running downhill until the wing generates enough lift to carry their weight, at which point they simply lift off the ground and sit back into the harness. From there, control comes from two brake lines that adjust the shape of the wing's trailing edge.",
      "Thermals — columns of rising warm air — let pilots gain altitude and stay airborne far longer than a simple glide down would allow, which is how experienced cross-country pilots can stay up for hours at a time.",
      "Landings are typically a gentle, controlled descent into an open field, with the pilot flaring the wing just before touchdown to slow their speed to a walking pace.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
