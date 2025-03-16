import {
  blackImg,
  blueImg,
  MercedesVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
  BMWVideo,
} from "../Utils/index";

export const manufacturers = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroen",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MINI",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Ram",
    "Rolls-Royce",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];
  
  export const yearsOfProduction = [
    { title: "Year", value: "" },
    { title: "2015", value: "2015" },
    { title: "2016", value: "2016" },
    { title: "2017", value: "2017" },
    { title: "2018", value: "2018" },
    { title: "2019", value: "2019" },
    { title: "2020", value: "2020" },
    { title: "2021", value: "2021" },
    { title: "2022", value: "2022" },
    { title: "2023", value: "2023" },
  ];

  export const Products = [
    { index: 1 ,title: 'Mercedes-Benz', value: 'Mercedes-Benz', image: './Mercedes-Benz.png' , link:'/Mercedes'},
    { index: 2 ,title: 'BMW', value: 'BMW', image: './BWM.png' },
    { index: 3 ,title: 'Audi', value: 'Audi', image: './Audi.png' },
    { index: 4 ,title: 'Rolles-Royes', value: 'Rolles-Royes', image: './rolls royce.png' },
    { index: 5 ,title: 'Mercedes-Benz', value: 'Mercedes-Benz', image: './Mercedes-Benz.png' },
    { index: 6 ,title: 'BMW', value: 'BMW', image: './BWM.png' },
    { index: 7 ,title: 'Audi', value: 'Audi', image: './Audi.png' },
    { index: 8 ,title: 'Rolles-Royes', value: 'Rolles-Royes', image: './rolls royce.png' },
    { index: 9 ,title: 'Mercedes-Benz', value: 'Mercedes-Benz', image: './Mercedes-Benz.png' },
    { index: 10 ,title: 'BMW', value: 'BMW', image: './BWM.png' },
    { index: 11 ,title: 'Audi', value: 'Audi', image: './Audi.png' },
    { index: 12 ,title: 'Rolles-Royes', value: 'Rolles-Royes', image: './rolls royce.png' },
  ]
  
  export const fuels = [
    {
      title: "Fuel",
      value: "",
    },
    {
      title: "Gas",
      value: "Gas",
    },
    {
      title: "Electricity",
      value: "Electricity",
    },
  ];
  
  export const footerLinks = [
    {
      title: "About",
      links: [
        { title: "How it works", url: "/" },
        { title: "Featured", url: "/" },
        { title: "Partnership", url: "/" },
        { title: "Bussiness Relation", url: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "Events", url: "/" },
        { title: "Blog", url: "/" },
        { title: "Podcast", url: "/" },
        { title: "Invite a friend", url: "/" },
      ],
    },
    {
      title: "Socials",
      links: [
        { title: "Discord", url: "/" },
        { title: "Instagram", url: "/" },
        { title: "Twitter", url: "/" },
        { title: "Facebook", url: "/" },
      ],
    },
  ];

  export const navLists = [
    { id: 1, text: "Home", link: "/ShowCars" },
    { id: 2, text: "Services", link: "/services" },
    { id: 3, text: "Product", link: "/Product" },
    { id: 4, text: "AboutUS", link: "/about-us" }
  ];

  export const navlists_mercedes = [
          { id: 1, text: "Art & Culture", link: "/" },
      { id: 2, text: "Sustainability", link: "/" },
      { id: 3, text: "Design", link: "/" },
      { id: 4, text: "Innvoation", link: "/" },
      { id: 5, text: "Exclusive", link: "/" },
      { id: 6, text: "Vehicles", link: "/" },
  ]

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Mercedes Maybach",
      "GLS 600",
      "Is Here !!",
    ],
    video: MercedesVideo,
    videoDuration: 61.8,
  },
  {
    id: 2,
    textLists: [
      "BMW Alpina", 
      "XB7 ",
      "Is Here !!",
    ],
    video: BMWVideo,
    videoDuration: 91.2,
  },
  {
    id: 3,
    textLists: [
      "Toyota Supra",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const models = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: blueImg,
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: whiteImg,
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: blackImg,
  },
];

export const sizes = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];
