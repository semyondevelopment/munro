/**
 * Central image manifest — the centre's own photography (in /public/images).
 * Keyed by photo identity; content.ts maps these to the slots that use them.
 * Swap a file here and it updates everywhere it's referenced.
 */

export type SiteImage = {
  src: string;
  alt: string;
};

export type ImageKey =
  | "child_nora"
  | "child_ruby"
  | "child_vinh"
  | "child_johnathan"
  | "children_writing"
  | "foyer_display"
  | "team"
  | "educators_wall"
  | "community_incursion"
  | "multicultural_storytelling"
  | "first_nations"
  | "reconciliation";

export const images: Record<ImageKey, SiteImage> = {
  child_nora: {
    src: "/images/child-nora.jpg",
    alt: "A child exploring the garden in the nature play space at The Munro Centre, St Lucia",
  },
  child_ruby: {
    src: "/images/child-ruby.jpg",
    alt: "A smiling toddler playing in a tunnel in the centre's outdoor play area",
  },
  child_vinh: {
    src: "/images/child-vinh.jpg",
    alt: "A child riding a tricycle outdoors at our St Lucia early learning centre",
  },
  child_johnathan: {
    src: "/images/child-johnathan.jpg",
    alt: "A child absorbed in a hands-on learning experience indoors",
  },
  children_writing: {
    src: "/images/children-writing.jpg",
    alt: "Two kindergarten children practising early writing, surrounded by multicultural picture books",
  },
  foyer_display: {
    src: "/images/foyer-art-display.jpg",
    alt: "Children's self-portraits and process art on display in the centre foyer",
  },
  team: {
    src: "/images/team.jpg",
    alt: "The Munro Centre's qualified, multicultural team of early childhood educators",
  },
  educators_wall: {
    src: "/images/educators-wall.jpg",
    alt: "Portraits of The Munro Centre's educators and centre supervisors",
  },
  community_incursion: {
    src: "/images/community-incursion.jpg",
    alt: "Children meeting local police officers during a community visit at the centre",
  },
  multicultural_storytelling: {
    src: "/images/multicultural-storytelling.jpg",
    alt: "A multicultural storytelling and music incursion celebrating language and culture",
  },
  first_nations: {
    src: "/images/first-nations-program.jpg",
    alt: "Educators embedding Aboriginal and Torres Strait Islander perspectives into practice",
  },
  reconciliation: {
    src: "/images/reconciliation-display.jpg",
    alt: "Children's reconciliation artwork and Aboriginal flag display in the centre",
  },
};

export const img = (key: ImageKey): SiteImage => images[key];
