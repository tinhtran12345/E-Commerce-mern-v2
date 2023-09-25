import mongoose from "mongoose";

/*
    {
        "id": 2,
        "brand": "Masstel",
        "title": "Masstel Tab 10M 4G (No.00783743)",
        "evaluate": "196 đánh giá",
        "images": [
            "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/11/15/637725810554462380_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-1.jpg",
            "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/11/15/637725810559931216_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-3.jpg",
            "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/11/15/637725810559931216_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-2.jpg",
            "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/11/15/637725810551806112_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-4.jpg"
        ],
        "colors": [
            {
                "label": "Xanh",
                "image": "https://images.fpt.shop/unsafe/fit-in/38x38/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/11/15/637725810551806112_may-tinh-bang-masstel-tab-10m-4g-xanh-navy-4.jpg"
            },
            {
                "label": "Vàng",
                "image": "https://images.fpt.shop/unsafe/fit-in/38x38/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/12/22/637757712934636714_masstel-tab-10m-4g-vang-3.jpg"
            },
            {
                "label": "Đen",
                "image": "https://images.fpt.shop/unsafe/fit-in/38x38/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/11/15/637725809541343444_may-tinh-bang-masstel-tab-10m-4g-den-4.jpg"
            }
        ],
        "price": "2.690.000₫",
        "specifications": [
            {
                "data_icon": "icon-mobile",
                "data_info": "10.1 inch, IPS, 800 x 1280 Pixels"
            },
            { "data_icon": "icon-cam", "data_info": "5.0 MP " },
            { "data_icon": "icon-front-camera", "data_info": "2.0 MP " },
            { "data_icon": "icon-cpu", "data_info": "SCT310" },
            { "data_icon": "icon-hdd-black", "data_info": "32 GB" }
        ],
        "features_imgs": [
            "https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/14/637777780273125729_masstel-tab-10m-4g-thiet-ke.png",
            "https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/14/637777780265469707_masstel-tab-10m-4g-thiet-ke-ngoai.png",
            "https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/14/637777780277500705_masstel-tab-10m-4g-hieu-nang.png",
            "https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/14/637777780277344690_masstel-tab-10m-4g-pin.png",
            "https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/14/637777780272344502_masstel-tab-10m-4g-bao-da.png",
            "https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2022/1/14/637777780270000770_masstel-tab-10m-4g-android.png"
        ],
        "description": "Sở hữu cấu hình xuất sắc trong tầm giá và được trang bị hệ điều hành Android 11 thế hệ mới, máy tính bảng Masstel Tab 10M 4G là sự lựa chọn tuyệt vời nhất trong phân khúc giá rẻ khi ghi nhận dung lượng pin khủng 6.000 mAh. Màn hình rộng rãi chuẩn HD sẽ giúp ích rất nhiều cho bạn trong quá trình giải trí hoặc học tập, họp hành online.",
        "reviews": [
            {
                "id": 1,
                "username": "chú Đăng",
                "rating": 5,
                "comment": "Mới dùng đã hỏng, dùng 3 tiếng đã phải gửi đi bảo hành."
            },
            {
                "id": 2,
                "username": "Trung Nghĩa",
                "rating": 5,
                "comment": "Máy có cấu hình đủ dùng, thời lượng pin tốt và giá thành khá hợp lý"
            },
            {
                "id": 3,
                "username": " Pham Quang Thieu",
                "rating": 5,
                "comment": "Màn hình rộng rãi chuẩn HD sẽ giúp ích rất nhiều cho bạn trong quá trình giải trí hoặc học tập, họp hành online.\n"
            },
            {
                "id": 4,
                "username": "Việt An",
                "rating": 5,
                "comment": "máy có giá rẻ mà dung lượng pin khủng 6.000 mAh, tha hồ giải trí"
            },
            {
                "id": 5,
                "username": "Khả Hân",
                "rating": 5,
                "comment": "máy tạm ổn, chơi game hay đọc báo, lướt web giải trí đều được, màn hình không quá lớn, hỗ trợ 4g tiện lợi"
            }
        ]
    },
*/

const productSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        title: {
            type: String,
            require: true,
            trim: true,
        },
        slug: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        brand: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
        },
        colors: [
            {
                label: { type: String },
                image: { type: String },
            },
        ],
        price: {
            type: Number,
            required: true,
        },
        specifications: [
            {
                data_icon: { type: String },
                data_info: { type: String },
            },
        ],
        features_imgs: { type: Array },
        description: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },

        sold: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
                rating: { type: Number },
                comment: { type: String },
                likeNumber: { type: Number, default: 0 },
                state: { type: Boolean, default: false },
            },
        ],
        // ratings: [
        //     {
        //         star: { type: Number },
        //         postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        //         comment: { type: String },
        //     },
        // ],

        // evaluate
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
