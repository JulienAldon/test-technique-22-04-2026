import { createReviews, deleteReviews, getReview, getReviews, updateReviews } from "@/api/reviews"
import { Review } from "@/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const fetchReviews = async () => {
    const res = await getReviews();
    return res.data;
}

export const fetchReview = async (id) => {
    const res = await getReview(id);
    return res.data;
}

export const createReview = async (data) => {
    const res = await createReviews(data);
    return res.data;
}

export const updateReview = async (id, data) => {
    const res = await updateReviews(id, data);
    return res.data;
}

export const deleteReview = async (id) => {
    const res = await deleteReviews(id);
    return res.data;
}


export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });
};

export const useReview = (id: number) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchReview(id),
    enabled: !!id,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Review }) =>
      updateReview(id, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["review", variables.id] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};