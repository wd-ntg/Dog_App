import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { userRegister } from "@/store/action/userAction";

import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Carousel from "react-native-reanimated-carousel";
import { Redirect, router, Link } from "expo-router";

import images from "@/constants/images";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    image: images.info1,
    title: "Kết Nối Cảm Xúc",
    note: "Tình yêu không chỉ ở trong tim, mà còn nằm trong ánh mắt của chú cún hay tiếng rừ rừ của chú mèo!",
  },
  {
    id: 2,
    image: images.info2,
    title: "Hành Trình Yêu Thương",
    note: "Bạn sẵn sàng thay đổi cuộc sống của một thú cưng? Hãy để chúng tôi giúp bạn bắt đầu ngay hôm nay.",
  },
  {
    id: 3,
    image: images.info3,
    title: "Tiện Lợi Mua Sắm",
    note: "Tất cả trong một ứng dụng: Nhận nuôi thú cưng và mua sắm đồ dùng chỉ với vài cú chạm!",
  },
];

const Info = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   // Cần truyền dữ liệu vào nếu cần thiết
  //   const userData = {
  //     uid: "12345",
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //     photoURL: "https://example.com/photo.jpg",
  //   };

  //   dispatch(userRegister());
  // }, [dispatch]); // Thêm mảng phụ thuộc để gọi chỉ một lần

  // const user = useSelector((state: RootState) => state.user.userInfo);

  // console.log("User Info Giang:", user);

  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleSnapToItem = (newIndex: any) => {
    Animated.timing(animatedValue, {
      toValue: newIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setActiveIndex(newIndex);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View className="w-full flex  justify-center items-center ">
          <Carousel
            loop
            width={width}
            height={heigth * 0.7}
            autoPlay
            autoPlayInterval={2000}
            scrollAnimationDuration={1000}
            data={data}
            onSnapToItem={handleSnapToItem}
            renderItem={({ index }) => (
              <View style={styles.carouselItem}>
                <Image
                  style={{
                    width: "100%",
                    height: heigth * 0.5,
                    resizeMode: "cover",
                  }}
                  className=""
                  source={data[index].image}
                />
                <View
                  style={{ alignItems: "center", margin: 2, marginTop: 30 }}
                >
                  <Text style={styles.titleText}>{data[index].title}</Text>
                  <Text style={styles.noteText}>{data[index].note}</Text>
                </View>
              </View>
            )}
          />
          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {data.map((_, index) => {
              const dotWidth = animatedValue.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [10, 20, 10], // Chấm hiện tại lớn hơn
                extrapolate: "clamp",
              });

              const dotColor = animatedValue.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: ["#ddd", "#F14A00", "#ddd"], // Màu của chấm hiện tại
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      width: dotWidth,
                      backgroundColor: dotColor,
                    },
                  ]}
                />
              );
            })}
          </View>
          {/* Button */}
          <View style={styles.buttonContainer}>
            <Link href="/(tabs)/Post" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f2",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  carouselItem: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#f6f7f2",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
  },
  titleText: {
    color: "black",
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 20,
  },
  noteText: {
    color: "black",
    marginTop: 2,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Info;
