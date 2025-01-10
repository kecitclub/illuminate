import React from 'react';
import slide1 from '../Assets/slide1.png';

const ProgressReportCard = () => {
    const data = {
        "data1": {
            "title": "Electric",
            "description": "Hey, this is a description of Electric.",
            "created_at": "2025/01/11"
        },
        "data2": {
            "title": "Electrostatic",
            "description": "Hey, this is a description of Electrostatic.",
            "created_at": "2025/01/10"
        }
    };

    return (
        <div className="w-full bg-gray-50 py-8 px-4">
            {Object.values(data).map((element, index) => (
                <div key={index} className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-6 border-t-4 border-blue-500">
                    <h1 className="text-2xl font-semibold text-blue-600 mb-4">{element.title}</h1>
                    <div className="text-sm text-gray-700 mb-4">
                        {element.description}
                    </div>
                    <img
                        src={slide1}
                        alt="image_here"
                        className="w-full max-w-[500px] h-auto mx-auto mb-4 object-cover rounded-md shadow-md border-4 border-gray-200" // Added border to image
                    />
                    <h3 className="text-xs text-gray-500 text-center">
                        Created At: {element.created_at}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default ProgressReportCard;
