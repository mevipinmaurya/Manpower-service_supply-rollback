import { useState } from "react";
import React from "react";

const faqs = [
    {
        question: "What is your return policy?",
        answer: "We offer a generous 30-day return policy for all unused products, provided they are kept in their original packaging without any damage or alterations. If you wish to initiate a return, please contact our dedicated support team, who will guide you through the return process. Once your return request is approved, we will provide you with a return shipping label and detailed instructions on how to proceed. After receiving the returned product, our team will inspect it, and if it meets the eligibility criteria, we will process your refund or exchange promptly.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we proudly offer international shipping to many countries around the world, ensuring that customers from various regions can enjoy our products. The delivery times and costs associated with international shipping vary based on the destination, local customs regulations, and the selected shipping method. To get an accurate estimate of shipping costs and expected delivery time, you can enter your shipping address during checkout or refer to our shipping policy page. Please note that international orders may be subject to import duties, taxes, and customs fees, which are the responsibility of the recipient.",
    },
    {
        question: "How can I contact customer support?",
        answer: "You can easily reach out to our customer support team through multiple channels to ensure that you receive prompt assistance whenever you need it. The primary method is via email at support@example.com, where our team will respond to your inquiries within 24 hours. Additionally, we offer a convenient live chat feature on our website, which allows you to connect with a support representative instantly for real-time help. If you require immediate assistance, you can also check our comprehensive FAQ section, where we provide answers to commonly asked questions regarding our products and services.",
    },
    {
        question: "Are your products covered under warranty?",
        answer: "Yes, all of our high-quality products come with a comprehensive 1-year limited warranty that covers manufacturing defects and material failures under normal usage conditions. If you experience any issues with your purchase due to defects in workmanship or materials, you can submit a warranty claim by contacting our support team with proof of purchase and a description of the problem. Once your claim is reviewed and approved, we will either repair, replace, or refund the defective item based on the situation. Please note that accidental damage, misuse, or unauthorized modifications are not covered under this warranty policy.",
    },
    {
        question: "Can I modify my order after placing it?",
        answer: "Order modifications are allowed within a 12-hour window after placing the order, giving you flexibility in case of changes to product selection, shipping details, or other preferences. Once the 12-hour period has passed, our order processing system automatically begins fulfillment, making it difficult to alter the details. If you need to make changes, we strongly recommend reaching out to our support team as soon as possible so they can assist in making adjustments before processing begins. However, if your order has already been shipped, modifications will no longer be possible, and you may need to initiate a return or exchange instead.",
    },
    {
        question: "Do you offer discounts or promotions?",
        answer: "Yes, we frequently run exciting seasonal discounts and promotional campaigns to provide our customers with the best deals on our premium products. To stay informed about upcoming promotions, exclusive offers, and limited-time discounts, we encourage you to subscribe to our newsletter, where we share the latest updates. Additionally, we occasionally offer special discount codes and loyalty rewards to our returning customers as a token of appreciation for their continued support. If you're looking for the best savings, keep an eye on our website and social media channels, where we announce flash sales and holiday discounts throughout the year.",
    },
    {
        question: "How do I track my order?",
        answer: "Once your order has been successfully processed and shipped, you will receive a detailed confirmation email that includes a unique tracking number. This tracking number allows you to monitor the status of your shipment and get real-time updates on its estimated arrival date. To track your order, simply visit the shipping carrier’s website and enter your tracking number to view the current location and progress of your package. If you encounter any issues with tracking your order or if there are unexpected delays, feel free to reach out to our support team for assistance in resolving the matter.",
    },
];



const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="faq" className='flex w-full flex-col mt-14 lg:mt-20 bg-black gap-4 justify-center items-center p-10 lg:p-16'>
            <h1 className='text-3xl lg:text-4xl font-bold text-white mb-10'>Frequently Asked Questions</h1>

            <div className="flex justify-center max-w-[95%] md:max-w-[80%]">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-[#6E42E5]  pb-3">
                            <button
                                className="cursor-pointer w-full flex justify-between items-center text-left text-lg font-medium text-white "
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className="text-xl">{openIndex === index ?
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="#6E42E5"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-circle-minus"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 12h8"></path>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6E42E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 12h8"></path>
                                        <path d="M12 8v8"></path>
                                    </svg>
                                }</span>
                            </button>
                            <div
                                className={`text-md mt-4 dark:text-zinc-300 transition-all duration-300 ${openIndex === index ? "h-auto opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;