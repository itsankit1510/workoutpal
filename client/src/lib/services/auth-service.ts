// API services for authentication

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
}

export interface ProfileResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

/**
 * Authenticate user and get tokens
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to login');
  }
  
  // Handle the server response format which wraps data in a 'data' property
  const data = responseData.data || responseData;
  
  if (!data || !data.tokens || !data.tokens.accessToken) {
    console.error('Invalid server response structure:', responseData);
    throw new Error('Invalid server response format');
  }
  
  return data;
}

/**
 * Get the current user's profile
 */
export async function getProfile(token: string): Promise<ProfileResponse> {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to get profile');
  }
  
  // Handle the server response format which wraps data in a 'data' property
  const data = responseData.data || responseData;
  
  if (!data || !data.user) {
    console.error('Invalid server response structure:', responseData);
    throw new Error('Invalid server response format');
  }
  
  return data;
}

/**
 * Log out the user
 */
export async function logout(token: string): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to logout');
  }
}