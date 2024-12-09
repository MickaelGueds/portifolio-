import { useState, useEffect } from 'react';
import axios from 'axios';

interface Media {
  id: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  caption?: string;
}

export function InstaFeed() {
  const [mediaData, setMediaData] = useState<Media[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = import.meta.env.VITE_INSTA_TOKEN;

  useEffect(() => {
    async function getInstaFeed() {
      const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&access_token=${token}`;

      try {
        const { data } = await axios.get(url);
        setMediaData(
          data.data.filter((media: Media) => media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM')
        );
      } catch (error) {
        console.error('Erro ao buscar dados do Instagram:', error);
      }
    }

    getInstaFeed();
  }, [token]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mediaData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Instagram Feed</h2>

      {mediaData.length > 0 && (
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mediaData.map((media) => (
                <div
                  key={media.id}
                  className="flex-shrink-0 w-full"
                  style={{ width: '100%' }}
                >
                  <a
                    href={media.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src={media.media_url}
                      alt="Instagram media"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="px-4">{media.caption || 'Sem legenda'}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}
