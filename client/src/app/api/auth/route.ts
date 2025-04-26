import { NextResponse } from "next/server";

// Get your backend URL from an environment variable
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Login endpoint
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward the request to your backend
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET endpoint for user profile
export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  
  // Check if token is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Forward the request to your backend with the token
    const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Specialized route for logout
export async function DELETE(request: Request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Forward the request to your backend with the token
    const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: 'POST', // Most APIs use POST for logout
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}