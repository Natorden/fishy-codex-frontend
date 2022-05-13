import { defineStore } from "pinia";
import type { Fish } from "@/models/Fish";
import { FishService } from "@/services/fish.service";
import type { User } from "@/models/User";

const fishService: FishService = new FishService();

export const FishStore = defineStore({
  id: "fishStore",
  state: () => ({
    fishy: [] as Fish[],
  }),
  getters: {
    fishy: (state) => {
      if (state.fishy != undefined) return state.fishy;
      else return [] as Fish[];
    },
  },
  actions: {
    createFish(
      catchName: string,
      species: string,
      length: number,
      weight: number,
      userUuid: string
    ) {
      fishService
        .createFish(catchName, species, length, weight, userUuid)
        .catch((err) => console.log(err.message));
    },
    updateFish(
      id: string,
      catchName: string,
      species: string,
      length: number,
      weight: number
    ) {
      fishService
        .updateFish(id, catchName, species, length, weight)
        .catch((err) => console.log(err.message));
    },
    removeFish(id: string) {
      fishService.removeFish(id).catch((err) => console.log(err.message));
    },
    getAllFish() {
      fishService
        .getAllFish()
        .then((fishy) => {
          this.fishy.forEach((fish, index) => {
            delete this.fishy[index];
          });

          fishy.forEach((fish) => {
            this.fishy.push(fish);
          });
        })
        .catch((err) => console.log(err.message));
    },
  },
});
