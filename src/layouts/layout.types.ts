export enum AppLayoutsEnum {
  default = "default",
  empty = "empty",
  error = "error",
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: "default.vue",
  empty: "empty.vue",
  error: "error.vue",
};
