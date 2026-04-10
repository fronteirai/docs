import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import versions from "./versions.json";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// First version in versions.json is the latest, rest are older versions
// If versions.json is empty, fall back to the "current" version label.
const latestVersion = versions[0] ?? "current";
// olderVersions may legitimately be empty (when there is only one or zero versions).
// This is safe: the subsequent .map calls will just operate on an empty array.
const olderVersions = versions.slice(1);

// Generate version config for older versions (latest is served at root)
// "unmaintained" banner shows a warning that this is an older version with link to latest
// noIndex prevents search engines from indexing older version pages (rendered via React Helmet)
const versionsConfig = Object.fromEntries(
  olderVersions.map((version) => [
    version,
    {
      label: version,
      banner: "unmaintained" as const,
      path: version,
      noIndex: true,
    },
  ]),
);

// Generate sitemap ignore patterns for older and unreleased versions
const sitemapIgnorePatterns = [
  ...olderVersions.map((version) => `/${version}/**`),
  "/next/**",
];

const config: Config = {
  title: "Fronteir AI Docs",
  tagline: "",
  favicon: "img/favicon.ico",
  url: "https://docs.fronteir.ai",
  // Root base URL: GitHub Pages serves this site at the hostname root on the
  // custom domain (docs.fronteir.ai), not under /docs/ like github.io/docs/.
  baseUrl: "/",
  trailingSlash: true,
  organizationName: "fronteirai",
  projectName: "docs",
  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    // Custom plugin to rewrite canonical URLs in versioned docs to point to latest
    "./plugins/canonical-urls.ts",
    // Custom plugin to inject JSON-LD structured data into built HTML pages
    "./plugins/structured-data.ts",
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/concepts/admin/mcp-server-catalogs",
            to: "/configuration/mcp-server-gitops",
          },
          {
            from: "/concepts/mcp-gateway/overview",
            to: "/concepts/mcp-gateway",
          },
          {
            from: "/installation/general",
            to: "/installation/overview",
          },
          {
            from: "/tutorials/knowledge-assistant",
            to: "/",
          },
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/fronteirai/docs",
          routeBasePath: "/", // Serve the docs at the site's root

          // Versioning configuration - dynamically generated from versions.json
          lastVersion: latestVersion,
          versions: {
            // The "current" version (served at /next/) is unreleased and should not be indexed
            current: {
              noIndex: true,
            },
            ...versionsConfig,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        blog: false,
        sitemap: {
          // Exclude older versioned and unreleased (/next/) docs from sitemap
          // Only the latest version should be indexed
          ignorePatterns: sitemapIgnorePatterns,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/fronteir-logo.svg?v=2",
    navbar: {
      logo: {
        alt: "Fronteir AI Logo",
        src: "img/fronteir-logo.svg?v=2",
        srcDark: "img/fronteir-logo.svg?v=2",
      },
      items: [
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownActiveClassDisabled: true,
        },
        {
          href: "https://fronteir.ai",
          label: "Homepage",
          position: "right",
        },
        {
          href: "https://connectors.fronteir.ai",
          label: "Platform",
          position: "right",
        },
        {
          href: "https://discord.gg/n8M9HWQT",
          label: "Discord",
          position: "right",
        }
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          label: "Homepage",
          to: "https://fronteir.ai",
        },
        {
          label: "Platform",
          to: "https://connectors.fronteir.ai",
        },
        {
          label: "Discord",
          to: "https://discord.gg/n8M9HWQT",
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fronteir AI, Inc`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
