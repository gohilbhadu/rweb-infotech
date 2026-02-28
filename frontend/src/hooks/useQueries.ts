import { useQuery, useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Brand, LaptopModel, LaptopVariant, ChatMessage } from '../backend';

export function useGetAllBrands() {
  const { actor, isFetching } = useActor();

  return useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllBrands();
      return result || [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// Alias for backwards compatibility
export const useBrands = useGetAllBrands;

export function useGetBrandByName(brandName: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Brand | null>({
    queryKey: ['brand', brandName],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBrandByName(brandName);
    },
    enabled: !!actor && !isFetching && !!brandName,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllModels(brandName: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LaptopModel[]>({
    queryKey: ['models', brandName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllModels(brandName);
    },
    enabled: !!actor && !isFetching && !!brandName,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetModelByName(brandName: string, modelName: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LaptopModel | null>({
    queryKey: ['model', brandName, modelName],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getModelByName(brandName, modelName);
      return result || null;
    },
    enabled: !!actor && !isFetching && !!brandName && !!modelName,
    staleTime: 5 * 60 * 1000,
  });
}

// Alias for backwards compatibility
export const useModelDetail = useGetModelByName;

export function useGetAllVariants(brandName: string, modelName: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LaptopVariant[]>({
    queryKey: ['variants', brandName, modelName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVariants(brandName, modelName);
    },
    enabled: !!actor && !isFetching && !!brandName && !!modelName,
    staleTime: 5 * 60 * 1000,
  });
}

export function useChatWithAssistant() {
  const { actor } = useActor();

  return useMutation<ChatMessage, Error, string>({
    mutationFn: async (userMessage: string) => {
      if (!actor) throw new Error('Backend actor not initialized');
      const response = await actor.converseWithAssistant(userMessage);
      return response;
    },
  });
}
