
export const provinces = [
  {
    id: "siem-reap",
    name: "Siem Reap",
    tagline: "Gateway to the temples of Angkor",
    region: "Northwest",
    image:
      "/provinces-images/siemreap.jpg",
    description:
      "Home to the Angkor Archaeological Park, Siem Reap blends ancient temple cities with a lively night market scene and a growing food and art culture.",
    visit: [
      { name: "Angkor Wat", note: "Arrive before sunrise to beat the heat and the crowds.", image: "/item-images/angkorwat.jpg", longDescription: "Angkor Wat is more than a temple — it's a journey into the heart of the Khmer Empire. Built in the 12th century, it's known for its enormous stone galleries, intricately carved bas-reliefs, soaring central towers, and calm reflection pools. One of the most unforgettable experiences is arriving before dawn to watch the sky change color as the temple's silhouette rises above the water. Inside, the carved galleries tell stories from Hindu mythology and the history of the Khmer Empire — a visit here leaves you with a real appreciation for Cambodia's architecture, religion, and cultural identity, not just a good photo." },
      { name: "Bayon Temple", note: "Famous for its 216 serene stone faces.", image: "/item-images/bayon.jpg" },
      { name: "Ta Prohm", note: "Jungle roots swallow the ruins — the 'Tomb Raider' temple.", image: "/item-images/taprom.jpg" },
      { name: "Tonle Sap Floating Villages", note: "Boat through stilted and floating communities.", image: "/item-images/tonlesabsr.jpg" },
    ],
    eat: [
      { name: "Malis Siem Reap", note: "Fine-dining Khmer cuisine from chef Luu Meng — the benchmark version of fish amok.", image: "/item-images/malis.jpg", longDescription: "Malis Siem Reap is built around what it calls \"Living Cambodian Cuisine\" — traditional Khmer culinary heritage served with refined, elegant presentation. Set along the Siem Reap River in a space inspired by Angkor's architecture, it connects food, culture, and design in one sitting. The steamed fish amok is the dish most people come for, but the real draw is the chance to taste Cambodia's culture rather than just eat a meal — a great pick for couples, families, or anyone who wants a proper introduction to Khmer flavors." },
      { name: "Cuisine Wat Damnak", note: "Tasting-menu Khmer cooking built around whatever's fresh at the market that day.", image: "/item-images/cuisine.jpg" },
      { name: "Chanrey Tree", note: "Refined Khmer dishes served in a traditional wooden house; the coconut-shell amok stands out.", image: "/item-images/chanrey-tree.jpg" },
      { name: "Embassy by Chef Kimsan", note: "A tasting menu of modern, elevated Khmer dishes from the well-known Kimsan twins.", image: "/item-images/embassy.jpeg" },
      { name: "Café Indochine", note: "French-Khmer fusion in a Khmer wooden house on Sivatha Street.", image: "/item-images/cafe indo.jpg" },
      { name: "Blue Pumpkin", note: "Go-to spot for Khmer coffee, ice cream, and a quick breakfast near Pub Street.", image: "/item-images/the-blue-pumpkin.jpg" },
    ],
    sleep: [
      { name: "Viroth's Hotel", note: "Mid-century-styled rooms around a garden pool, a short walk from the Old Market.", image: "/item-images/viroth.jpeg",  longDescription: "After a day of temple-hopping, Viroth's Hotel is a calm, stylish place to unwind. Tucked in Siem Reap's Wat Bo area, it's close enough to the Old Market and Pub Street to make evenings easy, but far enough to stay peaceful at night. The boutique, mid-century-styled rooms and garden pool give it a more personal feel than a big chain hotel — a comfortable base for exploring by day and relaxing by night."  },
      { name: "Rambutan Resort", note: "Relaxed boutique stay on the river's quieter east side, close to Pub Street.", image: "/item-images/butan.jpeg" },
      { name: "Treeline Urban Resort", note: "Modern riverside resort right in the center of town.", image: "/item-images/treeline.jpeg" },
    ],
  },
  {
    id: "phnom-penh",
    name: "Phnom Penh",
    tagline: "The riverside capital",
    region: "Central",
    image:
      "/provinces-images/phnompenh.jpg",
    description:
      "Cambodia's capital mixes French colonial architecture, the glittering Royal Palace, and a sobering, essential history along the Mekong and Tonle Sap rivers.",
    visit: [
      { name: "Royal Palace & Silver Pagoda", note: "Dress modestly — shoulders and knees covered.", image: "/item-images/royal.jpeg", longDescription: "The Royal Palace is one of Phnom Penh's most recognizable landmarks — golden roofs, elegant Khmer architecture, and immaculately kept grounds that offer a window into Cambodia's royal traditions. Inside the complex, the Silver Pagoda holds a remarkable collection of Buddhist treasures and art. It's a quieter, more reflective stop than the busy riverside nearby, and a good one for anyone curious about the country's monarchy, religion, and architecture. Dress modestly — shoulders and knees covered."  },
      { name: "Tuol Sleng Genocide Museum", note: "A former school turned Khmer Rouge prison; heavy but important.", image: "/item-images/toulsleang.webp" },
      { name: "Sisowath Quay", note: "Riverside promenade, best at sunset.", image: "/item-images/Riverside.jpg" },
      { name: "Central Market (Phsar Thmey)", note: "Art deco dome, gems, clothes, and snacks.", image: "/item-images/central.png" },
    ],
    eat: [
      { name: "Malis Phnom Penh", note: "The capital outpost of Siem Reap's famous Khmer fine-dining restaurant.", image: "/item-images/malispp.jpeg", longDescription: "Malis Phnom Penh is designed around preserving and celebrating Cambodian culinary tradition, set in an elegant open-air courtyard with greenery and a fish pond. It's a favorite for special dinners, with a menu that ranges from classic fish amok to lesser-known regional dishes. More than a meal, it's a chance to experience Cambodia through its food — a great stop after a day exploring the capital's landmarks."  },
      { name: "Romdeng", note: "Social-enterprise restaurant training former street youth; try the fried tarantulas or the amok.", image: "/item-images/romdeng.jpg" },
      { name: "Riverview Restaurant & Bar", note: "Riverside dining on Sisowath Quay with Khmer and Western plates.", image: "/item-images/riverview.webp" },
    ],
    sleep: [
      { name: "Sofitel Phnom Penh Phokeethra", note: "French-colonial-style riverside hotel in the historic quarter.", image: "/item-images/sofitel.jpg",  longDescription: "Sofitel Phnom Penh Phokeethra offers a peaceful, luxurious escape right in the middle of the capital. It blends modern hospitality with colonial-inspired architecture, tropical gardens, a spa, and multiple restaurants, all close to the Mekong. After a busy day exploring Phnom Penh, it's the kind of place where you can properly slow down and recharge in comfort." },
      { name: "Shangri-La Phnom Penh", note: "Contemporary riverside luxury with skyline and Mekong views.", image: "/item-images/shangri.jpg" },
      { name: "Chaiya Palace Hotel", note: "Spa hotel a short walk from the Riverside and Royal Palace.", image: "/item-images/chaiya.jpeg" },
    ],
  },
  {
    id: "preah-sihanouk",
    name: "Preah Sihanouk (Sihanoukville)",
    tagline: "Beaches, islands, and sunsets",
    region: "Coastal",
    image:
      "/provinces-images/preahsihanouk.jpg",
    description:
      "Cambodia's main coastal hub and jumping-off point for the islands — Koh Rong and Koh Rong Samloem — known for white sand and turquoise water.",
    visit: [
      { name: "Koh Rong Island", note: "Backpacker beaches by day, bioluminescent plankton by night.", image: "/item-images/kohrong.jpg" , longDescription: "Koh Rong is where you trade busy city life for white sand, clear water, and jungle-fringed coastline. Days here are made for swimming, snorkeling, kayaking, and beach-hopping; at night, several beaches light up with bioluminescent plankton when conditions are right — an unforgettable, slightly surreal sight. It's a genuine chance to disconnect and slow down, whether you're after a lively backpacker scene near the main village or a quieter stretch of sand further around the island."},
      { name: "Koh Rong Samloem", note: "Quieter, calmer waters — great for snorkeling.", image: "/item-images/kohrongsamloem.jpg" },
      { name: "Otres Beach", note: "Laid-back beach bars and hammocks.", image: "/item-images/otres.jpg" },
    ],
    eat: [
      { name: "Sara Restaurant, Otres Beach", note: "Fresh seafood and a relaxed beachfront setting at Sara Resort.", image: "/item-images/sararestaurant.webp", longDescription: "Sara Restaurant sits right on the sand at Otres Beach, pairing a relaxed, barefoot atmosphere with a menu of fresh seafood and Khmer and Western dishes made from quality, locally sourced ingredients. Tables spill out toward the water, so it's a natural spot to linger over a sunset meal — a good example of the easy, unhurried rhythm of Cambodia's coast." },
      { name: "Lazy Beach, Koh Rong Samloem", note: "Beachfront bar and kitchen — order the day's catch and watch the sunset.", image: "/item-images/lazy.jpg" },
    ],
    sleep: [
      { name: "Sokha Beach Resort", note: "Large full-service beach resort on Sihanoukville's main bay.", image: "/item-images/sokha.jpg", longDescription: "Sokha Beach Resort is a large-scale luxury stay on Sihanoukville's own long, private stretch of white sand. With landscaped gardens, multiple swimming pools, a spa, and several restaurants and bars, it's built for travelers who want the full beach experience without giving up comfort — a solid base if you're combining mainland relaxation with day trips out to the islands."  },
      { name: "Naiya Sea Resort, Otres", note: "Quiet, comfortable stay with direct access to Otres Beach.", image: "/item-images/naiya-sea-resort.jpg" },
      { name: "Lazy Beach, Koh Rong Samloem", note: "Simple beach bungalows on one of the quieter islands.", image: "/item-images/lazyresort.jpg" },
    ],
  },
  {
    id: "battambang",
    name: "Battambang",
    tagline: "Colonial charm and countryside",
    region: "Northwest",
    image:
      "/provinces-images/battambang.jpg",
    description:
      "Cambodia's second city, with well-preserved French colonial buildings, circus arts, and the countryside's famous bamboo train.",
    visit: [
      { name: "Bamboo Train (Norry)", note: "A homemade bamboo platform railcar ride through the countryside.", image: "/item-images/bamboo-train-battambang-123-scaled.jpg", longDescription: "The Bamboo Train — locally known as the norry — is one of Cambodia's most unusual rides: a small motorized bamboo platform gliding along a stretch of railway track outside Battambang. It's a completely different way to see rice fields and rural village life, made even more memorable by the ritual of dismantling the car to let oncoming traffic pass on the single track. Simple, local, and a little adventurous — it's the kind of experience that stays with you." },
      { name: "Phare Ponleu Selpak Circus", note: "Contemporary Khmer circus performances.", image: "/item-images/phare.jpg" },
      { name: "Wat Banan", note: "A quieter, less-visited cousin of Angkor's temple mountains.", image: "/item-images/banan.jpg" },
    ],
    eat: [
      { name: "Phsar Nath (old market)", note: "Local produce, noodles, and street snacks.", image: "/item-images/phsanath.jpeg", longDescription: "Battambang's riverside restaurants along the Sangkae are where the evening naturally ends up — open-air tables, a light breeze off the water, and menus that mix Khmer standards with Western comfort food. It's an easy, unpretentious spot to bring a group with different tastes, and several places shift into low-key bars once dinner winds down." },
      { name: "Riverside restaurants", note: "Relaxed Khmer and Western fusion menus.", image: "/item-images/riverbtb.jpeg" },
    ],
    sleep: [
      { name: "Maisons Wat Kor", note: "Small boutique hotel in Wat Kor village, a favorite with long-time visitors.", image: "/item-images/maison.png", longDescription: "Maisons Wat Kor offers a more peaceful alternative to staying in the center of Battambang, set among traditional wooden houses in Wat Kor village. With a garden pool and a genuinely local atmosphere, it's a favorite with repeat visitors who want comfort and privacy alongside a slower, more traditional side of the province." },
      { name: "La Villa", note: "Charming 4-star boutique hotel downtown with a garden pool.", image: "/item-images/lavillabtb.jpeg" },
    ],
  },
  {
    id: "kampot",
    name: "Kampot",
    tagline: "Riverside town famous for pepper",
    region: "Coastal",
    image:
      "/provinces-images/kampot.jpg",
    description:
      "A sleepy riverside town known worldwide for its Kampot pepper, French shophouses, and easy access to Bokor Mountain.",
    visit: [
      { name: "Bokor National Park", note: "Cool hilltop air and an eerie abandoned French casino.", image: "/item-images/boko.jpg", longDescription: "Bokor National Park is one of Kampot's most striking natural escapes — cool mountain air, forest, waterfalls, and panoramic views that feel a world away from Cambodia's lowland heat. At the top, the abandoned Bokor Palace Hotel & Casino sits wrapped in fog for much of the year, alongside an old church and a modern hilltop temple with sweeping coastal views. Add in Popokvil Waterfall along the way, and it's an easy full-day trip that mixes nature, history, and genuinely dramatic scenery."  },
      { name: "Kampot Pepper Farms", note: "Tour and taste the region's famous export.", image: "/item-images/paper famr.jpeg" },
      { name: "Kampot River sunset cruise", note: "Fireflies light up the mangroves after dark.", image: "/item-images/kompotsunset.jpeg" },
    ],
    eat: [
      { name: "Rikitikitavi", note: "Riverside restaurant well known for its Khmer and Western menu and river views.", image: "/item-images/rikitikitavi.jpeg", longDescription: "Rikitikitavi combines food, history, and river views in one of Kampot's most memorable settings — a historic colonial-era building with a terrace restaurant overlooking the water and mountains beyond. The menu leans on fresh local ingredients, including plenty of Kampot pepper, the region's signature export. It's the kind of place where the setting is just as much a part of the meal as the food."  },
      { name: "Rusty Keyhole", note: "Famous for ribs — a longtime Riverside Road favorite.", image: "/item-images/rusty-keyhole.webp" },
      { name: "Epic Arts Cafe", note: "Social-enterprise cafe with strong vegetarian options.", image: "/item-images/epic-arts-cafe.jpg" },
    ],
    sleep: [
      { name: "Hotel La Java Bleue", note: "Boutique guesthouse in a restored colonial building in central Kampot.", image: "/item-images/lajava.jpg", longDescription: "La Java Bleue is a charming, colonial-era boutique hotel and café right in the heart of Kampot, built for travelers who want a comfortable base without losing the town's relaxed character. Its central location makes it easy to walk to the river, the markets, and the restaurants at your own pace — a simple, reliable place to rest between adventures." },
      { name: "Villa Vedici", note: "Riverside resort built around two pools, with rooms looking over the water.", image: "/item-images/villa-vedici.jpg" },
    ],
  },
  {
    id: "mondulkiri",
    name: "Mondulkiri",
    tagline: "Highlands, waterfalls, and elephants",
    region: "Northeast",
    image:
      "/provinces-images/mondulkiri.jpg",
    description:
      "A cool, forested plateau in the northeast — home to ethical elephant sanctuaries, waterfalls, and Bunong hill-tribe culture.",
    visit: [
      { name: "Bou Sra Waterfall", note: "A dramatic two-tiered waterfall.", image: "/item-images/bousra.jpeg", longDescription: "The Elephant Valley Project offers a genuinely ethical way to spend time near elephants — no riding, no performances, just observing rescued elephants roam a forested valley from a respectful distance. Visits also cover the history of these elephants and the Bunong communities who traditionally cared for them, giving visitors a deeper, more meaningful connection to Mondulkiri's highlands than a typical wildlife stop." },
      { name: "Elephant Valley Project", note: "Ethical, hands-off elephant sanctuary visits.", image: "/item-images/elephant.jpg" },
      { name: "Sen Monorom", note: "The laid-back provincial hub for treks and homestays.", image: "/item-images/senmonorom.jpg" },
    ],
    eat: [
      { name: "Oramis", note: "Local place in Sen Monorom, good foods with beautiful view.", image: "/item-images/oramis.jpeg", longDescription: "Khmer Kitchen Restaurant is a reliable, no-fuss spot in Sen Monorom for straightforward Khmer home cooking after a day of trekking. It's popular for its consistency and easy, casual atmosphere rather than any single standout dish — a comfortable, low-key dinner option in a town with a fairly small dining scene." },
      { name: "Bamboo Train Restaurant", note: "Reliable local Khmer cooking in Sen Monorom.", image: "/item-images/welcome-to-bamboo-cafemondulkiri.jpg" },
    ],
    sleep: [
      { name: "Pida Coffee Farm Lodge", note: "Mountain-view rooms on a working coffee farm.", image: "/item-images/pida.jpg",  longDescription: "Nature Lodge was Sen Monorom's original eco resort, with wooden bungalows spread across 7 hectares of green hillside overlooking the surrounding forest. It leans rustic rather than luxurious, putting the focus squarely on the views, the cool mountain air, and easy access to the treks and waterfalls that draw most people to Mondulkiri in the first place." },
      { name: "Nature Lodge", note: "Sen Monorom's original eco resort — bungalows set on 7 hectares of green hillside.", image: "/item-images/nature-lodge.jpg" },

    ],
  },
];
export const comingSoonProvinces = [
  {
    id: "kampong-cham",
    name: "Kompong Chanm",
    tagline: "Mekong riverside crossroads",
    region: "Central",
    image: "provinces-images/kampong-cham.jpg",
    comingSoon: true,
  },
  {
    id: "kep",
    name: "Kep",
    tagline: "Cambodia's small coastal town",
    region: "Coastal",
    image: "/provinces-images/kep.jpg",
    comingSoon: true,
  },
  {
    id: "banteay-meanchey",
    name: "Banteay Meanchey",
    tagline: "Border gateway with ancient temple ruins",
    region: "Northeast",
    image: "/provinces-images/banteaymeanchey.jpg",
    comingSoon: true,
  },
  {
    id: "kampong-chhnang",
    name: "Kampong Chhnang",
    tagline: "Pottery villages on the Tonle sap",
    region: "Central",
    image: "/provinces-images/kampongchhang.jpg",
    comingSoon: true,
  },
  {
    id: "kampong-speu",
    name: "Kampong Speu",
    tagline: "Plam sugar country below the Cardamoms",
    region: "Central",
    image: "/provinces-images/kampongspeu.jpg",
    comingSoon: true,
  },
  {
    id: "kampong-thom",
    name: "Kampong Thom",
    tagline: "Pre-Angkorian temples of Sambor Prei Kuk",
    region: "Central",
    image: "/provinces-images/kampongthom.jpg",
    comingSoon: true,
  },
  {
    id: "kandal",
    name: "Kandal",
    tagline: "Rice paddies ringing the capital",
    region: "Central",
    image: "/provinces-images/kandal.jpg",
    comingSoon: true,
  },
  {
    id: "koh-kong",
    name: "Koh Kong",
    tagline: "Rainforest coastline and hidden islands",
    region: "Coastal",
    image: "/provinces-images/kohkong.jpg",
    comingSoon: true,
  },
  {
    id: "kratie",
    name: "Kratié",
    tagline: "Mekong home of the Irrawaddy dolphins",
    region: "Northeast",
    image: "/provinces-images/kratie.jpg",
    comingSoon: true,
  },
  {
    id: "oddar-meanchey",
    name: "Oddar Meanchey",
    tagline: "Remote northern borderlands",
    region: "North",
    image: "/provinces-images/oddarmeanchey.jpg",
    comingSoon: true,
  },
  {
    id: "pailin",
    name: "Pailin",
    tagline: "Gem-mining hills near the Thai border",
    region: "Northwest",
    image: "/provinces-images/pailin.jpg",
    comingSoon: true,
  },
  {
    id: "preah-vihear",
    name: "Preah Vihear",
    tagline: "Clifftop temple above the plains",
    region: "North",
    image: "/provinces-images/preahvihear.jpg",
    comingSoon: true,
  },
  {
    id: "prey-veng",
    name: "Prey Veng",
    tagline: "Quiet farmland along the Mekong delta",
    region: "Southeast",
    image: "/provinces-images/preyveng.jpg",
    comingSoon: true,
  },
  {
    id: "pursat",
    name: "Pursat",
    tagline: "Marble carving town by the lake",
    region: "West",
    image: "/provinces-images/pursat.jpg",
    comingSoon: true,
  },
  {
    id: "ratanakiri",
    name: "Ratanakiri",
    tagline: "Volcanic lakes and highland jungle",
    region: "Northeast",
    image: "/provinces-images/ratanakiri.jpg",
    comingSoon: true,
  },
  {
    id: "stung-treng",
    name: "Stung Treng",
    tagline: "Mekong river town near the Laos border",
    region: "Northeast",
    image: "/provinces-images/stungtreng.jpg",
    comingSoon: true,
  },
  {
    id: "svay-rieng",
    name: "Svay Rieng",
    tagline: "Flat farmland on the Vietnam border",
    region: "Southeast",
    image: "/provinces-images/svayrieng.jpg",
    comingSoon: true,
  },
  {
    id: "takeo",
    name: "Takéo",
    tagline: "Cradle of pre-Angkorian civilization",
    region: "South",
    image: "/provinces-images/takeo.jpg",
    comingSoon: true,
  },
  {
    id: "tboung-khmum",
    name: "Tboung Khmum",
    tagline: "Rubber plantations of the east",
    region: "East",
    image: "/provinces-images/tboungkhmum.jpg",
    comingSoon: true,
  },
];

export const getProvinceById = (id) => provinces.find((p) => p.id === id) || comingSoonProvinces.find((p) => p.id === id);
