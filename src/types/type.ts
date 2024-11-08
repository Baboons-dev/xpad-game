export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code?: string;
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

export interface UserResponse {
  count: number;
  current_page: number;
  total_pages: number;
  results: User[];
}

export interface Fighter {
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  imageUrl: string;
}
