

// navbar data 

export const navbarData = [

    {

        title: 'Company',
        url: '/',

    },
    {

        title: 'Calculate Shipping Cost',
        url: '/shippingCost',

    },
    {

        title: 'Blogs',
        url: '/blogs',

    },
    {

        title: 'Contact Us',
        url: '/contactUs',

    },

]


// footer Data 

export const footerData = {

    company: ["Our Story", "Careers at AAJ", "Contact Us"],
    services: [
        "E Commerce Fulfillment",
        "Transport-AAJ Swift",
        "Returns Management",
        "Value Added Services",
    ],
    resources: ["Case Studies", "Blogs"],
    support: ["Track Your Order"],
    transportationNetwork: [
        "Transportation in Mumbai",
        "Transportation in Bangalore",
        "Transportation in Delhi",
        "Transportation in Hyderabad",
        "Transportation in Ghaziabad",
        "Transportation in Sonipat NCR",
    ],
};




// contact us data 

export const contactUsFormData = [
    {
        label: 'Name',
        name: "name",
        type: 'text',
        required: true,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
    },
    {
        label: 'Phone',
        type: 'text',
        name: 'phone',
        required: false,
    },
    {
        label: 'Contact Support',
        type: 'text',
        name: 'contactSupport',
        required: false,
    },
    {
        label: 'Message',
        type: 'textarea',
        name: 'message',
        required: true,
    },
];



export const contactUsHeroSectionData = [

    {

        image: "/images/contactUS/bus.png",
        text: "Get top-rated transporters at unbeatable price",

    },
    {

        image: "/images/contactUS/time-bus.png",
        text: "95% Guaranteed on-time Delivery",
    },
    {

        image: "/images/contactUS/location.png",
        text: "Live Shipment Tracking and timely updates",

    }

]


export const contactUsCompaniesLogo = [

    {

        image: "/images/contactUS/company-logo/netEducation.png",

    },

    {

        image: "/images/contactUS/company-logo/kaitan.png",

    },
    {

        image: "/images/contactUS/company-logo/talking.png",

    },
    {

        image: "/images/contactUS/company-logo/verde.png",


    },


    {

        image: "/images/contactUS/company-logo/synergy.png",

    },
    {

        image: "/images/contactUS/company-logo/tynor.png"

    },
    {

        image: "/images/contactUS/company-logo/fruitn.png",


    },

    {

        image: "/images/contactUS/company-logo/kaitan.png",

    },


]


// =========================================================================================================================

export const registorHeroSectionData = [

    {

        image: "/images/registor/bus.png",
        text: "Get top-rated transporters at unbeatable price",

    },
    {

        image: "/images/registor/time-bus.png",
        text: "95% Guaranteed on-time Delivery",
    },
    {

        image: "/images/registor/location.png",
        text: "Live Shipment Tracking and timely updates",

    }

]


export const registrationFormData = [
    { label: 'Email Id', name: 'email', type: 'email', required: true },
    { label: 'Mobile No.', name: 'mobile', type: 'tel', required: true },
    {
        label: 'Are you a business which needs GST invoice',
        name: 'isBusiness',
        type: 'radio',
        options: ['Yes', 'No'],
        required: true,
    },
    { label: 'Company Name', name: 'companyName', type: 'text', required: true },
    { label: 'Company Address', name: 'companyAddress', type: 'text', required: true },
    { label: 'State', name: 'state', type: 'text', required: true },
    { label: 'Pincode', name: 'pincode', type: 'text', required: true },
    { label: 'GST Number', name: 'gstNumber', type: 'text', required: false },
];

