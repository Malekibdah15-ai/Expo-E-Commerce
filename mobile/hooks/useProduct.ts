import { useQuery } from "@tanstack/react-query";
import { APIFUNC } from "@/lip/api";
import { Product } from "@/types/indexT";

const useProduct = (productId: string)=>{
    const api = APIFUNC()

    const result = useQuery<Product>({
        queryKey: ["Product", productId],
        queryFn: async () =>{
            const {data} = await api.get(`/product/${productId}`)
            return data
        },
        enabled: !!productId
    })
    return result
}
export default useProduct