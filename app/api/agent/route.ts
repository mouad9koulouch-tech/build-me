import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest){
  const { user_message } = await req.json();
  const key = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  if(!key) return NextResponse.json({ reply: "Add OPENAI_API_KEY in Vercel Settings -> Env Vars. Task: "+user_message });
  try{
    const r=await fetch(`${baseUrl}/chat/completions`,{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:model,messages:[{role:'system',content:"You are [build me] dev."},{role:'user',content:user_message}]})});
    const d=await r.json();
    if(d.error) return NextResponse.json({ reply: "API Error: "+d.error.message });
    return NextResponse.json({ reply: d.choices?.[0]?.message?.content||'No reply - '+JSON.stringify(d) });
  }catch(e:any){ return NextResponse.json({ reply: 'Error '+e.message }); }
}
