export const config = { runtime: 'edge' };

export default async function handler(request) {
  const url = new URL(request.url);
  const model = url.searchParams.get('model');
  const key = url.searchParams.get('key');
  
  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const cleanHeaders = new Headers();
  cleanHeaders.set("Content-Type", "application/json");

  const body = await request.text();

  const response = await fetch(targetUrl, { 
    method: "POST", 
    headers: cleanHeaders, 
    body: body 
  });

  return new Response(response.body, { 
    status: response.status, 
    headers: { "Content-Type": "application/json" } 
  });
}