import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="border-trace-wrapper bg-white shadow-xl rounded-2xl max-w-xl w-full p-8 text-center">
                <span className="border-trace-line rounded-2xl"></span>

                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your transaction was completed successfully.
                </p>

                {
                    reference && (
                        <p className="text-sm text-gray-500 mb-6">
                            <strong>Reference ID:</strong> {reference}
                        </p>
                    )
                }

                <div className="flex mt-5 flex-col sm:flex-row justify-center">
                    <Link
                        to="/"
                        className="text-white bg-[#6E42E5] px-6 py-3 rounded-md hover:bg-[#5a34c9] transition-all duration-300"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
