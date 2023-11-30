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
  "center left": "top-1/2 left-[1%] transform -translate-y-1/2",
  "center right":
    "top-1/2 right-[1%] transform translate-x-1/2 -translate-y-1/2",
  "top center": "top-[1%] left-1/2 transform -translate-x-1/2",
  "top left": "top-[1%] left-[1%]",
  "top right": "top-[1%] right-[1%]",
  "bottom center": "bottom-[1%] left-1/2 transform -translate-x-1/2",
  "bottom left": "bottom-[1%] left-[1%]",
  "bottom right": "bottom-[1%] right-[1%]",
};
