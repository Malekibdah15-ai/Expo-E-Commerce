import { useMutation ,useQuery, useQueryClient } from "@tanstack/react-query";
import { APIFUNC } from "@/lip/api";
import { Cart } from "@/types/indexT";
import React from 'react'



const useCart = () => {
  const api = APIFUNC()  
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: async({productId, quantity = 1} : {productId: String, quantity?: Number})=>
    {
        const {data} = await api.post<{cart: Cart}>("/cart",{productId, quantity})
        return data.cart
    },
    onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["cart"]})

  })
  return{
    addingToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending
}
}

export default useCart