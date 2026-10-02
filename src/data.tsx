// All of the site's content lives here, so updating the portfolio means editing this one file.
import React from "react";

const ext = { target: "_blank", rel: "noreferrer" } as const;

export const LINKS = {
  email: "mailto:adeebhussain2@hotmail.com",
  linkedin: "https://www.linkedin.com/in/adeebhussain/",
  github: "https://github.com/deebo19",
  coldplay: "https://www.meta.com/en-gb/blog/coldplay-quest-horizon-arena-music-spheres-world-tour-beat-saber-supernatural-iheartradio/",
  discoveryLaunch: "https://ir.corporate.discovery.com/news-and-events/financial-news/financial-news-details/2020/Discovery-Announces-The-Global-Launch-Of-discovery-The-Definitive-Streaming-Service-For-The-Best-Real-Life-Entertainment-in-The-World-Debuting-January-4-2021/default.aspx",
  wbdSubs: "https://variety.com/2023/tv/news/hbo-max-subscribers-discovery-plus-q4-2022-1235533690/",
  c4Results2018: "https://www.channel4.com/press/news/channel-4-posts-strong-2018-annual-results-growth-revenues-and-record-digital-viewing",
  c4Report2019: "https://www.channel4.com/press/news/channel-4-2019-annual-report-year-transformation-growth-digital-viewing-and-revenues-and",
  all4Launch: "https://www.channel4.com/press/news/channel-4s-new-all-4-service-launches",
  all4Chromecast: "https://www.channel4.com/press/news/all-4-launching-google-chromecast-time-christmas",
};

export const PROFILE = {
  name: "Adeeb Hussain",
  title: "AI QA Engineering Lead",
  company: "Meta",
  location: "London",
  tagline: "Shipping future tech with quality at speed using AI",
  intro: (
    <>
      QA Engineering Lead with 10+ years of <strong>test automation</strong>, <strong>test strategy</strong> and{" "}
      <strong>quality engineering</strong> across web, mobile, smart TV, streaming and VR at <strong>Meta</strong>,{" "}
      <strong>Discovery+</strong>, <strong>Selfridges</strong> and <strong>Channel 4</strong>, shipping
      multi-million-pound products used by millions. I lead onshore and offshore QA teams, champion shift-left
      testing, and I'm moving QA from manual to <strong>AI-driven, agentic testing</strong> with LLM-powered tools
      like Claude Code.
    </>
  ),
};

// Reach of the products I've tested. Each figure links to its public source.
export type CompanyStat = { company: string; logo?: "meta" | "c4" | "discovery" | "selfridges"; value: string; label: string; source: string };

export const COMPANY_STATS: CompanyStat[] = [
  { company: "Meta", logo: "meta", value: "3.5B+", label: "daily active people across Meta's apps (Dec 2025)",
    source: "https://www.redlandscommunitynews.com/online_features/press_releases/meta-reports-fourth-quarter-and-full-year-2025-results/article_dcc1ae8b-b667-54d0-832d-86cdd8b43fca.html" },
  { company: "Discovery+", logo: "discovery", value: "22M", label: "streaming subscribers by end of 2021, mostly discovery+",
    source: "https://www.sec.gov/Archives/edgar/data/1437107/000143710722000026/a20211231-ex991pressrelease.htm" },
  { company: "Selfridges", logo: "selfridges", value: "8M+", label: "monthly visits to selfridges.com (Dec 2025)",
    source: "https://www.semrush.com/website/selfridges.com/overview/" },
  { company: "Channel 4", logo: "c4", value: "1.9B+", label: "streaming views in 2025",
    source: "https://www.channel4.com/corporate/performance/channel-4-annual-report-2024" },
];

export const APPROACH = [
  { title: "Discovery & requirements", text: "In from the discovery phase: design reviews, requirements analysis and acceptance criteria before code is written.", output: "testable acceptance criteria" },
  { title: "Test strategy & planning", text: "Strategies and plans that decide what's automated vs. manual, increasingly generated and maintained with AI.", output: "test strategy, plan, budget priorities" },
  { title: "Test design", text: "Test cases in TestRail and Zephyr kept current with every feature, with automation candidates identified.", output: "test cases, automation backlog" },
  { title: "Environments & devices", text: "iOS, Android, web, Apple TV, smart TVs, STBs, consoles, Apple Watch and VR, plus VPN setups for localisation.", output: "device matrix, builds" },
  { title: "Execution & automation", text: "Across the testing pyramid: unit, integration, API, exploratory, performance and UX, with agentic tests on daily schedules.", output: "automated suites, CI runs" },
  { title: "Defect triage", text: "Bugs triaged and prioritised with the team, with P0/P1s escalated to management quickly and clearly.", output: "prioritised bug backlog" },
  { title: "Regression & release", text: "Regression across devices and OS versions, and release management through Staging, UAT and Production to hard deadlines.", output: "sign-off, on-time launches" },
  { title: "Metrics & improvement", text: "QA OKRs and metrics driven with stakeholders, and QA Excellence initiatives across the org.", output: "OKRs, quality metrics" },
];

