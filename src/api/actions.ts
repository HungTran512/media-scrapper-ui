import axiosClient from '@/api/axios';
import { mediaTypes } from '@/constants';

const authHeader = `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_AUTH_PASSWORD}`).toString('base64')}`;

export const fetchMedia = async (
  page: number,
  search: string,
  type: mediaTypes,
) => {
  const response = await axiosClient.get(`/api/media`, {
    params: { page, search, type },
    headers: {
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const uploadUrl = async ({ url }: { url: string }) => {
  const response = await axiosClient.post(
    '/api/upload',
    { url },
    {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
