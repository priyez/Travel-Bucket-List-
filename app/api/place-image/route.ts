import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; 

const PEXELS_API_KEY = "0VPD5zGmGc2gMAqwhgLyRx03d6Si8pouyrYvd7S04RWUsJRw59PjgSyk";


export async function GET(req: NextRequest) {  
    const query = req.nextUrl.searchParams.get('q');
  

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: 'Failed to fetch from Pexels', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    const photo = data.photos?.[0];

    return NextResponse.json({
      imageUrl: photo?.src?.medium || null,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal error', details: String(err) }, { status: 500 });
  }
}