export const EXPERTISE = [
  {
    icon: "lead",
    title: "QA Leadership & Test Strategy",
    text: "QA Lead and Test Lead for teams of 20+ onshore and offshore: test strategy and planning, risk-based testing, release management and UAT, hiring and onboarding QA leads, and driving OKRs and quality metrics with stakeholders. A big believer in shift-left: bugs found earlier are cheaper to fix.",
    chips: ["QA leadership", "Test strategy", "Test planning", "Risk-based testing", "Shift-left", "Release management", "UAT", "Defect management", "Quality metrics & OKRs", "Stakeholder management", "Onshore / offshore teams", "Hiring & onboarding", "Agile / Scrum", "ISTQB"],
  },
  {
    icon: "ai",
    title: "AI Testing & Test Automation",
    text: "Moving QA from manual to agentic: AI agents built on Claude Code running scheduled daily test executions, LLM-assisted generation of test strategies, plans and cases, and Claude skills and plugins that scale testing across orgs. Hands-on with automation frameworks and CI/CD quality gates.",
    chips: ["AI-driven testing", "Agentic testing", "AI agents", "LLM-assisted test generation", "Generative AI", "Claude Code", "Claude skills & plugins", "OpenClaw", "Test automation", "Automation frameworks", "Playwright", "Selenium", "CodeceptJS", "pytest", "Page Object Model", "Python", "JavaScript", "CI/CD", "GitHub Actions", "Jenkins", "AWS", "Jira", "Zephyr", "TestRail"],
  },
  {
    icon: "platforms",
    title: "Multi-Platform & Non-Functional Quality",
    text: "End-to-end quality on every screen users touch, from VR/XR worlds and OTT streaming on smart TVs to mobile apps, e-commerce and web: functional, regression and exploratory testing plus API, performance, accessibility and analytics testing.",
    chips: ["VR / XR testing", "OTT & streaming", "Smart TVs & STBs", "Mobile testing (iOS, Android)", "Web & e-commerce", "Apple TV", "Consoles", "Chromecast", "Regression testing", "Exploratory testing", "API testing", "Postman", "Performance testing", "Lighthouse", "Sitespeed.io", "Accessibility (WCAG)", "Charles Proxy", "Wireshark", "Analytics testing"],
  },
];

export type Role = { title: string; company: string; meta?: boolean; logo?: "meta" | "c4" | "discovery" | "selfridges"; dates: string; points: React.ReactNode[] };

