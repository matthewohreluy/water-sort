import { ITube } from "../components/tube/tube.interface";

export const DEFAULT_NOOFTUBES: number = 15;
export const DEFAULT_NOOFEMPTYTUBES: number = 1;
export const DEFAULT_SWAPS: number = 100;
export const DEFAULT_COLORS: string[] =[
  "transparent",
  "#FF073A", // 🔴 Neon Red
  "#BAE1FF", // 🔵 Pastel Blue
  "#70E000", // 🟢 Electric Green
  "#FFDFBA", // 🟠 Pastel Orange
  "#A200FF", // 🟣 Neon Purple

  "#F3FF00", // 🟡 Neon Yellow
  "#6A0572", // 🟣 Deep Purple
  "#00FF66", // 🟢 Neon Green
  "#9D0208", // 🔴 Dark Red
  "#BAFFC9", // 🟢 Pastel Green

  "#E85D04", // 🟠 Burnt Orange
  "#0096C7", // 🔵 Bright Cyan
  "#FFB3BA", // 🌸 Pastel Pink
  "#6F1D1B", // 🟥 Rich Maroon
  "#00E5FF", // 🔵 Neon Cyan

  "#FFFFBA", // 🟡 Pastel Yellow
  "#D00000", // 🔴 Bold Crimson
  "#F77F00", // 🟠 Vivid Orange
  "#023E8A", // 🔵 Deep Blue
  "#FF5E00"  // 🟠 Bright Tangerine
];


export enum COLOR_CONTENT {
  COLOR0 = 0,
}

export const DEFAULT_TUBE: ITube = {
  id: 0,
  contents: [COLOR_CONTENT.COLOR0,COLOR_CONTENT.COLOR0,COLOR_CONTENT.COLOR0,COLOR_CONTENT.COLOR0],
  isActive: false
}
