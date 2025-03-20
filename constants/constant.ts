import {
  blackImg,
  blueImg,
  MercedesVideo,
  highlightFourthVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
  BMWVideo,
} from "../Utils";

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
    { id: 1, text: "Vehicles", link: "/vehicles" },
    { id: 2, text: "Services", link: "/services" },
    { id: 3, text: "Product", link: "/Product" },
    { id: 4, text: "AboutUS", link: "/aboutus" }
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

export const services = [
    {
        id: 1,
        title: "Car Rental",
        description: "Find the perfect car for your needs with our extensive fleet. From economy to luxury, we have options for every budget and occasion.",
        icon: "car"
    },
    {
        id: 2,
        title: "Car Maintenance",
        description: "Keep your vehicle in top condition with our professional maintenance services. Our certified technicians ensure your car runs smoothly.",
        icon: "wrench"
    },
    {
        id: 3,
        title: "Car Insurance",
        description: "Comprehensive coverage options to protect your vehicle and give you peace of mind on the road. Get personalized quotes today.",
        icon: "shield"
    },
    {
        id: 4,
        title: "Car Detailing",
        description: "Professional detailing services to keep your car looking new. Interior and exterior packages available for all vehicle types.",
        icon: "sprayCan"
    },
    {
        id: 5,
        title: "Road Assistance",
        description: "24/7 emergency assistance when you need it most. Our team is always ready to help with breakdowns, flat tires, and more.",
        icon: "phone"
    },
    {
        id: 6,
        title: "Car Customization",
        description: "Transform your vehicle with our customization services. From performance upgrades to aesthetic modifications, we do it all.",
        icon: "paintBucket"
    }
];

export const teamMembers = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO & Founder",
        bio: "Sarah founded CarHub with a vision to revolutionize the automotive industry through technology and customer-centric services.",
        image: "/team/sarah.jpg"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        role: "Chief Operations Officer",
        bio: "With over 15 years in the automotive industry, Michael ensures our operations run smoothly and efficiently.",
        image: "/team/michael.jpg"
    },
    {
        id: 3,
        name: "David Chen",
        role: "Chief Technology Officer",
        bio: "David leads our tech initiatives, developing innovative solutions that keep CarHub at the forefront of the industry.",
        image: "/team/david.jpg"
    },
    {
        id: 4,
        name: "Amara Wilson",
        role: "Customer Experience Director",
        bio: "Amara is dedicated to creating exceptional experiences for every customer who interacts with CarHub.",
        image: "/team/amara.jpg"
    }
];

export const companyHistory = [
    {
        year: "2015",
        milestone: "CarHub Founded",
        description: "CarHub was established with a mission to simplify car rental and automotive services."
    },
    {
        year: "2017",
        milestone: "Expanded Services",
        description: "Added maintenance, insurance, and roadside assistance to our service offerings."
    },
    {
        year: "2019",
        milestone: "National Expansion",
        description: "Opened locations in 12 major cities across the country to better serve our growing customer base."
    },
    {
        year: "2021",
        milestone: "Digital Transformation",
        description: "Launched our mobile app and online platform for seamless service booking and car rentals."
    },
    {
        year: "2023",
        milestone: "Industry Recognition",
        description: "Received the prestigious Automotive Excellence Award for our innovative customer service approach."
    }
];