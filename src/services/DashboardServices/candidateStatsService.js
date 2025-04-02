import { axiosInstance } from "../../utils/api";

export const getGeneralStats = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/stats/general");
    return response.data;
  } catch (error) {
    console.error("Error fetching general stats:", error);
    return null;
  }
};
