/**
 * @typedef {"body" | "heading" | "text-5xl" | "text-4xl" | "text-3xl" | "text-2xl" | "text-xl" | "text-sm" | "text-xs" | "text-xxs"} Tvariant
 */

/** @type {Record<Tvariant, string>} */
export const tagMap = {
    body: "p",
    heading: "h1",
    "text-5xl": "h2",
    "text-4xl": "h3",
    "text-3xl": "h4",
    "text-2xl": "h5",
    "text-xl": "h6",
    "text-sm": "p",
    "text-xs": "span",
    "text-xxs": "span",
};
