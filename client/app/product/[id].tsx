import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/icon";
import Carousel from "react-native-reanimated-carousel";
import images from "@/constants/images";
import { useLocalSearchParams, useNavigation } from "expo-router";
import apiProduct from "@/axios/shopping";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DetailProductShopping = () => {
    const navigation = useNavigation();

    const { id } = useLocalSearchParams();

    const [detailProduct, setDetailProduct] = useState(null);

    const handleFetchDog = async () => {
        try {
            const response = await apiProduct.getDetailProduct(id);

            if (response.success == true) {
                setDetailProduct(response.data);
            } else {
                console.log("Error fetching category dogs from api");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleFetchDog();
    }, []);


    const data = [
        {
            id: 1,
            image: images.card_explore3,
        },
        {
            id: 2,
            image: images.card_explore3,
        },
        {
            id: 3,
            image: images.card_explore3,
        },
    ];

    const avatar = [
        { id: 1, image: images.card_explore5 },
        { id: 2, image: images.card_explore5 },
        { id: 3, image: images.card_explore5 },
    ];

    // Hàm render danh sách hình ảnh
    const renderImages = (images) => {
        // Đảm bảo mảng có ít nhất 3 phần tử
        const processedImages = images.length === 1
            ? Array(3).fill(images[0]) // Nhân 3 nếu chỉ có 1 hình
            : images.length === 2
                ? [...images, images[0]] // Thêm hình đầu tiên nếu có 2 hình
                : images; // Giữ nguyên nếu đã có từ 3 hình trở lên

        return processedImages.map((item, index) => (
            <TouchableOpacity key={index}>
                <View style={styles.thumbnail}>
                    <Image style={styles.thumbnailImage} source={{ uri: item }} />
                </View>
            </TouchableOpacity>
        ));
    };





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {detailProduct && (
                <>
                    <View>
                        {/* Header Icons */}
                        <View style={styles.headerContainer}>
                            <TouchableOpacity>
                                <Icon.ChevronLeftIcon size={35} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon.ShoppingCartIcon size={30} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.carouselContainer}>
                            <View style={styles.thumbnailContainer}>
                                {renderImages(detailProduct.images)}
                                {/* {detailProduct.images.map((item) => (
                                    <TouchableOpacity key={item.id}>
                                        <View style={styles.thumbnail}>
                                            <Image style={styles.thumbnailImage} source={{ uri: item }} />
                                        </View>
                                    </TouchableOpacity>
                                ))} */}
                            </View>
                            <View style={styles.carousel}>
                                <Carousel
                                    loop={false}
                                    width={width * 0.7}
                                    height={270}
                                    data={detailProduct.images}
                                    renderItem={({ index, item }) => (
                                        <View style={styles.carouselItem} key={index}>
                                            <Image
                                                source={{ uri: item as string }}
                                                style={styles.image}
                                                resizeMode="cover"
                                            />
                                            <TouchableOpacity style={styles.imageIconContainer}>
                                                <Image
                                                    source={images.zoom_in_icon}
                                                    style={styles.zoomIcon}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    scrollAnimationDuration={1000}
                                />
                            </View>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ height: height * 0.45 }}
                        >
                            {/* Body */}


                            <View className="mt-4 flex-row justify-between items-center w-[96%] px-8">


                                <Text className="text-lg w-4/5">
                                    <Text className="text-lg font-semibold">{detailProduct.name}. </Text>
                                    {detailProduct.description}
                                </Text>
                                <View className="border-2 border-[#FFBD73] rounded-full p-2">
                                    <Image className="w-6 h-6" source={images.share_product_icon} />
                                </View>
                            </View>
                            <View className="px-8 mt-2 flex-row justify-between items-center w-[96%]">
                                <Text className="text-2xl text-[#FFBD73] font-semibold">
                                    {detailProduct.price} VND
                                </Text>
                                <Text className="text-[#9D9D9D]">Còn lại   {detailProduct.stockCount}</Text>
                            </View>
                            <View className="my-8 h-[1px] w-[86%] mx-auto bg-[#9D9D9D]"></View>
                            <View className="px-8 gap-2">
                                <View className="flex-row items-center gap-2">
                                    <Image className="w-8 h-8" source={images.protect_icon} />
                                    <Text className="font-semibold">Bảo vệ bạn</Text>
                                </View>
                                <View>
                                    <Text className="text-[#9D9D9D]">
                                        Trả hàng miễn phí trong vòng 15 ngày. Tặng voucher 5k khi giao
                                        hàng sau thời gian quy định
                                    </Text>
                                </View>
                            </View>
                            <View className="my-8 h-[1px] w-[86%] mx-auto bg-[#9D9D9D]"></View>
                            <View className="px-8 gap-2 flex-row justify-between items-center">
                                <View className="flex-row gap-2">
                                    {detailProduct.images.map((item, index) => (
                                        <Image
                                            key={index}
                                            className="w-16 h-16 rounded-full"
                                            source={{ uri: item }}
                                        />
                                    ))}
                                </View>
                                <View className="flex-row gap-2 items-center">
                                    <Image
                                        className="h-6 w-6"
                                        source={images.half_rating_star_icon}
                                    />
                                    <Text>{detailProduct.rating}</Text>
                                </View>
                            </View>
                            <View className="my-8 h-[1px] w-[86%] mx-auto bg-[#9D9D9D]"></View>
                            <View className="px-8">
                                <Text>
                                    Trả hàng miễn phí trong vòng 15 ngày. Tặng voucher 5k khi giao
                                    hàng sau thời gian quy định
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonWrapper}>
                            <View style={[styles.button, styles.addToCartButton]}>
                                {/* <Image style={styles.icon} source={images.shopping_cart_icon} /> */}
                                <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonWrapper}>
                            <View style={[styles.button, styles.buyNowButton]}>
                                <Text style={styles.buttonText}>Mua Ngay</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    titleContainer: {
        alignItems: "center",
        marginVertical: 16,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
    },
    carouselContainer: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 16,
    },
    thumbnailContainer: {
        width: "20%",
        alignItems: "center",
    },
    thumbnail: {
        backgroundColor: "rgba(67, 75, 85, 0.2)",
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
    },
    thumbnailImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
    },
    carousel: {
        width: "80%",
        alignItems: "center",
    },
    carouselItem: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    imageIconContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 8,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    zoomIcon: {
        width: 24,
        height: 24,
    },
    descriptionContainer: {
        marginTop: 32,
        paddingHorizontal: 16,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "600",
        color: "gray",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        width: "100%",
        alignItems: "center",
    },
    buttonWrapper: {
        flex: 1, // Đảm bảo mỗi nút chiếm một nửa chiều rộng
    },
    button: {
        flexDirection: "row",
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 50,
        marginHorizontal: 4, // Thêm khoảng cách giữa hai nút
    },
    addToCartButton: {
        borderColor: "#FFBD73",
        backgroundColor: "white",
    },
    buyNowButton: {
        borderColor: "#FFBD73",
        backgroundColor: "#FFBD73",
    },
    buttonText: {
        fontWeight: "600",
        color: "black",
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
});

export default DetailProductShopping;
