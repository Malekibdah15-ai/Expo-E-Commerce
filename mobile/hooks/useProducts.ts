import { APIFUNC } from '@/lip/api'
import { useQuery } from "@tanstack/react-query";
import { Product } from '@/types/indexT';

const useProducts = () => {
    const api = APIFUNC()  

    const result = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
           const { data } = await api.get<Product[]>("/products")
           console.log("products response:", data)
           return data
        }
    })
    return result
}

export default useProducts