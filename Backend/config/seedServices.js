import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import databaseConnection from './database.js';
import Service from '../models/Service.js';

// Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});


const ServicePosts = [
    {
        category: "Cleaner",
        title: "Professional Home Cleaner",
        // // review: "1.2M",
        price: "500",
        description: "Our professional home cleaning service is ideal for deep home cleaning, sanitation, and maintenance across all residential spaces. From dusting and vacuuming to thorough surface cleaning, we ensure your home remains spotless, healthy, and organized. We use eco-friendly products and high-quality equipment for a comprehensive clean.",
        image: "https://cdn.pixabay.com/photo/2021/07/19/04/35/workers-6477163_1280.jpg"
    },
    {
        category: "Cleaner",
        title: "Office Cleaning Specialist",
        // review: "980k",
        price: "600",
        description: "Our office cleaning specialists provide reliable and effective cleaning services tailored to the unique needs of corporate and small office spaces. Using eco-friendly products, we ensure a hygienic, tidy, and professional work environment for your employees and visitors, enhancing productivity and wellness.",
        image: "https://cdn.pixabay.com/photo/2021/01/18/16/56/woman-5928694_1280.jpg"
    },
    {
        category: "Cleaner",
        title: "Move-in/Move-out Cleaning",
        // review: "870k",
        price: "750",
        description: "Move-in and move-out cleaning services are essential for ensuring your new home or apartment is ready for living or to leave behind a clean space for the next occupants. Our team focuses on thorough cleaning, including descriptioned kitchen, bathroom, and floor care, so you can start fresh or leave a lasting impression.",
        image: "https://cdn.pixabay.com/photo/2021/01/18/16/56/woman-5928694_1280.jpg"
    },
    {
        category: "Cleaner",
        title: "Post-Construction Cleaner",
        // review: "550k",
        price: "800",
        description: "After a construction project, cleaning up is critical to remove debris, dust, and residue left behind. Our post-construction cleaning service ensures that your newly renovated or built space is safe and pristine. We clean all surfaces, including windows, floors, and walls, using specialized tools and techniques to remove all construction-related mess.",
        image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/soap-dispenser-2337697_1280.jpg"
    },
    {
        category: "Cleaner",
        title: "Carpet and Sofa Cleaner",
        // review: "630k",
        price: "450",
        description: "Our carpet and sofa cleaning service is designed to restore the look and feel of your fabric furniture and carpets. We use powerful machines and eco-friendly cleaning solutions to remove stains, dirt, and allergens, ensuring your home is hygienic, comfortable, and fresh-smelling. This service is perfect for maintaining your soft furnishings.",
        image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/soap-dispenser-2337697_1280.jpg"
    },
    {
        category: "Electrician",
        title: "Residential Electrician",
        // review: "1M",
        price: "650",
        description: "Our residential electrician services cover all electrical needs within your home, from wiring installations to light fittings and power outlets. We ensure safety and efficiency in every task, using the latest tools and technologies to deliver reliable solutions for all your electrical requirements, whether it’s a repair or new installation.",
        image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/soap-dispenser-2337697_1280.jpg"
    },
    {
        category: "Electrician",
        title: "Emergency Electrician",
        // review: "720k",
        price: "900",
        description: "Electrical emergencies can happen at any time, and our emergency electrician service is available 24/7 to resolve issues such as power outages, circuit overloads, or exposed wiring. Our experts are ready to quickly identify problems and provide efficient repairs to ensure your home or business remains safe and powered.",
        image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/soap-dispenser-2337697_1280.jpg"
    },
    {
        category: "Electrician",
        title: "Electrical Installation Expert",
        // review: "610k",
        price: "750",
        description: "Whether you need new electrical installations or upgrades to existing systems, our electrical installation experts are here to help. We handle the setup of everything from lighting and switches to large appliances and electrical panels, ensuring everything is wired correctly and efficiently for long-term performance and safety.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Electrician",
        title: "Industrial Electrician",
        // review: "450k",
        price: "1000",
        description: "Our industrial electricians are experts in managing large-scale electrical systems, from wiring and machinery to equipment maintenance for factories and warehouses. We ensure the safety and reliability of all electrical systems, providing prompt repairs and installations to keep your business running smoothly without downtime.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Electrician",
        title: "Smart Home Technician",
        // review: "820k",
        price: "850",
        description: "Our smart home technicians specialize in setting up and optimizing home automation systems. From smart lighting and thermostats to voice-controlled appliances, we provide expert installation and troubleshooting services to help you create a more efficient, convenient, and connected home with the latest smart technologies.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Plumber",
        title: "Bathroom Fitting Plumber",
        // review: "970k",
        price: "550",
        description: "Our bathroom fitting plumbers are experts in the installation and repair of bathroom fixtures, including sinks, bathtubs, showers, and toilets. We offer fast and reliable service to ensure your bathroom remains functional, efficient, and visually appealing. Our team also handles pipe replacements, water heaters, and any plumbing-related concerns in your bathroom.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Plumber",
        title: "Leakage Repair Specialist",
        // review: "690k",
        price: "500",
        description: "Leakage issues can cause significant water damage to your property. Our leakage repair specialists efficiently fix leaks in pipes, taps, and other plumbing fixtures. We use advanced leak detection techniques to ensure all issues are addressed, minimizing water waste and preventing long-term damage to your property.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Plumber",
        title: "Water Tank Cleaning",
        // review: "730k",
        price: "700",
        description: "Our water tank cleaning service ensures your water storage tanks are thoroughly cleaned, sanitized, and free from harmful contaminants. We remove dirt, debris, and bacteria, ensuring the water quality remains high. Regular water tank cleaning promotes the health and safety of everyone in your household by ensuring clean, safe drinking water.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Plumber",
        title: "Kitchen Plumbing Expert",
        // review: "800k",
        price: "650",
        description: "Our kitchen plumbing experts handle everything from sink installations to garbage disposal repairs. We provide efficient solutions for leaks, clogs, and faulty pipes, ensuring your kitchen plumbing operates smoothly. Whether you need new fittings, repairs, or upgrades, our team ensures top-quality service that’s both functional and reliable.",
        image: "https://cdn.pixabay.com/photo/2019/05/12/15/07/electric-4198293_1280.jpg"
    },
    {
        category: "Plumber",
        title: "Drainage System Technician",
        // review: "560k",
        price: "600",
        description: "Our drainage system technicians specialize in diagnosing and fixing issues with drainage pipes. Whether it’s clogged pipes, slow drainage, or complete system failure, we offer solutions to ensure efficient and trouble-free drainage, using the latest tools and techniques for the job. We prioritize high-quality service and long-lasting solutions.",
        image: "https://cdn.pixabay.com/photo/2015/01/01/13/32/plumbing-585658_1280.jpg"
    },
    {
        category: "Plumber",
        title: "Drainage System Technician",
        // review: "560k",
        price: "600",
        description: "Our drainage system technicians specialize in diagnosing and fixing issues with drainage pipes. Whether it’s clogged pipes, slow drainage, or complete system failure, we offer solutions to ensure efficient and trouble-free drainage, using the latest tools and techniques for the job.",
        image: "https://cdn.pixabay.com/photo/2015/12/22/08/27/plumbing-1103725_1280.jpg"
    },
    {
        category: "Mechanic",
        title: "Bike Mechanic (On-call)",
        // review: "1.1M",
        price: "450",
        description: "Our on-call bike mechanic service brings skilled technicians to your doorstep, ready to repair and service your bike. From tire replacements to engine diagnostics, we ensure your bike is in top condition without you needing to leave your home.",
        image: "https://cdn.pixabay.com/photo/2015/04/05/12/26/hand-707699_1280.jpg"
    },
    {
        category: "Mechanic",
        title: "Car Engine Expert",
        // review: "870k",
        price: "850",
        description: "We offer expert engine diagnostics and repairs for cars of all makes and models. Whether it's addressing engine misfires, overheating issues, or routine maintenance, our technicians have the skills to get your engine running smoothly and reliably again.",
        image: "https://cdn.pixabay.com/photo/2016/10/18/09/08/brake-disc-1749633_1280.jpg"
    },
    {
        category: "Mechanic",
        title: "AC Mechanic",
        // review: "920k",
        price: "700",
        description: "Our AC mechanic services include installation, repair, and maintenance of air conditioners. We ensure your cooling system is running at its best, keeping your home comfortable. We provide quick fixes for issues like leaks, low refrigerant, and faulty compressors.",
        image: "https://cdn.pixabay.com/photo/2017/01/05/10/38/auto-repair-1954636_1280.jpg"
    },
    {
        category: "Mechanic",
        title: "Home Appliance Mechanic",
        // review: "750k",
        price: "600",
        description: "We provide repairs and maintenance for all home appliances, including washing machines, refrigerators, ovens, and more. If your appliance breaks down, we can diagnose the problem quickly and fix it, saving you the cost of buying a new appliance.",
        image: "https://cdn.pixabay.com/photo/2017/01/05/10/38/auto-repair-1954636_1280.jpg"
    },
    {
        category: "Mechanic",
        title: "Mobile Mechanic for Cars",
        // review: "680k",
        price: "900",
        description: "Our mobile mechanic service brings expert car repair and maintenance directly to your location. Whether it's an engine issue, a flat tire, or an oil change, we provide high-quality, on-the-spot service to get your vehicle back on the road.",
        image: "https://cdn.pixabay.com/photo/2017/01/05/10/38/auto-repair-1954636_1280.jpg"
    },
    {
        category: "Therapist",
        title: "Bridal Makeup Artist",
        // review: "1.4M",
        price: "120",
        description: "Our bridal makeup artists specialize in creating flawless looks for your special day. We offer personalized consultations and use high-quality products to ensure your makeup lasts throughout the day, leaving you feeling beautiful, confident, and ready for your wedding.",
        image: "https://cdn.pixabay.com/photo/2018/03/27/16/24/corporal-3266508_1280.jpg"
    },
    {
        category: "Therapist",
        title: "Home Salon Services",
        // review: "950k",
        price: "600",
        description: "Our home salon service offers a wide range of beauty treatments including haircuts, facials, waxing, and manicures, all in the comfort of your home. We bring salon-quality treatments directly to you, using professional products and techniques tailored to your needs.",
        image: "https://cdn.pixabay.com/photo/2017/05/22/06/13/massage-2333200_1280.jpg"
    },
    {
        category: "Therapist",
        title: "Hair Styling Expert",
        // review: "880k",
        price: "700",
        description: "Our expert hairstylists offer trendy cuts, styling, and color treatments for all hair types. Whether you need a complete makeover or just a routine trim, we provide professional advice and use high-quality products to achieve the perfect look for you.",
        image: "https://cdn.pixabay.com/photo/2014/03/11/22/57/wellness-285589_1280.jpg"
    },
    {
        category: "Therapist",
        title: "Massage and Spa at Home",
        // review: "790k",
        price: "850",
        description: "Our massage and spa services provide a relaxing experience at home, offering treatments like Swedish massages, hot stone therapies, and more. Our certified therapists use essential oils and soothing techniques to relieve stress, reduce muscle tension, and promote overall wellness.",
        image: "https://cdn.pixabay.com/photo/2014/03/11/22/57/wellness-285589_1280.jpg"
    },
    {
        category: "Therapist",
        title: "Nail Art & Manicure",
        // review: "620k",
        price: "500",
        description: "Our nail art and manicure services include everything from classic styles to intricate designs. Whether you want a simple polish or a creative design, our professional nail technicians offer high-quality services that leave your nails looking beautiful and well-maintained.",
        image: "https://cdn.pixabay.com/photo/2014/03/11/22/57/wellness-285589_1280.jpg"
    }
]


const seedServices = async () => {
    try {
        await databaseConnection();

        console.log('📝 Seeding blog posts...');
        await Service.deleteMany();
        await Service.insertMany(ServicePosts);
        console.log('✅ Blog posts seeded successfully!');
    } catch (err) {
        console.error('❌ Error seeding blogs:', err);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Database connection closed.');
    }
};

seedServices();