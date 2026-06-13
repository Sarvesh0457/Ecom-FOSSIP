export const mockOrders = [
  {
    _id: "ord_1",
    orderNumber: "ORD-2026-1001",
    customer: {
      name: "Marcus Aurelius",
      email: "marcus.aurelius@stoic.com"
    },
    items: [
      { productId: "prod_1", name: "Classic Denim Jacket", price: 79.99, quantity: 1, size: "L", color: "Classic Blue" },
      { productId: "prod_7", name: "Striped Cotton T-Shirt", price: 14.99, quantity: 2, size: "M", color: "White/Blue" }
    ],
    totalAmount: 109.97,
    status: "Delivered",
    createdAt: "2026-05-10T14:30:00Z",
    shippingAddress: "128 Stoic Way, Rome, Italy, 00100"
  },
  {
    _id: "ord_2",
    orderNumber: "ORD-2026-1002",
    customer: {
      name: "Ada Lovelace",
      email: "ada.lovelace@analytical.org"
    },
    items: [
      { productId: "prod_3", name: "Air Max Sneakers", price: 119.99, quantity: 1, size: "8", color: "Black/White" }
    ],
    totalAmount: 119.99,
    status: "Shipped",
    createdAt: "2026-06-08T09:15:00Z",
    shippingAddress: "42 Babbage Ave, London, UK, SW1A 1AA"
  },
  {
    _id: "ord_3",
    orderNumber: "ORD-2026-1003",
    customer: {
      name: "Alan Turing",
      email: "alan.turing@enigma.net"
    },
    items: [
      { productId: "prod_10", name: "Premium Oxford Shirt", price: 59.99, quantity: 2, size: "L", color: "Classic White" },
      { productId: "prod_26", name: "Casual Leather Belt", price: 29.99, quantity: 1, size: "34", color: "Brown" }
    ],
    totalAmount: 149.97,
    status: "Placed",
    createdAt: "2026-06-10T11:00:00Z",
    shippingAddress: "8 Bletchley Park, Milton Keynes, UK, MK3 6EB"
  },
  {
    _id: "ord_4",
    orderNumber: "ORD-2026-1004",
    customer: {
      name: "Marie Curie",
      email: "marie.curie@polonium.univ"
    },
    items: [
      { productId: "prod_6", name: "Leather Crossbody Bag", price: 399.99, quantity: 1, size: "One Size", color: "Tan Leather" }
    ],
    totalAmount: 399.99,
    status: "Delivered",
    createdAt: "2026-05-18T16:20:00Z",
    shippingAddress: "15 Radium Street, Paris, France, 75005"
  },
  {
    _id: "ord_5",
    orderNumber: "ORD-2026-1005",
    customer: {
      name: "Nikola Tesla",
      email: "nikola.tesla@alternating.io"
    },
    items: [
      { productId: "prod_5", name: "Oversized Cotton Hoodie", price: 69.99, quantity: 1, size: "XL", color: "Heather Grey" },
      { productId: "prod_24", name: "Sport Knit Beanie", price: 19.99, quantity: 1, size: "One Size", color: "Heather Charcoal" }
    ],
    totalAmount: 89.98,
    status: "Packed",
    createdAt: "2026-06-09T17:40:00Z",
    shippingAddress: "272 Wardenclyffe Road, Shoreham, NY, 11786"
  },
  {
    _id: "ord_6",
    orderNumber: "ORD-2026-1006",
    customer: {
      name: "Albert Einstein",
      email: "albert.einstein@relativity.edu"
    },
    items: [
      { productId: "prod_29", name: "Chunky Knit Wool Socks", price: 9.99, quantity: 3, size: "L", color: "Oatmeal Fleck" }
    ],
    totalAmount: 29.97,
    status: "Out For Delivery",
    createdAt: "2026-06-09T08:00:00Z",
    shippingAddress: "112 Mercer Street, Princeton, NJ, 08540"
  },
  {
    _id: "ord_7",
    orderNumber: "ORD-2026-1007",
    customer: {
      name: "Grace Hopper",
      email: "grace.hopper@nanoseconds.mil"
    },
    items: [
      { productId: "prod_13", name: "Classic Wool Trench Coat", price: 149.99, quantity: 1, size: "M", color: "Camel" },
      { productId: "prod_15", name: "Retro Leather Watch", price: 249.99, quantity: 1, size: "One Size", color: "Tan/Gold" }
    ],
    totalAmount: 399.98,
    status: "Delivered",
    createdAt: "2026-05-22T10:10:00Z",
    shippingAddress: "100 Arlington Blvd, Arlington, VA, 22201"
  },
  {
    _id: "ord_8",
    orderNumber: "ORD-2026-1008",
    customer: {
      name: "Leonardo da Vinci",
      email: "leonardo.vinci@renaissance.art"
    },
    items: [
      { productId: "prod_9", name: "Classic Silk Scarf", price: 150.00, quantity: 1, size: "One Size", color: "Royal Pattern" },
      { productId: "prod_21", name: "Lace Wrap Cocktail Dress", price: 89.99, quantity: 1, size: "M", color: "Midnight Black" }
    ],
    totalAmount: 239.99,
    status: "Cancelled",
    createdAt: "2026-05-01T11:20:00Z",
    shippingAddress: "32 Arno Valley Road, Florence, Italy, 50100"
  },
  {
    _id: "ord_9",
    orderNumber: "ORD-2026-1009",
    customer: {
      name: "Isaac Newton",
      email: "isaac.newton@gravity.uk"
    },
    items: [
      { productId: "prod_23", name: "Leather Chelsea Boots", price: 95.00, quantity: 1, size: "10", color: "Tan Suede" }
    ],
    totalAmount: 95.00,
    status: "Delivered",
    createdAt: "2026-05-15T13:40:00Z",
    shippingAddress: "Woolsthorpe Manor, Grantham, UK, NG33 5PD"
  },
  {
    _id: "ord_10",
    orderNumber: "ORD-2026-1010",
    customer: {
      name: "Jane Austen",
      email: "jane.austen@pride.org"
    },
    items: [
      { productId: "prod_14", name: "Summer Sun Dress", price: 19.99, quantity: 2, size: "S", color: "Daisy White" },
      { productId: "prod_17", name: "Polarized Aviator Sunglasses", price: 19.99, quantity: 1, size: "One Size", color: "Gold/Brown" }
    ],
    totalAmount: 59.97,
    status: "Delivered",
    createdAt: "2026-05-25T14:50:00Z",
    shippingAddress: "4 Chawton House Road, Hampshire, UK, GU34 1SD"
  },
  {
    _id: "ord_11",
    orderNumber: "ORD-2026-1011",
    customer: {
      name: "Cleopatra Philopator",
      email: "cleo@alexandria.gov"
    },
    items: [
      { productId: "prod_6", name: "Leather Crossbody Bag", price: 399.99, quantity: 2, size: "One Size", color: "Ebony Black" }
    ],
    totalAmount: 799.98,
    status: "Shipped",
    createdAt: "2026-06-07T12:00:00Z",
    shippingAddress: "1 Palace Gardens, Alexandria, Egypt, 11511"
  },
  {
    _id: "ord_12",
    orderNumber: "ORD-2026-1012",
    customer: {
      name: "Charles Darwin",
      email: "charles.darwin@beagle.org"
    },
    items: [
      { productId: "prod_2", name: "Slim Fit Chino Pants", price: 49.99, quantity: 1, size: "32", color: "Olive Green" },
      { productId: "prod_25", name: "Relaxed Fit Linen Shirt", price: 29.99, quantity: 1, size: "M", color: "Sand Linen" }
    ],
    totalAmount: 79.98,
    status: "Delivered",
    createdAt: "2026-05-29T10:30:00Z",
    shippingAddress: "Down House, Downe, Kent, UK, BR6 7JT"
  },
  {
    _id: "ord_13",
    orderNumber: "ORD-2026-1013",
    customer: {
      name: "Steve Jobs",
      email: "steve@apple.com"
    },
    items: [
      { productId: "prod_11", name: "High Waist Skinny Jeans", price: 69.99, quantity: 3, size: "32", color: "Solid Black" },
      { productId: "prod_5", name: "Oversized Cotton Hoodie", price: 69.99, quantity: 1, size: "M", color: "Heather Grey" }
    ],
    totalAmount: 279.96,
    status: "Delivered",
    createdAt: "2026-05-30T15:20:00Z",
    shippingAddress: "2066 Crist Drive, Los Altos, CA, 94024"
  },
  {
    _id: "ord_14",
    orderNumber: "ORD-2026-1014",
    customer: {
      name: "Bill Gates",
      email: "billg@microsoft.com"
    },
    items: [
      { productId: "prod_10", name: "Premium Oxford Shirt", price: 59.99, quantity: 5, size: "M", color: "Sky Blue" }
    ],
    totalAmount: 299.95,
    status: "Placed",
    createdAt: "2026-06-10T13:45:00Z",
    shippingAddress: "1835 73rd Ave NE, Medina, WA, 98039"
  },
  {
    _id: "ord_15",
    orderNumber: "ORD-2026-1015",
    customer: {
      name: "Galileo Galilei",
      email: "galileo@telescope.org"
    },
    items: [
      { productId: "prod_15", name: "Retro Leather Watch", price: 249.99, quantity: 1, size: "One Size", color: "Black/Silver" }
    ],
    totalAmount: 249.99,
    status: "Packed",
    createdAt: "2026-06-09T11:15:00Z",
    shippingAddress: "15 Star Gazer Rd, Pisa, Italy, 56100"
  },
  {
    _id: "ord_16",
    orderNumber: "ORD-2026-1016",
    customer: {
      name: "Helen Keller",
      email: "helen@optimism.org"
    },
    items: [
      { productId: "prod_12", name: "Summer Knit Cardigan", price: 24.99, quantity: 1, size: "S", color: "Cream White" },
      { productId: "prod_29", name: "Chunky Knit Wool Socks", price: 9.99, quantity: 2, size: "M", color: "Oatmeal Fleck" }
    ],
    totalAmount: 44.97,
    status: "Delivered",
    createdAt: "2026-06-01T10:00:00Z",
    shippingAddress: "12 Tuscumbia Lane, Westport, CT, 06880"
  },
  {
    _id: "ord_17",
    orderNumber: "ORD-2026-1017",
    customer: {
      name: "Rosa Parks",
      email: "rosa@equality.org"
    },
    items: [
      { productId: "prod_1", name: "Classic Denim Jacket", price: 79.99, quantity: 1, size: "S", color: "Dark Indigo" },
      { productId: "prod_11", name: "High Waist Skinny Jeans", price: 69.99, quantity: 1, size: "28", color: "Light Wash" }
    ],
    totalAmount: 149.98,
    status: "Delivered",
    createdAt: "2026-06-03T16:00:00Z",
    shippingAddress: "972 Cleveland Ave, Montgomery, AL, 36104"
  },
  {
    _id: "ord_18",
    orderNumber: "ORD-2026-1018",
    customer: {
      name: "Florence Nightingale",
      email: "florence@lamp.org"
    },
    items: [
      { productId: "prod_4", name: "Floral Print Midi Dress", price: 29.99, quantity: 1, size: "M", color: "Floral Pink" }
    ],
    totalAmount: 29.99,
    status: "Delivered",
    createdAt: "2026-06-04T09:45:00Z",
    shippingAddress: "10 South Street, London, UK, W1K 1DF"
  },
  {
    _id: "ord_19",
    orderNumber: "ORD-2026-1019",
    customer: {
      name: "Alexander the Great",
      email: "alexander@macedon.gov"
    },
    items: [
      { productId: "prod_30", name: "Classic High-Top Sneakers", price: 95.00, quantity: 2, size: "11", color: "Navy/White" },
      { productId: "prod_28", name: "Ultralight Puffer Vest", price: 64.99, quantity: 1, size: "L", color: "Olive Drab" }
    ],
    totalAmount: 254.99,
    status: "Shipped",
    createdAt: "2026-06-08T14:30:00Z",
    shippingAddress: "Empire Palace Road, Babylon, Iraq, 99901"
  },
  {
    _id: "ord_20",
    orderNumber: "ORD-2026-1020",
    customer: {
      name: "Napoleon Bonaparte",
      email: "napoleon@waterloo.fr"
    },
    items: [
      { productId: "prod_13", name: "Classic Wool Trench Coat", price: 149.99, quantity: 1, size: "S", color: "Charcoal Black" }
    ],
    totalAmount: 149.99,
    status: "Cancelled",
    createdAt: "2026-05-12T15:20:00Z",
    shippingAddress: "5 Elba Lane, Longwood House, St Helena, SH"
  },
  {
    _id: "ord_21",
    orderNumber: "ORD-2026-1021",
    customer: {
      name: "Nelson Mandela",
      email: "nelson@madiba.za"
    },
    items: [
      { productId: "prod_25", name: "Relaxed Fit Linen Shirt", price: 29.99, quantity: 3, size: "L", color: "Mint Green" }
    ],
    totalAmount: 89.97,
    status: "Delivered",
    createdAt: "2026-06-05T12:00:00Z",
    shippingAddress: "8115 Orlando West, Soweto, South Africa, 1804"
  },
  {
    _id: "ord_22",
    orderNumber: "ORD-2026-1022",
    customer: {
      name: "Winston Churchill",
      email: "winston@parliament.uk"
    },
    items: [
      { productId: "prod_9", name: "Classic Silk Scarf", price: 150.00, quantity: 1, size: "One Size", color: "Burgundy Pattern" },
      { productId: "prod_26", name: "Casual Leather Belt", price: 29.99, quantity: 1, size: "36", color: "Black" }
    ],
    totalAmount: 179.99,
    status: "Placed",
    createdAt: "2026-06-10T14:10:00Z",
    shippingAddress: "Chartwell House, Westerham, Kent, UK, TN16 1PS"
  },
  {
    _id: "ord_23",
    orderNumber: "ORD-2026-1023",
    customer: {
      name: "George Washington",
      email: "george@mountvernon.org"
    },
    items: [
      { productId: "prod_23", name: "Leather Chelsea Boots", price: 95.00, quantity: 1, size: "11", color: "Dark Chocolate Leather" }
    ],
    totalAmount: 95.00,
    status: "Delivered",
    createdAt: "2026-05-20T08:30:00Z",
    shippingAddress: "3200 Mount Vernon Hwy, Mt Vernon, VA, 22121"
  },
  {
    _id: "ord_24",
    orderNumber: "ORD-2026-1024",
    customer: {
      name: "Thomas Jefferson",
      email: "thomas@monticello.org"
    },
    items: [
      { productId: "prod_10", name: "Premium Oxford Shirt", price: 59.99, quantity: 2, size: "M", color: "Soft Pink" },
      { productId: "prod_2", name: "Slim Fit Chino Pants", price: 49.99, quantity: 2, size: "32", color: "Beige" }
    ],
    totalAmount: 219.96,
    status: "Delivered",
    createdAt: "2026-05-28T16:00:00Z",
    shippingAddress: "931 Thomas Jefferson Pkwy, Charlottesville, VA, 22902"
  },
  {
    _id: "ord_25",
    orderNumber: "ORD-2026-1025",
    customer: {
      name: "Marcus Aurelius",
      email: "marcus.aurelius@stoic.com"
    },
    items: [
      { productId: "prod_19", name: "Cozy Cashmere Sweater", price: 119.99, quantity: 1, size: "L", color: "Forest Green" }
    ],
    totalAmount: 119.99,
    status: "Out For Delivery",
    createdAt: "2026-06-09T14:45:00Z",
    shippingAddress: "128 Stoic Way, Rome, Italy, 00100"
  },
  {
    _id: "ord_26",
    orderNumber: "ORD-2026-1026",
    customer: {
      name: "Socrates",
      email: "socrates@dialogue.org"
    },
    items: [
      { productId: "prod_25", name: "Relaxed Fit Linen Shirt", price: 29.99, quantity: 2, size: "L", color: "Bleach White" }
    ],
    totalAmount: 59.98,
    status: "Placed",
    createdAt: "2026-06-10T10:15:00Z",
    shippingAddress: "4 Agora Square, Athens, Greece, 10555"
  },
  {
    _id: "ord_27",
    orderNumber: "ORD-2026-1027",
    customer: {
      name: "Plato",
      email: "plato@academy.org"
    },
    items: [
      { productId: "prod_17", name: "Polarized Aviator Sunglasses", price: 19.99, quantity: 1, size: "One Size", color: "Black/Dark Green" },
      { productId: "prod_24", name: "Sport Knit Beanie", price: 19.99, quantity: 1, size: "One Size", color: "Navy Blue" }
    ],
    totalAmount: 39.98,
    status: "Packed",
    createdAt: "2026-06-09T16:00:00Z",
    shippingAddress: "12 Academy Grove, Athens, Greece, 10442"
  },
  {
    _id: "ord_28",
    orderNumber: "ORD-2026-1028",
    customer: {
      name: "Aristotle",
      email: "aristotle@lyceum.org"
    },
    items: [
      { productId: "prod_8", name: "Runner Style Running Shoes", price: 79.99, quantity: 1, size: "9", color: "Electric Blue" },
      { productId: "prod_16", name: "Performance Gym Shorts", price: 35.00, quantity: 2, size: "M", color: "Obsidian Blue" }
    ],
    totalAmount: 149.99,
    status: "Delivered",
    createdAt: "2026-06-02T11:30:00Z",
    shippingAddress: "22 Lyceum Path, Athens, Greece, 10674"
  },
  {
    _id: "ord_29",
    orderNumber: "ORD-2026-1029",
    customer: {
      name: "Alexander Hamilton",
      email: "alexander@hamilton.treasury"
    },
    items: [
      { productId: "prod_15", name: "Retro Leather Watch", price: 249.99, quantity: 1, size: "One Size", color: "Tan/Gold" }
    ],
    totalAmount: 249.99,
    status: "Delivered",
    createdAt: "2026-05-24T09:00:00Z",
    shippingAddress: "57 Wall Street, New York, NY, 10005"
  },
  {
    _id: "ord_30",
    orderNumber: "ORD-2026-1030",
    customer: {
      name: "John Adams",
      email: "john@adams.presidency"
    },
    items: [
      { productId: "prod_10", name: "Premium Oxford Shirt", price: 59.99, quantity: 1, size: "L", color: "Classic White" }
    ],
    totalAmount: 59.99,
    status: "Placed",
    createdAt: "2026-06-10T14:20:00Z",
    shippingAddress: "1 Adams Farm Rd, Quincy, MA, 02169"
  }
];
