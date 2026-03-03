import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishList";
import { Product } from "@/types/indexT";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

interface ProductsGridProps {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
}

const ProductsGrid = ({ products, isLoading, isError }: ProductsGridProps) => {
  const { isInWishlist, toggleWishlist, isAddingToWishlist, isRemovingFromWishlist } =
    useWishlist();

  const {isAddingToCart, addingToCart} = useCart()


  const handleAddToCart = (productId: string, productName: string) => {
    addingToCart(
      {productId, quantity: 1},
      {
      onSuccess:()=>{
        Alert.alert("success", `${productName} is added`)
      },
     onError:(error: any)=>{
        Alert.alert("Error", error?.responce?.data?.error || "failed to add the product")
      }
    }
    )
  };

  const renderProduct = ({ item: product }: { item: Product }) =>(
    <TouchableOpacity
      className="bg-surface rounded-3xl overflow-hidden mb-3"
      style={{ width: "48%" }}
      activeOpacity={0.8}
      // onPress={() => router.push(`/product/${product._id}`)}
    >
      <View className="relative">
        <Image
        className="w-full bg-background-lighter h-44  "
        source={{uri: product.images[0]}}
        resizeMode="cover"
        />
        <TouchableOpacity
        className="absolute top-3 right-3 bg-black/30 backdrop-blur-xl p-2 rounded-full"
        activeOpacity={0.7}
        onPress={()=> toggleWishlist(product._id)}
        disabled = {isAddingToWishlist || isRemovingFromWishlist}
        >
          {isAddingToWishlist || isRemovingFromWishlist ?(
            <ActivityIndicator size="small" color="#FFFFFF" />
          ):(
            <Ionicons
            name={isInWishlist(product._id) ? "heart" : "heart-outline"}
            size={18}
            color={isInWishlist(product._id) ? "#FF6B6B" : "#FFFFFF"}
            />
          )
          }
        </TouchableOpacity>

      </View>
      <View className="p-3">
        <Text className="text-text-secondary text-xs mb-1">{product.category}</Text>
        <Text className="text-text-primary font-bold text-sm mb-2">{product.name}</Text>

      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons name="star" size={12} color={"#FFC107"}/>
        <Text className="text-text-primary font-semibold text-xs ml-1">{product.averageRating.toFixed(1)}</Text>
        <Text className="text-text-secondary text-xs ml-1">{product.totalReviews}</Text>

      </View>
      <View className="flex-row items-center justify-center">
        <Text className="text-primary font-bold text-lg">{product.price.toFixed(2)}</Text>
        <TouchableOpacity 
        className="bg-primary rounded-2xl w-8 h-8 items-center justify-center"
        activeOpacity={0.7}
        onPress={()=> handleAddToCart(product._id, product.name)}
        disabled={isAddingToCart}
        >
         {isAddingToCart? (
           <ActivityIndicator size="small" color="#121212" />
         ):(
          <Ionicons name="add" size={18} color={"#121212"}/>
         )
        } 
        </TouchableOpacity>

      </View>     

    </TouchableOpacity>
  )
  
    if (isLoading) {
    return (
      <View className="py-20 items-center justify-center">
        <ActivityIndicator size="large" color="#00D9FF" />
        <Text className="text-text-secondary mt-4">Loading products...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="py-20 items-center justify-center">
        <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
        <Text className="text-text-primary font-semibold mt-4">Failed to load products</Text>
        <Text className="text-text-secondary text-sm mt-2">Please try again later</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      ListEmptyComponent={NoProductsFound}
    />
  );
}

export default ProductsGrid;

function NoProductsFound() {
  return (
    <View className="py-20 items-center justify-center">
      <Ionicons name="search-outline" size={48} color={"#666"}/>
      <Text className="text-text-primary font-semibold mt-4">no Products found</Text>
      <Text className="text-text-secondary text-sm  mt-2">please try again</Text>

    </View>
  );
}