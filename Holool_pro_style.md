# UI Design Guide

## Visual Style

Create a clean, professional dashboard interface with:

* Light neutral page backgrounds
* White cards and panels
* A dark navigation sidebar
* Blue as the primary action color
* Soft pastel colors for statuses and alerts
* Subtle borders and shadows
* Moderate corner rounding

## Core Colors

```css
--text: #172033;
--muted-text: #69758c;
--background: #f4f7fb;
--surface: #ffffff;
--border: #dfe5ef;

--primary: #2457c5;
--primary-hover: #173f9d;
--sidebar: #0e1a2c;

--success: #16825d;
--warning: #d88717;
--danger: #c2414d;
```

Use lighter versions of these colors for badge and status backgrounds.

## Typography

Use a modern sans-serif font such as:

```css
font-family: Inter, system-ui, "Segoe UI", sans-serif;
```

Recommended hierarchy:

* Page title: `24–28px`
* Section title: `16–20px`
* Body and form text: `12–14px`
* Labels and metadata: `9–11px`

Use bold text for actions, totals, headings, and important values.

## Components

### Buttons

* Primary buttons use the main blue color.
* Secondary buttons use a light gray background.
* Danger buttons use red.
* Use approximately `8–10px` corner rounding.
* Add a subtle hover transition.

### Forms

* White inputs with light gray borders.
* Use a visible blue focus border and soft focus ring.
* Keep labels small, clear, and slightly bold.
* Readonly fields should use a light gray-blue background.

### Cards and Panels

* White background
* Light border
* `10–14px` corner radius
* Subtle shadow
* Approximately `16–22px` internal padding

### Tables

* Compact rows
* Small uppercase column headers
* Light row separators
* Right-align numeric values
* Allow horizontal scrolling on smaller screens

### Status Indicators

Use colored text with a pale matching background:

* Green: success, available, completed
* Blue: active, reserved, informational
* Yellow or orange: warning, pending
* Red: error, damaged, unavailable
* Gray: inactive, neutral, archived

## Layout

* Use CSS Grid for forms, dashboards, and metric cards.
* Use Flexbox for toolbars, actions, and navigation.
* Keep spacing consistent, generally between `8px` and `20px`.
* Use a fixed or sticky sidebar on desktop.
* Stack layouts vertically on mobile.

## Responsive Behavior

Recommended breakpoints:

```css
@media (max-width: 1150px) {
  /* Reduce multi-column layouts */
}

@media (max-width: 820px) {
  /* Switch to single-column mobile layout */
}
```

On smaller screens:

* Stack forms and cards
* Convert the sidebar into a horizontal or compact navigation area
* Stack action buttons
* Preserve table scrolling
* Reduce page padding

## General Rule

Prefer reusable design tokens and shared component classes instead of adding new colors, shadows, spacing values, or border radii for every component.