export const ROLES: Role[] = [
  {
    title: "AI Native QA Engineer", company: "Meta", meta: true, logo: "meta", dates: "Dec 2025 – present",
    points: [
      "Leading the Horizon Worlds QA team to become AI native, moving from manual testing to agentic testing.",
      <>QA Lead for <a href={LINKS.coldplay} {...ext}>Coldplay's <em>Music of the Spheres World Tour</em> immersive concert</a>, launching the new Arena in Meta Horizon (Dec 2025) with iHeartMedia. Included demos for Mark Zuckerberg; 20,000 attendees.</>,
      "Automating testing with Claude Code CLI on scheduled daily executions; using OpenClaw for daily testing tasks.",
      "Building AI infrastructure for test strategies, plans and cases, and Claude skills and plugins to scale testing across orgs.",
      "Using AI across the testing pyramid and adding non-functional and UX testing to QA workflows; driving OKRs for all QA leads.",
    ],
  },
  {
    title: "QA Engineering Lead", company: "Meta", meta: true, logo: "meta", dates: "Jan 2024 – Dec 2025",
    points: [
      "Led an onshore and offshore team of 20+ QAs maintaining the quality bar for Meta's virtual worlds.",
      "Led testing of Workplace, the enterprise version of Facebook with 10 million users across web and mobile.",
      "Drove QA Excellence initiatives; interviewed and onboarded new QA Leads and contingent workers; prioritised projects and budgets to minimise waste.",
    ],
  },
  {
    title: "Senior QA Engineer", company: "Selfridges.com", logo: "selfridges", dates: "Aug 2021 – Jan 2024",
    points: [
      "QA for Search & Browse, the site's most important function, from discovery to deployment.",
      "Tested features that brought in £millions in new revenue: ratings & reviews, size finder, product recommendations and sponsored advertising.",
      "CodeceptJS automation on a JavaScript codebase in AWS with CI/CD; monthly regression (Zephyr/Jira); API, performance and analytics testing.",
    ],
  },
  {
    title: "Senior QA Engineer", company: "Fiit", dates: "Jun 2021 – Aug 2021",
    points: [
      "Health-tech home-workout startup that grew exponentially during lockdown; cross-functional teams with JS, Android and iOS developers.",
      "Release management with Jenkins across Staging, UAT and Production; set up TestRail and migrated test cases from Confluence.",
    ],
  },
  {
    title: "QA Lead (Contract)", company: "Discovery+", logo: "discovery", dates: "May 2019 – May 2021",
    points: [
      <>Test Lead for the Discovery+ US app on Apple TV from inception to its <a href={LINKS.discoveryLaunch} {...ext}>launch on 4 January 2021</a>, Discovery's first US direct-to-consumer app, now with 12M+ users.</>,
      <>discovery+ went on to form part of Warner Bros. Discovery's streaming business: 96.1 million subscribers across HBO, HBO Max and discovery+ by the end of 2022 (<a href={LINKS.wbdSubs} {...ext}>Variety</a>).</>,
      "Managed multi-device regression, P0/P1 triage, API/CMS integration testing and VPN-based localisation testing for 100+ countries.",
    ],
  },
  {
    title: "Junior QA → QA Lead", company: "Channel 4", logo: "c4", dates: "Nov 2014 – May 2019",
    points: [
      "Promoted from junior QA to QA Lead over 5 years, leading a team of 6; built a testing framework that kept releases on time while daily views grew from 100,000 to 1,000,000.",
      <>Helped grow All 4 streaming views by 26% in 2018 to a record 915 million (<a href={LINKS.c4Results2018} {...ext}>2018 results</a>) and by 9% in 2019 to a record 995 million (<a href={LINKS.c4Report2019} {...ext}>2019 report</a>).</>,
      <>Projects: All 4 automation on smart TVs, STBs and consoles; <a href={LINKS.all4Chromecast} {...ext}>Google Chromecast</a>; the <a href={LINKS.all4Launch} {...ext}>All 4 launch and rebrand</a>.</>,
    ],
  },
  {
    title: "Junior Test Consultant", company: "Sparta Global", dates: "Sep 2014 – Nov 2014",
    points: ["Intensive testing academy: ISTQB (90%), Agile, Jira, Selenium and Python."],
  },
];

export const EDUCATION = [
  { title: "ISTQB Foundation Level Certified Tester", place: "Passed with 90%", dates: "2014" },
  { title: "MSc Mechanical Engineering with Business Management", place: "King's College London · Merit", dates: "2011 – 2013" },
  { title: "BEng Medical Engineering", place: "Queen Mary, University of London · 2:1 Hons", dates: "2008 – 2011" },
];

export type CaseStudy = { tag: string; meta?: boolean; stat: string; statLabel: string; title: string; problem: React.ReactNode; approach: React.ReactNode; result: React.ReactNode; link?: { href: string; label: string } };