export const logisticsFeatures = [
    {
        title: "Pan-India PTL Transportation",
        description: "Guaranteed on-time delivery across 28,000+ pin codes with minimal ODA.",
        image: "/images/registor/logisticfeatures/multiple_location.png",
    },
    {
        title: "Wide Transporter Network",
        description: "Choose from 10+ transporters to ensure the best rates for your shipments.",
        image: "/images/registor/logisticfeatures/wide_network.png",
    },
    {
        title: "Money-Back Guarantee",
        description: "Promised on-time delivery with a money-back guarantee for delays.",
        image: "/images/registor/logisticfeatures/location_bus.png",
    },
    {
        title: "Real-Time Tracking",
        description: "Full visibility of all your shipments from pickup to delivery.",
        image: "/images/registor/logisticfeatures/real_time_tracking.png",
    },
    {
        title: "Digital POD Access",
        description: "Seamless access to PODs anytime, eliminating manual processes.",
        image: "/images/registor/logisticfeatures/safe.png",
    },
    {
        title: "In-Transit Insurance",
        description: "Optional insurance coverage to protect your goods during transit.",
        image: "/images/registor/logisticfeatures/headphone.png",
    },
    {
        title: "Fast Customer Support",
        description: "Reliable customer service to resolve queries and ensure smooth operations.",
        image: "/images/registor/logisticfeatures/singleLocation.png",
    },
    {
        title: "Access to TMS",
        description: "Get full access to our Transport Management System (TMS) to manage bookings, track shipments, and gain real-time visibility on a single platform.",
        image: "/images/registor/logisticfeatures/search-1.png",
    }
];


export const testimonialsData = [
    {
        text: `"It was a tough time when they started operation, considering restrictions on road entries, new customers and high expectations of dealers etc, was the big challenges to them. But, the team of AAJ enterprises has been focused on their duties since the 1st day."`,
        author: 'Jaspreet Singh',
        position: 'Senior Manager',
        company: 'Tynor Orthotics Pvt. Ltd.',
        logo: '/images/contactUS/company-logo/fruitn.png',
        image: 'jaspreet-image-url',
    },
    {
        text: `"AAJ and their employees were very attentive to our needs even during times of minimal notice. For protection of our sales during the relocation we set up parallel shipping operation with AAJ and we agreed upon project time lines. We were met both from operations."`,
        author: 'Glenn Cipani',
        position: 'VP Distribution',
        company: 'Pearson India Education Services Pvt. Ltd.',
        logo: '/images/contactUS/company-logo/tynor.png',
        image: 'g',
    },
    {
        text: `"We have processed more than a million units from Feb 2022, we joined operations from two locations and this was 4th year of operations. What is more satisfying is our outward units crossed close to 800,000 and achievement was budgeted 95%, for calendar month days."`,
        author: 'Third Author',
        position: 'Operations Head',
        company: 'Company XYZ',
        logo: 'xyz-logo-url',
        image: '/images/contactUS/company-logo/tynor.png',
    },
    {
        text: `"It was a tough time when they started operation, considering restrictions on road entries, new customers and high expectations of dealers etc, was the big challenges to them. But, the team of AAJ enterprises has been focused on their duties since the 1st day."`,
        author: 'Jaspreet Singh',
        position: 'Senior Manager',
        company: 'Tynor Orthotics Pvt. Ltd.',
        logo: '/images/contactUS/company-logo/tynor.png',
        image: 'jaspreet-image-url',
    },
    {
        text: `"AAJ and their employees were very attentive to our needs even during times of minimal notice. For protection of our sales during the relocation we set up parallel shipping operation with AAJ and we agreed upon project time lines. We were met both from operations."`,
        author: 'Glenn Cipani',
        position: 'VP Distribution',
        company: 'Pearson India Education Services Pvt. Ltd.',
        logo: '/images/contactUS/company-logo/verde.png',
        image: 'glenn-image-url',
    },
    {
        text: `"We have processed more than a million units from Feb 2022, we joined operations from two locations and this was 4th year of operations. What is more satisfying is our outward units crossed close to 800,000 and achievement was budgeted 95%, for calendar month days."`,
        author: 'Third Author',
        position: 'Operations Head',
        company: 'Company XYZ',
        logo: '/images/contactUS/company-logo/netEducation.png',
        image: 'third-author-image-url',
    },
];
