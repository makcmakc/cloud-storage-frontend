import axios from "@/core/axios";

// type FileType = "all" | "photos" | "trash";

export const getAll = async (type) => {
  return (await axios.get("/files?type=" + type)).data
}

export const remove = ids => {
  return axios.delete("/files?ids=" + ids)
}

export const uploadFile = async (options) => {
  const file = options;
  if (file) {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  try {
    const { data } = await axios.post("files", formData, config);

    return data;
  } catch (err) {
    console.log(err)
  }
}
};