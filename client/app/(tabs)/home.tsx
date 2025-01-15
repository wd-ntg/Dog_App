import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";
// import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { predictImage } from "@/axios/api";

import CardItem from "@/common/components/CardItem";
import CardNewNews from "@/common/components/CardNewNews";
import images from "@/constants/images";
import CardImage from "@/common/components/CardImage";
import { router } from "expo-router";



const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Khám phá"); // State theo dõi tab được chọn

  const tabs = ["Khám phá", "Tin mới", "Tin của bạn"]; // Danh sách các tab

  const [activeCategory, setActiveCategory] = useState("Khám phá");


  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);



  const cards = [
    {
      id: 1,
      image: images.card_explore1,
      title: "Thân thiện",
      quantity: "52/120",
      urlParams: "Thân thiện"
    },
    {
      id: 2,
      image: images.card_explore3,
      title: "Thông minh",
      quantity: "22/120",
      urlParams: "Thông minh"

    },
    {
      id: 3,
      image: images.card_explore4,
      title: "Hoạt bát",
      quantity: "12/120",
      urlParams: "Hoạt bát"

    },
    {
      id: 4,
      image: images.card_explore2,
      title: "Trung thành",
      quantity: "86/120",
      urlParams: "Trung thành"

    },
    {
      id: 5,
      image: images.card_explore5,
      title: "Năng động",
      quantity: "86/120",
      urlParams: "Năng động"

    },
    {
      id: 6,
      image: images.card_explore5,
      title: "Bảo vệ",
      quantity: "86/120",
      urlParams: "Bảo vệ"

    },
    {
      id: 7,
      image: images.card_explore5,
      title: "Nhanh nhẹn",
      quantity: "86/120",
      urlParams: "Nhanh nhẹn"

    },
    {
      id: 8,
      image: images.card_explore5,
      title: "Tình cảm",
      quantity: "86/120",
      urlParams: "Tình cảm"

    },

  ];

  const cardNewNews = [
    {
      id: 1,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 2,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 3,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 4,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 5,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
    {
      id: 6,
      image: images.card_explore2,
      time: "1 phút trước",
      like: "12",
      title: "Báo Con",
      character: "Dễ thương, thân thiện",
      owner: "Trường Giang",
    },
  ];

  const image_arr = [
    { id: 1, image: images.card_explore1 },
    { id: 2, image: images.card_explore2 },
    { id: 3, image: images.card_explore3 },
    { id: 4, image: images.card_explore4 },
    { id: 5, image: images.card_explore5 },
  ];

  const [modalVisible, setModalVisible] = useState(false);


  const handleImageSelection = async (pickerFunction: any) => {
    try {
      const result = await pickerFunction({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);


        setResult(null);

        setLoading(true);
        try {
          const response = await predictImage(imageUri);

          if (response && response.success) {
            if (response.identified) {
              //console.log(response.identified);
              router.push(`/pet/${response.identified.name}`)
            } else {

              setResult(response.alternatives);
              setModalVisible(true);
            }
          }
        } catch (error) {
          Alert.alert("Error", "Failed to get a prediction. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to process the image. Please try again.");
    }
  };



  return (
    <SafeAreaView className="flex-1 h-screen bg-white">
      {/* Header Section */}
      <View className="px-4 py-6">
        {/* Header Icons */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Icon.UserCircleIcon size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.Bars3Icon size={40} color="black" />
          </TouchableOpacity>
        </View>

        {/* Greeting Section */}
        <View className="mt-6 px-2">
          <View className="flex flex-row items-center">
            <Text className="text-2xl">Chào</Text>
            <Text className="text-2xl font-semibold ml-1">Giang</Text>
          </View>
          <View className="mt-2 flex flex-row items-center">
            <Text className="">Mừng bạn quay trở lại với</Text>
            <Text className="font-semibold text-blue-600 ml-2">SKY'P</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-4 rounded-xl flex flex-row items-center justify-between">
          <View className="flex w-[90%] flex-row items-center border-[1px] rounded-3xl p-1">
            <Icon.MagnifyingGlassIcon size={30} color="black" />
            <TextInput
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              className="w-[90%] ml-2"
            />
          </View>
          <View>
            <Icon.CameraIcon
              onPress={() =>
                handleImageSelection(ImagePicker.launchImageLibraryAsync)
              }
              size={30}
              color="black"
            />
          </View>
        </View>

        {/* Tabs Section */}
        <View className="flex-row justify-around mt-4 border-b border-gray-300">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                setActiveTab(tab);
                setActiveCategory(tab);
              }}
              className="flex items-center pb-2"
            >
              <Text
                className={`text-lg ${activeTab === tab ? "font-bold text-black" : "text-gray-500"
                  }`}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="h-1 w-10 bg-black mt-2 rounded-full" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          className="px-4"
          showsVerticalScrollIndicator={false}
        >
          {activeCategory === "Khám phá" &&
            cards.map((card) => (
              <CardItem
                key={card.id}
                image={card.image}
                title={card.title}
                quantity={card.quantity}
                urlParams={card.urlParams}
              />
            ))}
          {activeCategory === "Tin mới" &&
            cardNewNews.map((card) => (
              <CardNewNews
                key={card.id}
                image={card.image}
                title={card.title}
                owner={card.owner}
                time={card.time}
                like={card.like}
                character={card.character}
              />
            ))}

          {activeCategory === "Tin của bạn" && (
            <View className="mt-4">
              <View>
                <Text className="text-[#ababab] font-semibold">
                  Bài đăng gần nhất của bạn
                </Text>
                <Image
                  className="relative w-full h-60 rounded-xl mt-2"
                  source={images.card_explore2}
                />
                <BlurView
                  intensity={40} // Điều chỉnh mức độ mờ (0-100)
                  tint="light" // Dạng hiệu ứng mờ (light, dark, default)
                  className="absolute bottom-0 w-full px-4 py-2 rounded-b-xl flex flex-row justify-between items-center"
                >
                  <Text className="text-[#FFBD73] text-lg font-semibold">
                    Alex Chen
                  </Text>
                  <View className="flex-row justify-center items-center gap-2">
                    <Image className="w-4 h-4" source={images.like_icon} />
                    <Text>Like</Text>
                  </View>
                </BlurView>
              </View>
              <Text className="text-[#ababab] font-semibold mt-4">
                Bài đăng khác
              </Text>

              <View className="" style={styles.imageGrid}>
                {image_arr.map((image) => (
                  <CardImage
                    key={image.id}
                    image={image.image}
                    width={190}
                    height={150}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible} // Tạo điều kiện mở/đóng modal
          onRequestClose={() => setModalVisible(false)} // Đóng modal khi bấm nút back
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              {/* Tiêu đề */}
              <View style={styles.modalHeader}>
                <Text style={styles.title}>Hệ thống chưa nhận diện được</Text>
                <Text style={styles.title}>Một vài pet có thể liên quan</Text>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewModal}
              >
                <View style={styles.containerModal}>
                  {result &&
                    result.length > 0 &&
                    result.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => router.push(`/pet/${item.details?.name}`)}
                        key={index}
                        style={styles.card}
                      >
                        <View style={styles.cardImageContainer}>
                          <Image
                            source={{ uri: item.details?.image }}
                            style={styles.image}
                          />

                          <Text style={styles.cardText}>
                            {item.details?.name_vn}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </ScrollView>

              {/* Nút đóng modal */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)} // Đóng modal
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      )}
    </SafeAreaView >
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  blur_style: {
    backdropFilter: "blur(12px)",
  },

  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contentContainer: {
    height: "60%",
    width: "100%",
    backgroundColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ đen cho modal
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff", // Nền trắng cho modal
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Tạo hiệu ứng đổ bóng cho modal
  },
  modalHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333", // Màu chữ cho tiêu đề
  },
  scrollViewModal: {
    width: "100%",
  },
  containerModal: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    width: "30%", // Chiều rộng của mỗi phần tử (1/3 màn hình)
    marginBottom: 10, // Khoảng cách giữa các dòng
    alignItems: "center", // Căn giữa nội dung trong mỗi thẻ
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  cardImageContainer: {
    position: "relative",
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "fill", // Điều chỉnh ảnh để fit trong khung
  },
  cardText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#00000080", // Nền tối với độ trong suốt
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#ff5722", // Màu nền của nút đóng
    borderRadius: 30,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff", // Màu chữ cho nút đóng
    fontSize: 16,
    fontWeight: "bold",
  },
});
