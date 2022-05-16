import { defineStore } from "pinia";
import type { Fish } from "@/models/Fish";
import { FishService } from "@/services/fish.service";
import { useStorage } from "@vueuse/core";
import router from "@/router";

const fishService: FishService = new FishService();

export const FishStore = defineStore({
  id: "fishStore",
  state: () => ({
    fishy: useStorage("fishy", [] as Fish[]),
    singleFish: {} as Fish,
  }),
  getters: {
    getAllFishes: (state) => {
      if (state.fishy != undefined) return state.fishy;
      else return [] as Fish[];
    },
    getFish: (state) => {
      if (state.singleFish != undefined) return state.singleFish;
      else return undefined;
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
    async updateFish(
      id: string,
      catchName: string,
      species: string,
      length: number,
      weight: number
    ): Promise<any> {
      return await fishService
        .updateFish(id, catchName, species, length, weight)
        .catch((err) => console.log(err.message));
    },
    async removeFish(id: string): Promise<any> {
      return await fishService
        .removeFish(id)
        .catch((err) => console.log(err.message));
    },
    getSingleFish(fish: Fish) {
      this.singleFish = fish;
    },
    getAllFish() {
      fishService
        .getAllFish()
        .then((fishes) => {
          console.log(fishes);
          this.fishy = [];

          fishes.forEach((fish) => {
            this.fishy.push(fish);
          });
        })
        .catch((err) => console.log(err.message));
    },
  },
});
