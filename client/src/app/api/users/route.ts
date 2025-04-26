import { NextResponse } from "next/server";

// Get your backend URL from an environment variable
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// This is the API route that proxies requests to your Express backend's protected user routes
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
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      headers: {
        "Authorization": authHeader,
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
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    
    // Forward the POST request to your backend
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: {
        "Authorization": authHeader,
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

export async function DELETE(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!id) {
    return new NextResponse(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Forward the DELETE request to your backend
    const response = await fetch(`${BACKEND_URL}/api/users/${id}`, {
      method: 'DELETE',
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