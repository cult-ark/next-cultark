/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import Service from '../types/Service';
import { extractListItems } from '../utils/functions';
import rawItems from '../../data/itemz.json';

// Type for service items
export type ServiceItem = {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    item_title: string;
    item_description: string;
    service_id: number[];
  };
};
const fields = [
  'id',
  'title',
  'slug',
  'acf.image',
  'acf.service_items',
  'acf.order',
  'acf.description',
];
export const getServices = async (page_limit = 20) => {
  const res = await axios(
    `${import.meta.env.VITE_WORDPRESS_URL
    }/wp-json/wp/v2/services?acf_format=standard&_fields=${fields.join(
      ','
    )}&per_page=${page_limit}&orderby=id&order=asc`
  );
  return res.data.map((service: Service) => ({
    ...service,
    acf: {
      ...service.acf,
      service_items: extractListItems((service.acf as any).service_items),
    },
  }));
};

export const getServiceBySlug = async (slug: string) => {
  const res = await axios(
    `${import.meta.env.VITE_WORDPRESS_URL
    }/wp-json/wp/v2/services?slug=${slug}&acf_format=standard&_fields=${fields.join(
      ','
    )}`
  );
  if (res.data.length === 0) {
    throw new AxiosError('Service not found');
  }
  return res.data.map((service: Service) => ({
    ...service,
    acf: {
      ...service.acf,
      service_items: extractListItems((service.acf as any).service_items),
    },
  }))[0];
};

export const getServiceItems = async (serviceId: number) => {
  console.log('🔍 getServiceItems (local) called with serviceId:', serviceId);

  // rawItems is an object keyed by string IDs => each value is { ID: string, item_title: string, item_description: string, service_id: string }
  const allItems = Object.values(rawItems as Record<string, any>);
  console.log('📦 Loaded items from JSON:', allItems.length);

  // Filter by serviceId (JSON stores it as string)
  const filtered = allItems.filter((it) => Number(it.service_id) === Number(serviceId));
  console.log('✅ Filtered items count:', filtered.length);

  // Map into the expected ServiceItem shape used by the UI
  const mapped = filtered.map((it) => {
    const idNum = Number(it.ID);
    return {
      id: idNum,
      title: { rendered: it.item_title ?? '' },
      acf: {
        item_title: it.item_title ?? '',
        item_description: it.item_description ?? '',
        // keep as array to align with previous WP shape
        service_id: [Number(it.service_id)],
      },
    } as ServiceItem;
  });

  return mapped;
};
