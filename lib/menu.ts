export type MenuItem = {
  id: string;
  name: string;
  category: "Starters" | "Mains" | "Salads" | "Desserts" | "Drinks";
  price: number;
  desc: string;
  emoji: string;
  tags?: string[];
};

export const menu: MenuItem[] = [
  { id: "m1", name: "Hummus Trio", category: "Starters", price: 2.5, desc: "Classic, roasted red pepper & spicy harissa hummus with warm bread.", emoji: "🫓", tags: ["vegetarian", "vegan"] },
  { id: "m2", name: "Grilled Halloumi", category: "Starters", price: 3.0, desc: "Char-grilled halloumi with date molasses and toasted pine nuts.", emoji: "🧀", tags: ["vegetarian"] },
  { id: "m3", name: "Falafel Wrap", category: "Starters", price: 2.25, desc: "Crispy herb falafel, pickles and tahini in fresh saj bread.", emoji: "🌯", tags: ["vegetarian", "vegan"] },
  { id: "m4", name: "Lamb Kofta Skewers", category: "Mains", price: 5.5, desc: "Charcoal-grilled spiced lamb kofta with garlic toum.", emoji: "🍢" },
  { id: "m5", name: "Chicken Shawarma Plate", category: "Mains", price: 4.75, desc: "Marinated chicken shawarma, saffron rice, garlic sauce.", emoji: "🍗" },
  { id: "m6", name: "Mixed Grill Platter", category: "Mains", price: 8.9, desc: "Kofta, chicken skewers and lamb chops with rice and grilled vegetables.", emoji: "🍖" },
  { id: "m7", name: "Fattoush Salad", category: "Salads", price: 2.8, desc: "Crisp greens, radish, pomegranate molasses and toasted bread.", emoji: "🥗", tags: ["vegetarian", "vegan"] },
  { id: "m8", name: "Tabbouleh", category: "Salads", price: 2.5, desc: "Fine bulgur, parsley, mint, tomato and lemon.", emoji: "🥬", tags: ["vegetarian", "vegan"] },
  { id: "m9", name: "Baklava", category: "Desserts", price: 2.0, desc: "Layered filo pastry, pistachio and honey syrup.", emoji: "🍯", tags: ["vegetarian"] },
  { id: "m10", name: "Kunafa", category: "Desserts", price: 2.5, desc: "Warm sweet cheese pastry with crisp shredded filo.", emoji: "🧁", tags: ["vegetarian"] },
  { id: "m11", name: "Mint Lemonade", category: "Drinks", price: 1.5, desc: "Fresh lemon, mint and a touch of rose water.", emoji: "🍋", tags: ["vegan"] },
  { id: "m12", name: "Karak Tea", category: "Drinks", price: 1.0, desc: "Spiced milk tea, slow-brewed the Gulf way.", emoji: "☕", tags: ["vegetarian"] },
];

export const categories = ["Starters", "Mains", "Salads", "Desserts", "Drinks"] as const;

export const restaurantInfo = {
  name: "Marmar Kitchen",
  tagline: "Modern Levantine & Mediterranean, made fresh daily.",
  cuisine: "Modern Levantine & Mediterranean",
  address: "Arabian Gulf St, Sharq, Kuwait City",
  phone: "+965 2299 5678",
  whatsapp: "96522995678",
  email: "hello@marmarkitchen.kw",
  hours: [
    { day: "Saturday – Wednesday", time: "12:00 PM – 11:00 PM" },
    { day: "Thursday – Friday", time: "12:00 PM – 12:30 AM" },
  ],
};
