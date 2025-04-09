"use client"

type TripCardProps = {
    title: string;
    imageUrl: string;
    originalPrice: number;
    discountedPrice: number;
    slotsLeft: number;
  };
  
export const TripCard: React.FC<TripCardProps> = ({
    title,
    imageUrl,
    originalPrice,
    discountedPrice,
    slotsLeft,
  }) => {
    const discountPercent = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  
    return (
      <div className="bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transition transform duration-300">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 line-through">₹{originalPrice}</span>
            <span className="text-green-600 font-bold">₹{discountedPrice}</span>
            <span className="bg-yellow-300 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
              {discountPercent}% OFF
            </span>
          </div>
  
          <p className="text-sm text-red-600">
            🎟 {slotsLeft} slots left – hurry!
          </p>
  
          <button className="mt-2 bg-[#00A896] text-white px-4 py-2 rounded-lg w-full hover:bg-[#01957f] transition">
            Book Now
          </button>
        </div>
      </div>
    );
  };
  