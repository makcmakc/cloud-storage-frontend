import { ElMessage } from "element-plus";

export const handleError = (error) => {
  ElMessage({
    message: error.message,
    type: "error",
    showClose: false,
    center: true,
    duration: 2000
  });
}
