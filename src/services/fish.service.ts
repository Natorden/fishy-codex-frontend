import type { Fish } from "@/models/Fish";
import http from "./http.client";

export class FishService {
  async createFish(
    catchName: string,
    species: string,
    length: number,
    weight: number,
    userUuid: string
  ): Promise<Fish> {
    console.log(catchName, species, length, weight, userUuid);
    const result = await http.post<Fish>("/fishy/", {
      catchName: catchName,
      species: species,
      length: length,
      weight: weight,
      userUuid: userUuid,
    });
    console.log(result.data);
    return result.data;
  }

  async updateFish(
    id: string,
    catchName: string,
    species: string,
    length: number,
    weight: number
  ): Promise<Fish> {
    const result = await http.patch<Fish>("/fishy/" + id, {
      catchName: catchName,
      species: species,
      length: length,
      weight: weight,
    });
    return result.data;
  }

  async removeFish(id: string): Promise<Fish> {
    const result = await http.delete<Fish>("/fishy/" + id);
    return result.data;
  }

  async getAllFish(): Promise<Fish[]> {
    const result = await http.get<Fish[]>("/fishy/");
    return result.data;
  }

  async getFishById(id: string): Promise<Fish> {
    const result = await http.get<Fish>("/fishy/" + id);
    return result.data;
  }
}
