'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMedia } from '@/api/actions';
import UrlForm from '@/components/urlForm';
import Image from 'next/image';
import { mediaTypes } from '@/constants';

interface Media {
  id: string;
  mediaType: mediaTypes;
  url: string;
  mediaUrl: string;
}

export default function Home() {
  const [media, setMedia] = useState<Media[]>([]);
  const [searchText, setSearchText] = useState('');
  const [mediaType, setMediaType] = useState<mediaTypes>(mediaTypes.ALL);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [mediaInput, setMediaInput] = useState<mediaTypes>(mediaTypes.ALL);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['media', searchText, mediaType],
    queryFn: ({ pageParam = 1 }) =>
      fetchMedia(pageParam, searchText, mediaType),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasNextPage ? allPages.length + 1 : undefined,
    staleTime: 2 * 60 * 1000,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(searchInput);
    setMediaType(mediaInput);
    refetch();
  };

  useEffect(() => {
    if (data) {
      const allMedia = data.pages.flatMap((page) => page?.media);
      setMedia(allMedia);
    }
  }, [data]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [handleObserver]);

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center pt-5">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-2 mb-5"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search text"
          className="flex-1 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={mediaInput}
          onChange={(e) => setMediaInput(e.target.value as mediaTypes)}
          className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={mediaTypes.ALL}>All</option>
          <option value={mediaTypes.IMAGE}>Image</option>
          <option value={mediaTypes.VIDEO}>Video</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>
      <UrlForm refetch={refetch} />
      <h1 className="text-2xl font-bold">Media</h1>
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">URL</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Media</th>
          </tr>
        </thead>
        <tbody>
          {media.length > 0 ? (
            media.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.url}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.mediaType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.mediaType === mediaTypes.IMAGE ? (
                    <Image
                      src={item.mediaUrl}
                      alt={`Media ${item.id}`}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <video controls width="200">
                      <source src={item.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-xl font-bold text-center py-4">
                No media found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div ref={loadMoreRef} className="load-more">
        {isFetchingNextPage ? 'Loading more...' : null}
      </div>
    </div>
  );
}
