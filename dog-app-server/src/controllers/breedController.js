const BreedInfo = require("../models/BreedInfo");
const Post = require("../models/PetPost");

function formatIsoToDate(isoString) {
  const date = new Date(isoString);

  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng lại theo ngày/tháng/năm
  return `${day}/${month}/${year}`;
}

const breedController = {
  getBreed: async (req, res) => {
    try {
      const { id } = req.query; // Lấy `name` từ query string

      // Lấy thông tin chi tiết của giống theo `name`
      const breed = await BreedInfo.findOne({ name: { $regex: new RegExp(`^${id}$`, 'i') } });
      if (!breed) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy thông tin giống",
        });
      }

      // Tìm các bài post liên quan
      const relatedPosts = await Post.find({
        post_pet: {
          $elemMatch: {
            $or: [
              { line: { $regex: breed.name, $options: "i" } },
              { health: { $regex: breed.sick, $options: "i" } },
              { takeCare: { $regex: breed.take_care, $options: "i" } },
            ],
          },
        },
        approved: true,
      })
        .select(
          "post_pet.name post_pet.health post_pet.takeCare post_pet.imageUrl"
        )
        .limit(5);

      const response = {
        success: true,
        breed_info: {
          name: breed.name,
          name_dog: breed.name_vn,
          gender: breed.gender || "Đực/Cái",
          age: breed.life_span,
          size: breed.size,
          common_disease: breed.sick,
          take_care: breed.take_care,
          des: breed.description,
          image: breed.image,
          time: formatIsoToDate(breed.updatedAt)
        },
        related_posts: relatedPosts.map((post) => ({
          post_id: post._id,
          pet_info: post.post_pet.map((pet) => ({
            name: pet.name,
            health_info: pet.health,
            care_info: pet.takeCare,
            image: pet.imageUrl,
          })),
        })),
      };

      res.json(response);
    } catch (error) {
      console.error("Error in getBreed:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  },

  getAllBreeds: async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    try {
      const breeds = await BreedInfo.find().skip(skip).limit(pageSize);

      const totalCount = await BreedInfo.countDocuments();

      res.json({
        success: true,
        breeds,
        totalCount,
        pageSize,
        currentPage,
      });
    } catch (error) {
      console.error("Error in getAllBreeds:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  },

  getBreedsByCategory: async (req, res) => {
    try {
      const { id } = req.query;

      const breeds = await BreedInfo.find({
        temperament: { $regex: new RegExp(`\\b${id}\\b`, 'i') }
      })
        .select("name image -_id")
        .limit(10);

      const result = {
        temperament: id,
        breeds: breeds.map((breed) => ({
          name_dog: breed.name,
          image: breed.image,
        })),
      };

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error in getBreedsByCategory:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  },
}

module.exports = breedController;
