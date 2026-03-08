import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Laptop } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetAllLaptops() {
  const { actor, isFetching } = useActor();
  return useQuery<Laptop[]>({
    queryKey: ["laptops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLaptops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLaptopsByBrand(brand: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Laptop[]>({
    queryKey: ["laptops", "brand", brand],
    queryFn: async () => {
      if (!actor) return [];
      if (brand === "All") {
        return actor.getAllLaptops();
      }
      return actor.getLaptopsByBrand(brand);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitContactForm(name, email, message);
    },
  });
}

export function useSeedLaptops() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["seed-laptops"],
    queryFn: async () => {
      if (!actor) return null;

      const existing = await actor.getAllLaptops();
      if (existing.length === 0) {
        const laptops = [
          {
            name: "Apple MacBook Pro M3",
            brand: "Apple",
            price: BigInt(129999),
            specs:
              "M3 Pro chip, 16GB RAM, 512GB SSD, 14-inch Liquid Retina XDR",
            category: "Professional",
          },
          {
            name: "Dell XPS 15",
            brand: "Dell",
            price: BigInt(115999),
            specs: "Intel Core i9, 32GB RAM, 1TB SSD, 15.6-inch OLED touch",
            category: "Professional",
          },
          {
            name: "HP Spectre x360",
            brand: "HP",
            price: BigInt(108999),
            specs: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch OLED 2-in-1",
            category: "Ultrabook",
          },
          {
            name: "Asus ROG Strix G16",
            brand: "Asus",
            price: BigInt(119999),
            specs: "AMD Ryzen 9, 32GB RAM, 1TB SSD, RTX 4070, 16-inch 165Hz",
            category: "Gaming",
          },
          {
            name: "Samsung Galaxy Book3",
            brand: "Samsung",
            price: BigInt(89999),
            specs: "Intel Core i7, 16GB RAM, 512GB SSD, 15.6-inch AMOLED",
            category: "Ultrabook",
          },
          {
            name: "Lenovo ThinkPad X1 Carbon",
            brand: "Lenovo",
            price: BigInt(95999),
            specs: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch IPS, LTE ready",
            category: "Business",
          },
        ];

        await Promise.all(
          laptops.map((l) =>
            actor.addLaptop(l.name, l.brand, l.price, l.specs, l.category),
          ),
        );

        await queryClient.invalidateQueries({ queryKey: ["laptops"] });
      }
      return true;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
