export const placements = [
  "center",
  "center left",
  "center right",
  "top center",
  "top left",
  "top right",
  "bottom center",
  "bottom left",
  "bottom right",
] as const;

export const placementsStyles = {
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  "center left": "top-1/2 left-0 transform -translate-y-1/2",
  "center right": "top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2",
  "top center": "top-0 left-1/2 transform -translate-x-1/2",
  "top left": "top-0 left-0",
  "top right": "top-0 right-0",
  "bottom center": "bottom-0 left-1/2 transform -translate-x-1/2",
  "bottom left": "bottom-0 left-0",
  "bottom right": "bottom-0 right-0",
};
