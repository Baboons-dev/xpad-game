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
