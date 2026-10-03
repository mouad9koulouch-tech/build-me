import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest){
  const { user_message } = await req.json();
  const key = process.env.OPENAI_API_KEY;
  if(!key) return NextResponse.json({ reply: "Add OPENAI_API_KEY in Vercel Settings -> Env Vars. Task: "+user_message });
  try{
    const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'system',content:"You are [build me] dev."},{role:'user',content:user_message}]})});
    const d=await r.json(); return NextResponse.json({ reply: d.choices?.[0]?.message?.content||'No reply' });
  }catch(e:any){ return NextResponse.json({ reply: 'Error '+e.message }); }
}
