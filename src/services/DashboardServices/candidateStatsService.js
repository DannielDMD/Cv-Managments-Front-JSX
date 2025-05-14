import { axiosInstance } from "../../utils/api";

export const getGeneralStats = async (anio = null) => {
  try {
    const params = {};
    if (anio) params.anio = anio;

    const response = await axiosInstance.get("/dashboard/stats/general", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching general stats:", error);
    return null;
  }
};

