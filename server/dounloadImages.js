import fs from "fs";
import path from "path";
import axios from "axios";
import "dotenv/config";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const BASE_DIR = "./uploads";

const categories = {
  starters: "veg indian starters food",
  mainCourse: "paneer curry indian food",
  southIndian: "south indian dosa idli food",
  chinese: "veg chinese noodles fried rice",
  rice: "veg biryani rice indian",
  desserts: "indian sweets dessert",
  beverages: "mocktails drinks juice",
};

const IMAGES_PER_CATEGORY = 30; // 7 × 30 = 210 images

const downloadImages = async () => {
  for (const category in categories) {
    const query = categories[category];
    const dir = path.join(BASE_DIR, category);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`\n📂 ${category.toUpperCase()}`);

    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          per_page: IMAGES_PER_CATEGORY,
          orientation: "squarish",
        },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    const photos = res.data.results;

    for (let i = 0; i < photos.length; i++) {
      const imageUrl =
        photos[i].urls.raw +
        "&w=900&h=700&fit=crop&auto=format";

      const img = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      fs.writeFileSync(
        path.join(dir, `${i + 1}.jpg`),
        img.data
      );

      console.log(`✅ ${category} ${i + 1}`);
    }
  }
};

downloadImages();
