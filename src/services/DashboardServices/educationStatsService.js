import { axiosInstance } from "../../utils/api"; // ✅ Import correcto

export const getEducationStats = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/stats/educacion");
    return response.data;
  } catch (error) {
    console.error("Error fetching education stats:", error);
    return [];
  }
};
