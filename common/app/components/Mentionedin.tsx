export default function MentionedIN() {
    const partners = [
      { name: 'Partner 1', logo: '/partner1.svg' },
      { name: 'Partner 2', logo: '/partner2.svg' },
      { name: 'Partner 3', logo: '/partner3.svg' },
      { name: 'Partner 4', logo: '/partner4.svg' },
    ];
  
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-yellow-400">Mentioned In</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-40 h-20 bg-gray-900 rounded-lg shadow-md flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  