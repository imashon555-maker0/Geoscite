import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, Link as LinkIcon, Loader } from 'lucide-react';

interface SearchResult {
  title: string;
  snippet: string;
  pageid: number;
  url: string;
}

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php`,
        {
          params: {
            action: 'query',
            list: 'search',
            srsearch: query + ' archaeology',
            format: 'json',
            origin: '*',
            srprop: 'snippet|title',
          },
        }
      );

      const searchResults = response.data.query.search.map((item: any) => ({
        title: item.title,
        snippet: item.snippet.replace(/<\/?span[^>]*>/g, '').replace(/&\w+;/g, ''),
        pageid: item.pageid,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
      }));

      setResults(searchResults);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🧠 AI Archaeology Search
        </h1>
        <p className="text-lg text-gray-600">
          Search for archaeological topics and discover historical facts powered by AI-enhanced Wikipedia search.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for ancient civilizations, artifacts, or archaeological sites..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
          >
            {loading ? (
              <Loader size={20} className="animate-spin mr-2" />
            ) : (
              <SearchIcon size={20} className="mr-2" />
            )}
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-gray-600">Found {results.length} results</p>
          </div>

          {results.map((result) => (
            <div
              key={result.pageid}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {result.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {result.snippet.length > 200 ? `${result.snippet.substring(0, 200)}...` : result.snippet}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <LinkIcon size={16} className="mr-2" />
                  Read More on Wikipedia
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !results.length && !error && (
        <div className="text-center py-12">
          <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">Start your archaeological journey by searching for a topic!</p>
          <div className="mt-6 space-x-4">
            <button
              onClick={() => setQuery('Stone Age')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              Stone Age
            </button>
            <button
              onClick={() => setQuery('Roman Empire')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              Roman Empire
            </button>
            <button
              onClick={() => setQuery('Mesoamerican civilizations')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              Mesoamerican
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
