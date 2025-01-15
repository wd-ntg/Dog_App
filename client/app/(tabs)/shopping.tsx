import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";

import { Carousel } from "react-native-ui-lib";

import images from "@/constants/images";
import CardImage from "@/common/components/CardImage";

import CardShopping from "@/common/components/CardShopping";

import apiProduct from "@/axios/shopping";
import { useRouter } from "expo-router";

const width = Dimensions.get("window").width;

const Shopping = () => {
  const router = useRouter();

  const [bestSeller, setBestSeller] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);


  const handleFetchData = async () => {
    try {
      const responseBestSeller = await apiProduct.getProducts({ best_seller: true });
      const responseProductByCategory = await apiProduct.fetchProductsByCategory();

      if (responseBestSeller.success == true) {
        setBestSeller(responseBestSeller?.data?.products);
      } else {
        console.log("Error fetching category dogs from api");
      }

      if (responseProductByCategory.success == true) {
        setProductByCategory(responseProductByCategory?.data);

      } else {
        console.log("Error fetching category dogs from api");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const data = [
    { id: 1, image: images.card_explore1 },
    { id: 2, image: images.card_explore2 },
    { id: 3, image: images.card_explore3 },

  ];

  const card_shopping = [
    {
      id: 1,
      image: images.card_explore4,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 2,
      image: images.card_explore5,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
    {
      id: 3,
      image: images.card_explore2,
      title: "Quả bóng vui vẻ",
      quantity: "100.000 VND",
      sell_quantity: "10",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-6">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.UserCircleIcon size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.ShoppingCartIcon size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View className="w-full flex justify-center items-center mt-4">
          <Carousel
            containerStyle={styles.carousel}
            initialPage={0} // Slide đầu tiên
            pageControlPosition="under" // Vị trí của PageControl
            pageControlProps={{
              size: 10,
              color: "gray",
              inactiveColor: "#ccc",
            }}
            allowAccessibleLayout
            onChangePage={(index: number) =>
              console.log(`Current page: ${index}`)
            }
          >
            {data.map((item) => (
              <View key={item.id} style={styles.slide}>
                <Image source={item.image} style={styles.image} />
              </View>
            ))}
          </Carousel>
        </View>
        <ScrollView style={{ height: 455 }}>
          <View className="mt-6">
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold px-4">Best Seller</Text>
            </View>
            <View className="" style={styles.imageGrid}>
              {bestSeller && bestSeller.map((item) => (
                <CardShopping
                  key={item._id}
                  image={item.images[0]}
                  title={item.name}
                  money={item.price}
                  sell_quantity={item.stockCount}
                  urlParams={item._id}
                />
              ))}
            </View>
          </View>
          {productByCategory && productByCategory.length > 0 && productByCategory.map((item, index) => (

            <View className="mt-6" key={index}>
              <View className="flex-row justify-between">
                <Text className="text-lg font-semibold px-4">
                  {
                    (() => {
                      switch (item.category) {
                        case "toys":
                          return "Đồ chơi";
                        case "accessories":
                          return "Phụ kiện";
                        case "food":
                          return "Thức ăn";
                        case "grooming":
                          return "Chăm sóc";
                        case "health":
                          return "Sức khỏe";
                        default:
                          return item.category;
                      }
                    })()
                  }
                </Text>
                <TouchableOpacity onPress={() => router.push(`/listProduct/${item.category}`)}>
                  <View className="flex-row items-center">
                    <Text className="text-lg  font-semibold ">Tất cả </Text>
                    <Icon.ChevronRightIcon
                      className=""
                      size={20}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ width: "100%", height: 120, marginTop: 10 }}
              >
                {item.products.map((product) => (
                  <CardImage
                    urlParams={product._id}
                    key={product._id}
                    image={product.images[0]}
                    width={120}
                    height={120}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
          {/* <View className="mt-4">
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold mx-4">Thực phẩm</Text>
              <TouchableOpacity>
                <View className="flex-row items-center">
                  <Text className="text-lg  font-semibold ">Tất cả </Text>
                  <Icon.ChevronRightIcon className="" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%", height: 120, marginTop: 10 }}
            >
              {data.map((image) => (
                <CardImage
                  key={image.id}
                  image={image.image}
                  width={120}
                  height={120}
                />
              ))}
            </ScrollView>
          </View>
          <View className="mt-6">
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold mx-4">Đồ dùng</Text>
              <TouchableOpacity>
                <View className="flex-row items-center">
                  <Text className="text-lg  font-semibold ">Tất cả </Text>
                  <Icon.ChevronRightIcon className="" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%", height: 120, marginTop: 10 }}
            >
              {data.map((image) => (
                <CardImage
                  key={image.id}
                  image={image.image}
                  width={120}
                  height={120}
                />
              ))}
            </ScrollView>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Shopping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  carousel: {
    width: width,
    height: 250,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    padding: 10,
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
