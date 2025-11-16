# Project Blueprint

## Overview

This document outlines the project structure, design, and features of the Next.js application.

## Current State

### Implemented Features:

*   **Blog Post System:**
    *   Dynamic routing for blog posts using `[slug]`.
    *   Markdown support for post content.
    *   Data fetching for individual posts.
    *   Display of post content with a dedicated layout.

### Design and Styling:

*   **Global Styles:** `app/globals.css` for sitewide styles.
*   **Component-Specific Styles:** CSS modules for component-level styling.
*   **Static Assets:** Images and other static files are served from the `public` directory.

## Plan for Current Request

### Goal: Fix alias import errors.

### Steps:

1.  **Update `app/posts/[slug]/page.jsx`:** Correct the import paths to use the correct alias.
2.  **Update `jsconfig.json`:** Create and configure `jsconfig.json` to define the path aliases for JavaScript files.
