import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, "../public/img/menu");
fs.mkdirSync(OUT_DIR, { recursive: true });

const sources = [
  ["samosa.jpg", "https://images.unsplash.com/photo-1604908176997-87c3f13d2c3f"],
  ["pakora.jpg", "https://images.unsplash.com/photo-1628294896516-c23a4f1f3d71"],
  ["pani-puri.jpg", "https://images.unsplash.com/photo-1626207345399-6f4c1c48ad0a"],
  ["pav-bhaji.jpg", "https://images.unsplash.com/photo-1624432928280-36c7346fadb8"],
  ["chicken-tikka.jpg", "https://images.unsplash.com/photo-1605475128023-51cd4b72c43e"],
  ["paneer-tikka.jpg", "https://images.unsplash.com/photo-1617196035154-5c8cf16f16b8"],
  ["butter-chicken.jpg", "https://images.unsplash.com/photo-1642322659320-feb9c06c8505"],
  ["tikka-masala.jpg", "https://images.unsplash.com/photo-1601050690597-1b1f2038a66b"],
  ["palak-paneer.jpg", "https://images.unsplash.com/photo-1663162954640-11ec8e2ad1b3"],
  ["dal-tadka.jpg", "https://images.unsplash.com/photo-1674555986783-bf06a6c1ad43"],
  ["chicken-biryani.jpg", "https://images.unsplash.com/photo-1617196035094-6b39679e4b51"],
  ["veg-biryani.jpg", "https://images.unsplash.com/photo-1634121493320-caa5103b97ad"],
  ["naan.jpg", "https://images.unsplash.com/photo-1617196035168-2b01f2b2bafd"],
  ["garlic-naan.jpg", "https://images.unsplash.com/photo-1633339176788-8a1c6d4a3bdf"],
  ["gulab-jamun.jpg", "https://images.unsplash.com/photo-1662985679993-1d061cf1ef03"],
  ["kheer.jpg", "https://images.unsplash.com/photo-1606813902913-66f37bcd07d1"],
  ["lassi-mango.jpg", "https://images.unsplash.com/photo-1655743364679-f12a0d5ad011"],
  ["masala-chai.jpg", "https://images.unsplash.com/photo-1608475163933-248dcae33e12"]
];

// Tiny white JPG (1x1) as offline fallback so the app still has an image.
const FALLBACK_JPG = Buffer.from(
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhAQEBAQDxAQEA8QEA8PDw8QEA8PFREWFhURExYYHSggGBolGxMVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHB//EADgQAAEDAgMFBQQIBwAAAAAAAAEAAgMEEQUSITEGQVFhEzJxgZGhscHRFBUjQmJy8BRSYoLhFjNDU3L/xAAZAQADAQEBAAAAAAAAAAAAAAACAwQBAAb/xAAkEQACAgICAgIDAQEAAAAAAAAAAQIRAyExEkEEURTiMmFxgf/aAAwDAQACEQMRAD8A+YooorV8CiiiiuL//Z",
  "base64"
);

function withParams(src) {
  const url = new URL(src);
  // Force a consistent size/format so Unsplash returns a resized JPG.
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", "800");
  url.searchParams.set("q", "80");
  return url.toString();
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const arrayBuf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuf));
}

(async () => {
  console.log(`-> Telechargement dans ${OUT_DIR}`);
  for (const [name, unsplash] of sources) {
    const dest = path.join(OUT_DIR, name);
    const direct = withParams(unsplash);
    try {
      await download(direct, dest);
      console.log(`OK ${name}`);
    } catch (e) {
      console.error(`Echec ${name} : ${e.message} (fallback local)`);
      fs.writeFileSync(dest, FALLBACK_JPG);
    }
  }
  console.log("Termine.");
})();
