import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gamepad2, MousePointer, ArrowUpDown, Shovel, CheckCircle, X } from 'lucide-react';

const Games: React.FC = () => {
  const { t } = useTranslation();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Artifact Munging game state
  const [artifactItems] = useState([
    { id: 1, name: 'Spearhead', image: '🗲', matched: false },
    { id: 2, name: 'Pottery Jar', image: '🏺', matched: false },
    { id: 3, name: 'Ancient Coin', image: '🪙', matched: false },
    { id: 4, name: 'Old Scroll', image: '📜', matched: false },
  ]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [matched, setMatched] = useState(new Set<number>());

  const handleArtifactMatch = (item: any, name: string) => {
    if (item.name === name) {
      setMatched(prev => new Set(Array.from(prev).concat(item.id)));
    }
    setSelectedCard(null);
  };

  // Timeline game state
  const [timelineEvents] = useState([
    { event: 'Stone Age Begins', year: '2.5 million BC', placed: false },
    { event: 'First Cities', year: '3500 BC', placed: false },
    { event: 'Pyramids Built', year: '2580 BC', placed: false },
    { event: 'Roman Empire', year: '27 BC', placed: false },
  ]);
  const [placedEvents, setPlacedEvents] = useState<string[][]>([[], [], [], []]);

  const handleTimelinePlace = (eventIndex: number, slotIndex: number) => {
    if (placedEvents[slotIndex].length === 0) {
      const event = timelineEvents[eventIndex];
      const newPlaced = [...placedEvents];
      newPlaced[slotIndex] = [`${event.event} (${event.year})`];
      setPlacedEvents(newPlaced);
    }
  };

  // Dig simulator state
  const [digProgress, setDigProgress] = useState(0);
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [isDigging, setIsDigging] = useState(false);

  const handleDigClick = () => {
    if (digProgress < 100) {
      setIsDigging(true);
      setTimeout(() => {
        setDigProgress(prev => prev + 10);
        const items = ['💎', '📿', '🦴', '🏺', '🪙'];
        if (Math.random() > 0.6) {
          const item = items[Math.floor(Math.random() * items.length)];
          setFoundItems(prev => [...prev, item]);
        }
        setIsDigging(false);
      }, 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎮 Archaeology Games
        </h1>
        <p className="text-lg text-gray-600">
          Test your knowledge and have fun with these interactive archaeology games!
        </p>
      </div>

      {!selectedGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedGame('matching')}>
            <div className="text-center">
              <MousePointer size={64} className="mx-auto text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Artifact Matching</h3>
              <p className="text-gray-600">Match ancient artifacts with their correct names.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedGame('timeline')}>
            <div className="text-center">
              <ArrowUpDown size={64} className="mx-auto text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Timeline Challenge</h3>
              <p className="text-gray-600">Place historical events on the correct timeline.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedGame('dig')}>
            <div className="text-center">
              <Shovel size={64} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dig Simulator</h3>
              <p className="text-gray-600">Simulate an archaeological dig and find treasures.</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Back to Games
          </button>

          {selectedGame === 'matching' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Artifact Matching</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {artifactItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedCard === item.id ? 'border-purple-500 bg-purple-50' :
                      matched.has(item.id) ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-purple-300'
                    }`}
                    onClick={() => !matched.has(item.id) && setSelectedCard(item.id)}
                  >
                    <div className="text-6xl text-center mb-2">{item.image}</div>
                    {selectedCard === item.id && (
                      <div className="space-y-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleArtifactMatch(item, 'Spearhead'); }}
                          className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm"
                        >
                          Spearhead
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleArtifactMatch(item, 'Pottery Jar'); }}
                          className="w-full px-2 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          Pottery Jar
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleArtifactMatch(item, 'Ancient Coin'); }}
                          className="w-full px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          Ancient Coin
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleArtifactMatch(item, 'Old Scroll'); }}
                          className="w-full px-2 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Old Scroll
                        </button>
                      </div>
                    )}
                    {matched.has(item.id) && <CheckCircle className="mx-auto text-green-500" size={24} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedGame === 'timeline' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Timeline Challenge</h2>
              <div className="space-y-4 mb-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                    <div className="flex-1 cursor-pointer hover:bg-gray-200 p-2 rounded" draggable>
                      {event.event}
                    </div>
                    <div className="text-gray-600">{event.year}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((slot, index) => (
                  <div
                    key={slot}
                    className="border-2 border-dashed border-gray-300 p-4 rounded-lg min-h-[60px] flex items-center text-gray-500"
                    onDrop={(e) => {
                      e.preventDefault();
                      const data = e.dataTransfer.getData('text/plain');
                      if (data) handleTimelinePlace(parseInt(data), index);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {placedEvents[index].length > 0 ? placedEvents[index][0] : 'Drop event here (Chronological order)'}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedGame === 'dig' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Dig Simulator</h2>
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                  <div
                    className="bg-amber-600 h-6 rounded-full transition-all duration-500"
                    style={{ width: `${digProgress}%` }}
                  ></div>
                </div>
                <p className="text-lg mb-4">Dig Progress: {digProgress}%</p>
                <button
                  onClick={handleDigClick}
                  disabled={isDigging || digProgress >= 100}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-bold"
                >
                  {isDigging ? '🪚 Digging...' : '⛏️ Dig Here!'}
                </button>
              </div>
              <div className="grid grid-cols-5 gap-4 mb-8">
                {foundItems.map((item, index) => (
                  <div key={index} className="text-4xl p-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-gray-600">Found {foundItems.length} items!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Games;
