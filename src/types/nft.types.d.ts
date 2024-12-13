declare interface TweetScreenshotPayload {
  stats: string;
  data: {
    url: string;
    image_cid: string;
    json_cid: string;
    json_url: string;
  };
}

declare interface OwnerObject {
  points: string;
  profile_picture: string;
  twitter_username: string;
  username: string;
  wallet_address: string;
  xpad_access_token: string;
  xpad_id: string;
}

declare interface AllNftsResponseData {
  has_logged_in_user_voted: boolean;
  id: number;
  identifier: string;
  collection: string;
  contract: string;
  name: string;
  description: string;
  image_url: string;
  display_image_url: string;
  metadata_url: string;
  updated_at: string;
  owner: OwnerObject;
  transaction: string;
}

declare interface NftDetailsType {
  data: NftType;
  status: string;
}

declare interface NftType {
  collection: string;
  contract: string;
  description: string;
  display_image_url: string;
  id: number;
  identifier: string;
  image_url: string;
  likes: number;
  is_favorite: boolean;
  is_deleted: boolean;
  metadata_url: string;
  name: string;
  owner: OwnerObject;
  transaction: string;
  updated_at: string;
}

declare interface AllNftsResponse {
  results: AllNftsResponseData[];
  page: string;
  records_per_page: string;
  total_count: number;
  total_pages: number;
}

declare interface AllFavNftsResponse {
  results: FavoriteNftResponse[];
  current_page: string;
  count: number;
  total_pages: number;
}

declare interface FavoriteNftResponse {
  is_favorite: any;
  collection: string;
  contract: string;
  description: string;
  display_image_url: string;
  id: number;
  identifier: string;
  image_url: string;
  is_deleted: boolean;
  metadata_url: string;
  name: string;
  owner: OwnerObject;
  transaction: string;
  has_logged_in_user_voted: boolean;
  updated_at: string | null;
}

declare interface saveNFTResponse {
  status: string;
  data: {
    identifier: string;
    collection: string;
    contract: string;
    name: string;
    description: string;
    image_url: string;
    display_image_url: string;
    metadata_url: string;
    updated_at: string;
    owner: OwnerObject;
    transaction: string;
  };
}
