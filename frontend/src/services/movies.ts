import { createMovies, deleteMovies, getMovie, getMovies, updateMovies } from "@/api/movies"
import type { Movie, Movies } from "@/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";

export const fetchMovies = async (page = 1): Promise<Movies> => {
    const res = await getMovies({ page });
    return res.data;
}

export const fetchMovie = async (id): Promise<Movie> => {
    const res = await getMovie(id);
    return res.data;
}

export const createMovie = async (data): Promise<Movie> => {
    const res = await createMovies(data);
    return res.data;
}

export const updateMovie = async (id, data): Promise<Movie> => {
    const res = await updateMovies(id, data);
    return res.data;
}

export const deleteMovie = async (id): Promise<void> => {
    const res = await deleteMovies(id);
    return res.data;
}


export const useMovies = (page: Ref<number>) => {
  return useQuery({
    queryKey: computed(() => ["movies", page.value]),
    queryFn: () => fetchMovies(page.value),
  })
}

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    enabled: !!id,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Movie }) =>
      updateMovie(id, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", variables.id] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};