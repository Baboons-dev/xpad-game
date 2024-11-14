import { ReactNode } from "react";

export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code?: string;
}

export interface UserResponse {
  count: number;
  current_page: number;
  total_pages: number;
  results: User[];
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
  };
  HapticFeedback: any;
}
// export interface User {
//   id: string;
//   firstName: string;
//   telegramId: string | number;
//   createdAt: string;
//   updatedAt: string;
//   totalCredits: number;
//   toolCredits: number;
//   promptCredits: number;
//   referralCode: string;
//   referredById?: string | null;
// }
export interface User {
  health: number;
  id: number;
  username: string;
  email: string;
  wallet_address: string;
  profile_link: string;
  avatar: string;
  points: number;
  attack: number;
  defense: number;
}
export interface AllNftsResponse {
  data: AllNftsResponseData[];
  page: string;
  records_per_page: string;
  total_count: number;
  total_pages: number;
}

export interface AllNftsResponseData {
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

export interface OwnerObject {
  points: string;
  profile_picture: string;
  twitter_username: string;
  username: string;
  wallet_address: string;
  xpad_access_token: string;
  xpad_id: string;
}

export interface FeatureType {
  title: string;
  icon: any;
  description: string;
  href: string;
  disabled: boolean;
  borderColor: string;
  buttonText: string;
}

export interface HistoryResponse {
  results: HistoryObject[];
  // page: number;
  // records_per_page: number;
  // total_count: number;
  total_pages: number;
  count: number;
  current_page: number;
}

export interface HistoryObject {
  // points_awarded: number;
  // username: string;
  // awarded_from: string;
  // transaction_timestamp: string;
  // activity: string;

  points_awarded: number;
  awarded_from: string;
  transaction_timestamp: string;
  activity: string;
}
