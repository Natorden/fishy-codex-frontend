// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import http from "http";
import type { Fish } from "@/models/Fish";

export class FishService {
  async createFish(
    catchName: string,
    species: string,
    length: number,
    weight: number
  ): Promise<Fish> {
    const result = await http.post<Fish>("/fish", {
      catchName: catchName,
      species: species,
      length: length,
      weight: weight,
    });
    return result.data;
  }

  async getAllFish(): Promise<Fish[]> {
    const result = await http.get<Fish[]>("/fish");
    return result.data;
  }

  async getFishById(id: string): Promise<Fish> {
    const result = await http.get<Fish>("/fish/" + id);
    return result.data;
  }
}
