import { useBuscarTodosCentros } from "@/_services/api/service/center/center";

export function useGetAllCenter() {
  const { data: getAllCenters, isLoading } = useBuscarTodosCentros({
    query: {
      queryKey: ['centers'],
    },
  });

  return { getAllCenters, isLoading };
}