export const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Meta · Live launch", meta: true, stat: "20,000", statLabel: "attendees",
    title: "Coldplay live in Meta Horizon",
    problem: <>Coldplay's <em>Music of the Spheres World Tour</em> immersive concert launched the new Arena in Meta Horizon on a fixed date (30 Dec 2025). High-profile and live: no second chance.</>,
    approach: "As QA Lead, owned quality for the experience end to end, including readiness for demos to Mark Zuckerberg.",
    result: "Delivered the concert to 20,000 attendees.",
    link: { href: LINKS.coldplay, label: "Read Meta's announcement" },
  },
  {
    tag: "Meta · AI native QA", meta: true, stat: "Agentic", statLabel: "daily test runs",
    title: "Taking a manual QA team agentic",
    problem: "Horizon Worlds testing relied heavily on manual effort that didn't scale.",
    approach: "Claude Code CLI for automated, scheduled daily test runs; AI-generated test strategies, plans and cases; Claude skills and plugins shared across orgs.",
    result: "The team is moving from manual to agentic testing, with tooling that scales beyond a single team.",
  },
  {
    tag: "Discovery+ · Launch", stat: "12M+", statLabel: "users",
    title: "Launching a streaming app on Apple TV",
    problem: "Discovery's first US direct-to-consumer app had to launch on every platform on the same day.",
    approach: "Acceptance criteria from day one, multi-device regression, strict P0/P1 triage, nightly CI builds and VPN-based localisation testing.",
    result: "Launched on time on 4 January 2021; now 12M+ users and rolling out to 100+ countries.",
    link: { href: LINKS.discoveryLaunch, label: "Read Discovery's launch announcement" },
  },
  {
    tag: "Selfridges · Revenue", stat: "£M", statLabel: "new revenue",
    title: "Quality for the site's money-maker",
    problem: "Search & Browse is the most important journey on Selfridges.com, and any bug costs sales.",
    approach: "Shift-left from discovery, CodeceptJS automation in CI/CD, API, performance and analytics testing.",
    result: "Shipped features that brought in £millions in new revenue: ratings & reviews, size finder, recommendations and sponsored ads.",
  },
  {
    tag: "Channel 4 · Scale", stat: "10×", statLabel: "daily views",
    title: "A framework that scaled 10×",
    problem: "Frequent All 4 releases across smart TVs, set-top boxes, consoles, Chromecast and mobile.",
    approach: "Built and applied a complete testing framework with automation on TV platforms, leading a team of 6.",
    result: <>On-time releases while daily views grew from 100k to 1M; All 4 views grew 26% in 2018 (<a href={LINKS.c4Results2018} {...ext}>results</a>) and 9% in 2019 (<a href={LINKS.c4Report2019} {...ext}>report</a>).</>,
  },
  {
    tag: "Channel 4 · Launch", stat: "4oD → All 4", statLabel: "rebrand",
    title: "Launching All 4, replacing 4oD",
    problem: "Channel 4 replaced 4oD with All 4, a full digital rebrand bringing live, catch-up and upcoming shows into one place.",
    approach: "QA on the All 4 rebrand across smart TVs, set-top boxes and consoles.",
    result: "All 4 launched on 30 March 2015.",
    link: { href: LINKS.all4Launch, label: "Read Channel 4's announcement" },
  },
  {
    tag: "Channel 4 · Google partnership", stat: "Cast", statLabel: "to TV",
    title: "All 4 on Chromecast for Christmas",
    problem: "With Google, bring All 4 to Chromecast so viewers could cast from phone or browser to TV before Christmas.",
    approach: "QA for the Chromecast implementation across iOS, Android and web.",
    result: "Casting went live from Android and Chrome on 24 November 2015, with iOS following in mid-December.",
    link: { href: LINKS.all4Chromecast, label: "Read Channel 4's announcement" },
  },
];

// "Career in 60 seconds": one slide per milestone, ~8 seconds each.
export type Highlight = { when: string; where: string; logo?: "meta" | "c4" | "discovery" | "selfridges"; headline: string; detail: string };

export const HIGHLIGHTS: Highlight[] = [
  { when: "2014", where: "Sparta Global", headline: "Started in software testing",
    detail: "Intensive testing academy; ISTQB Foundation passed with 90%." },
  { when: "2014 – 2019", where: "Channel 4", logo: "c4", headline: "Junior QA to QA Lead",
    detail: "Led a team of 6 while daily views grew from 100k to 1M, through the All 4 launch and Chromecast." },
  { when: "2019 – 2021", where: "Discovery+", logo: "discovery", headline: "Launched a streaming app from scratch",
    detail: "Test Lead for discovery+ on Apple TV, live on 4 January 2021; now 12M+ users." },
  { when: "2021 – 2024", where: "Selfridges", logo: "selfridges", headline: "Quality for the money-maker",
    detail: "Search & Browse features that brought in £millions in new revenue." },
  { when: "2024 – 2025", where: "Meta", logo: "meta", headline: "Leading 20+ QAs",
    detail: "Onshore and offshore teams; Workplace testing for 10 million users." },
  { when: "Dec 2025", where: "Meta Horizon", logo: "meta", headline: "Coldplay, live in VR",
    detail: "QA Lead for the immersive concert launching the Horizon Arena: 20,000 attendees, demos for Mark Zuckerberg." },
  { when: "Now", where: "Meta", logo: "meta", headline: "Taking QA agentic",
    detail: "Moving teams from manual to AI-driven testing with Claude Code, skills and plugins." },
];

export const SLIDE_SECONDS = 8;

export const CONTACT_EMAIL = "adeebhussain2@hotmail.com";
