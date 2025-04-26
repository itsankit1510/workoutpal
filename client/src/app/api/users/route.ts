import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Get your backend URL from an environment variable
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// This is the API route that proxies requests to your Express backend's protected user routes
export async function GET(request: Request) {
  const { userId, getToken } = auth();
  
  // Check if user is authenticated
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Get token from Clerk to pass to your backend for authentication
    const token = await getToken();
    
    // Forward the request to your backend with the token
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId, getToken } = auth();
  
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const token = await getToken();
    
    // Forward the POST request to your backend
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}