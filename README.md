# DJS02 – Web Component: Podcast Preview

## Overview

In this project, you will build a reusable and encapsulated **custom HTML element** that displays a podcast preview. The component must follow the **Web Component standard**, using `customElements.define()` and should work independently from the main application logic. This component will enhance modularity, promote reuse, and reduce code duplication across the app.

The component should be designed to **accept podcast data via attributes or properties**, display relevant UI elements (such as title, cover image, and genres), and **communicate with the main application** through custom events.

---

## Core Objectives

### Web Component Functionality

- Create a **custom HTML element** using `customElements.define()`.
- Accept data (cover image, title, genres, number of seasons, and last updated date) **as attributes or properties**.
- Keep the component **stateless** and reliant on external data provided by the parent.
- Use **Shadow DOM** for style and logic encapsulation to avoid global conflicts.
- Trigger a **custom event** when a user interacts with the component (e.g., clicking), so that the parent application can open a modal or take other actions without tightly coupling to the component’s logic.

---

## UI/UX Requirements

- The component should render a clean and **visually consistent preview** of each podcast.
- Display:
  - Podcast **cover image**
  - Podcast **title**
  - **Genre names**
  - **Number of seasons**
  - **Last updated** in a human-readable format
- The component must be **responsive**, and match the overall app design on desktop and mobile.
- On click, the component must notify the parent app to **open a modal** or navigate to details.

---

## Code Quality & Maintainability

- Write clear, consistent, and modular code.
- Follow **functional and object-oriented programming** patterns.
- Document major functions using **JSDoc comments** (parameters, return types, etc.).
- Use consistent **code formatting** across HTML, CSS, and JavaScript.

---

## Technical Constraints

- Do **not** use any third-party frameworks for creating the web component.
- Use **native JavaScript (ES6+)**, HTML, and CSS.
- No page reloads or navigation.
- Ensure compatibility with modern browsers.

---

## Deliverables

- A working custom Web Component file (e.g., `PodcastPreview.js`).
- An HTML demo page showcasing the component usage.
- A `README.md` file with:
  - How to use and register the component
  - Instructions for passing data
  - How to listen for interaction events

---

## PodcastPreview Web Component Documentation

### 1. How to use and register the component

To use the `<podcast-preview>` component, simply include the script tag in your HTML file:

```html
<script src="components/PodcastPreview.js"></script>
```

This will automatically register the custom element with the browser using `customElements.define('podcast-preview', PodcastPreview)`.

You can then use the component anywhere in your HTML:

```html
<podcast-preview></podcast-preview>
```

### 2. Instructions for passing data

You can pass data to the component dynamically using JavaScript by setting its properties. The component accepts the following properties:

- `image`: URL string to the podcast cover image.
- `title`: String representing the podcast title.
- `genres`: String representing the genre names (e.g., "History, Comedy").
- `seasons`: Number or string representing the number of seasons.
- `updated`: Date string representing when the podcast was last updated.
- `podcastId`: String representing the unique ID of the podcast.

**Example usage in JavaScript:**
```javascript
const preview = document.createElement('podcast-preview');
preview.image = 'https://example.com/cover.jpg';
preview.title = 'My Awesome Podcast';
preview.genres = 'Personal Growth, History';
preview.seasons = 4;
preview.updated = '2022-11-03T07:00:00.000Z';
preview.podcastId = '12345';

document.body.appendChild(preview);
```

### 3. How to listen for interaction events

When a user interacts with the component (by clicking it, or pressing Enter/Space while focused), it dispatches a custom event named `preview-click`. This event bubbles up, so you can listen for it on the document or a parent container.

The event's `detail` object contains the `id` and `title` of the podcast.

**Example event listener:**
```javascript
document.addEventListener('preview-click', (event) => {
    const podcastId = event.detail.id;
    const podcastTitle = event.detail.title;
    
    console.log(`User clicked on: ${podcastTitle} (ID: ${podcastId})`);
    
    // Open a modal or navigate to a details page here
});
```
