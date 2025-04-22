const companies = [
    {
      id: 1,
      companyName: "Talent ID",
      logo: "/assets/talent-id.png",
      address: "Mumbai, Maharashtra, India",
      website: "https://www.talentid.com",
      about: "Talent ID provides innovative recruitment and talent management solutions, helping companies identify and hire top talent efficiently.",
      contactPhone: "+91-22-1234-5678",
      contactEmail: "contact@talentid.com",
      rating: 4.2
    },
    {
      id: 2,
      companyName: "Safaai.org",
      logo: "/assets/safaai-org.png",
      address: "Delhi, India",
      website: "https://www.safaai.org",
      about: "Safaai.org is a non-profit focused on sustainable waste management and environmental conservation, promoting clean cities across India.",
      contactPhone: "+91-11-9876-5432",
      contactEmail: "info@safaai.org",
      rating: 4.5
    },
    {
      id: 3,
      companyName: "Devsed",
      logo: "/assets/devsed.png",
      address: "Bangalore, Karnataka, India",
      website: "https://www.devsed.com",
      about: "Devsed offers cutting-edge software development and IT consulting services, specializing in web and mobile applications.",
      contactPhone: "+91-80-5555-6666",
      contactEmail: "support@devsed.com",
      rating: 4.0
    },
    {
      id: 4,
      companyName: "Leeza.app",
      logo: "/assets/leeza-app.png",
      address: "Hyderabad, Telangana, India",
      website: "https://www.leeza.app",
      about: "Leeza.app is a platform for personalized learning and skill development, offering AI-driven courses and career guidance.",
      contactPhone: "+91-40-7777-8888",
      contactEmail: "hello@leeza.app",
      rating: 4.3
    },
    {
      id: 5,
      companyName: "Diet",
      logo: "/assets/diet.png",
      address: "Chennai, Tamil Nadu, India",
      website: "https://www.diet.health",
      about: "Diet is a health-tech startup providing personalized nutrition plans and wellness coaching to promote healthy lifestyles.",
      contactPhone: "+91-44-2222-3333",
      contactEmail: "care@diet.health",
      rating: 4.1
    },
    {
      id: 6,
      companyName: "CMO Ltd",
      logo: "/assets/cmo-ltd.png",
      address: "London, United Kingdom",
      website: "https://www.cmoltd.com",
      about: "CMO Ltd specializes in marketing and brand strategy, helping businesses grow through innovative campaigns and digital solutions.",
      contactPhone: "+44-20-1234-5678",
      contactEmail: "info@cmoltd.com",
      rating: 4.4
    },
    {
      id: 7,
      companyName: "University",
      logo: "/assets/university.png",
      address: "Unknown Location",
      website: "#",
      about: "Represents an academic institution offering education and research programs. Specific details not provided.",
      contactPhone: "N/A",
      contactEmail: "N/A",
      rating: 4.0
    },
    {
      id: 8,
      companyName: "BuildWise Construction",
      logo: "/assets/buildwise.png",
      address: "Mumbai, Maharashtra, India",
      website: "https://www.buildwiseconstruction.com",
      about: "BuildWise Construction delivers high-quality residential and commercial construction projects with a focus on sustainability.",
      contactPhone: "+91-22-4444-5555",
      contactEmail: "contact@buildwiseconstruction.com",
      rating: 4.3
    },
    {
      id: 9,
      companyName: "TalentId",
      logo: "/assets/talentid.png",
      address: "Pune, Maharashtra, India",
      website: "https://www.talentid.io",
      about: "TalentId is a recruitment platform connecting employers with skilled professionals, offering AI-driven candidate matching.",
      contactPhone: "+91-20-6666-7777",
      contactEmail: "support@talentid.io",
      rating: 4.2
    },
    {
      id: 10,
      companyName: "No",
      logo: "/assets/no.png",
      address: "Unknown Location",
      website: "#",
      about: "No specific company details available. This is a placeholder entry.",
      contactPhone: "N/A",
      contactEmail: "N/A",
      rating: 3.0
    },
    {
      id: 11,
      companyName: "Sify Technologies",
      logo: "/assets/sify.png",
      address: "Chennai, Tamil Nadu, India",
      website: "https://www.sifytechnologies.com",
      about: "Sify Technologies is a leading ICT service provider, offering cloud, data center, and digital transformation solutions.",
      contactPhone: "+91-44-2254-0700",
      contactEmail: "info@sifytechnologies.com",
      rating: 4.5
    },
    {
      id: 12,
      companyName: "Xtrawrkx",
      logo: "/assets/xtrawrkx.png",
      address: "Bangalore, Karnataka, India",
      website: "https://www.xtrawrkx.com",
      about: "Xtrawrkx provides workforce management and HR tech solutions, streamlining hiring and employee engagement.",
      contactPhone: "+91-80-8888-9999",
      contactEmail: "contact@xtrawrkx.com",
      rating: 4.1
    },
    {
      id: 13,
      companyName: "Cognizant",
      logo: "/assets/cognizant.png",
      address: "Teaneck, New Jersey, USA",
      website: "https://www.cognizant.com",
      about: "Cognizant is a global IT services company, delivering digital transformation, consulting, and business process outsourcing.",
      contactPhone: "+1-201-801-0233",
      contactEmail: "inquiry@cognizant.com",
      rating: 4.6
    },
    {
      id: 14,
      companyName: "Gamology",
      logo: "/assets/gamology.png",
      address: "Mumbai, Maharashtra, India",
      website: "https://www.gamology.com",
      about: "Gamology develops interactive gaming platforms and gamified learning solutions for education and entertainment.",
      contactPhone: "+91-22-7777-8888",
      contactEmail: "support@gamology.com",
      rating: 4.2
    },
    {
      id: 15,
      companyName: "Fotos",
      logo: "/assets/fotos.png",
      address: "Delhi, India",
      website: "https://www.fotos.app",
      about: "Fotos is a photography and image-sharing platform, offering tools for professional and amateur photographers.",
      contactPhone: "+91-11-6666-7777",
      contactEmail: "hello@fotos.app",
      rating: 4.0
    },
    {
      id: 16,
      companyName: "Remp",
      logo: "/assets/remp.png",
      address: "Hyderabad, Telangana, India",
      website: "https://www.remp.io",
      about: "Remp provides remote work solutions, including virtual collaboration tools and employee engagement platforms.",
      contactPhone: "+91-40-5555-6666",
      contactEmail: "info@remp.io",
      rating: 4.3
    },
    {
      id: 17,
      companyName: "Sequel HR",
      logo: "/assets/sequel-hr.png",
      address: "Pune, Maharashtra, India",
      website: "https://www.sequelhr.com",
      about: "Sequel HR offers comprehensive HR services, including payroll, compliance, and talent acquisition support.",
      contactPhone: "+91-20-4444-5555",
      contactEmail: "contact@sequelhr.com",
      rating: 4.4
    },
    {
      id: 18,
      companyName: "HIREXZO SOLUTIONS LLP",
      logo: "/assets/hirexzo.png",
      address: "Noida, Uttar Pradesh, India",
      website: "https://www.hirexzo.com",
      about: "HIREXZO SOLUTIONS LLP specializes in IT staffing and recruitment, connecting businesses with skilled tech professionals.",
      contactPhone: "+91-120-3333-4444",
      contactEmail: "careers@hirexzo.com",
      rating: 4.2
    },
    {
      id: 19,
      companyName: "Ultrafly Solutions",
      logo: "/assets/ultrafly.png",
      address: "Coimbatore, Tamil Nadu, India",
      website: "https://www.ultraflysolutions.com",
      about: "Ultrafly Solutions provides software development, cloud computing, and digital marketing services.",
      contactPhone: "+91-422-2222-3333",
      contactEmail: "support@ultraflysolutions.com",
      rating: 4.1
    }
  ];
  
  export default companies;