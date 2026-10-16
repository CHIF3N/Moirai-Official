'use client'
import { useState, useRef, useEffect } from 'react'
import { useSiteConfig } from './Providers'
import { waLink } from '@/lib/site'

const REPLIES: [RegExp, string][] = [
  [/bespoke|custom|couture|tailored/i, 'Our bespoke service is fully custom — we take your measurements, discuss your vision, and craft a one-of-a-kind piece. The process: Consultation → Design → Fitting → Delivery (2–4 weeks). Want to start?'],
  [/price|cost|how much|budget|fee/i, 'Pricing varies by piece, fabric, and complexity. We work across budgets. The best way to get a quote is a quick WhatsApp message — our team responds fast!'],
  [/order|buy|purchase|get one/i, 'To place an order, reach out on WhatsApp. We\'ll walk you through everything step by step. Super easy!'],
  [/deliver|ship|location|where/i, 'We deliver across Cameroon. International shipping is available on request. Discuss your location with us on WhatsApp.'],
  [/school|learn|class|program|course|training/i, 'The Moirai Fashion School teaches sewing, pattern-making, fabric knowledge, styling, and the business of fashion. Intake is limited for personal attention. Interested?'],
  [/traditional|cameroon|heritage|kente|ankara/i, 'Our Cameroonian Traditional collection reimagines heritage textiles in modern silhouettes. Each piece celebrates craftsmanship and culture.'],
  [/momo|payment|pay|mobile money/i, 'We accept Mobile Money (MoMo) for all orders. Payment details are shared after order confirmation.'],
  [/size|measur|fit|fitting/i, 'All our pieces are made to your exact measurements. No standard sizing — you are the standard.'],
  [/corset/i, 'Our corsets are structured, figure-defining pieces designed for bold silhouettes. Available as standalone or as part of a full bespoke look.'],
  [/cocktail|dress|gown/i, 'Our cocktail dresses range from dramatic mermaid gowns to elegant mini dresses. All can be made bespoke or chosen from existing designs.'],
  [/contact|reach|phone|whatsapp|instagram|tiktok/i, 'Reach us on WhatsApp: {whatsapp} | Instagram: {instagram} | TikTok: {tiktok}. We\'re very responsive on WhatsApp!'],
  [/hello|hi|hey|good morning|good afternoon/i, 'Hello! Welcome to The House of Moirai ✦ I\'m here to help you explore our collections, bespoke service, or fashion school. What can I help you with?'],
  [/thank|thanks|appreciate/i, 'You\'re so welcome! 💜 Is there anything else I can help you with? Our team is always ready on WhatsApp if you need more.'],
]

const GREETING_MSGS = [
  'Hello! Welcome to The House of Moirai. ✦',
  'I can help with collections, bespoke orders, the fashion school, pricing, and more.',
  'What would you like to know? 💜',
]

const SUGGESTIONS = [
  'Tell me about Bespoke',
  'What are your prices?',
  'How do I place an order?',
  'Fashion School info',
  'Delivery & Shipping',
]

interface Message { role: 'user' | 'ai'; text: string }

function getReply(input: string): string {
  for (const [pattern, reply] of REPLIES) {
    if (pattern.test(input)) return reply
  }
  return "Great question! For the most detailed answer, I'd love to connect you with our team directly — they'll sort you out in minutes. 💜"
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [replyCount, setReplyCount] = useState(0)
  const [showRedirect, setShowRedirect] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const site = useSiteConfig()
  const waUrl = waLink(site.whatsappNumber, 'Hi! I was chatting with the Moirai assistant and would love to speak with someone directly.')

  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true)
      let i = 0
      const addNext = () => {
        if (i < GREETING_MSGS.length) {
          const msg = GREETING_MSGS[i]
          setMessages(prev => [...prev, { role: 'ai', text: msg }])
          i++
          setTimeout(addNext, 700)
        }
      }
      setTimeout(addNext, 300)
    }
  }, [open, greeted])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (replyCount >= 2 && !showRedirect) {
      setTimeout(() => setShowRedirect(true), 600)
    }
  }, [replyCount, showRedirect])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setTyping(true)
    setTimeout(() => {
      const reply = getReply(trimmed)
        .replace('{whatsapp}', site.whatsappDisplay)
        .replace('{instagram}', site.instagramHandle)
        .replace('{tiktok}', site.tiktokHandle)
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
      setTyping(false)
      setReplyCount(c => c + 1)
    }, 800 + Math.random() * 500)
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Chat with Moirai"
        style={{
          position: 'fixed', bottom: '6.25rem', right: '2rem', zIndex: 996,
          width: 50, height: 50, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2D1B69, #9B5DE5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(155,93,229,0.5)',
          border: '1px solid rgba(199,125,255,0.3)',
          cursor: 'pointer',
          transition: 'transform 0.3s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        }
        {!open && (
          <span style={{
            position: 'absolute', top: -3, right: -3,
            width: 13, height: 13, borderRadius: '50%',
            background: '#9B5DE5',
            border: '2px solid #050407',
            animation: 'aipulse 2s infinite',
          }} />
        )}
      </button>

      {/* Chat panel */}
      <div style={{
        position: 'fixed', bottom: '10.5rem', right: '2rem', zIndex: 993,
        width: 330, maxHeight: 510,
        background: 'linear-gradient(160deg, #0d0b10, #130f18)',
        border: '1px solid rgba(155,93,229,0.25)',
        boxShadow: '0 20px 60px rgba(5,4,7,0.85), 0 0 0 1px rgba(155,93,229,0.08)',
        display: 'flex', flexDirection: 'column',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid rgba(155,93,229,0.15)',
          background: 'linear-gradient(135deg, rgba(45,27,105,0.6), rgba(107,63,160,0.25))',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #2D1B69, #9B5DE5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>✦</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: '#F0EBF8', lineHeight: 1.2 }}>Moirai Assistant</p>
            <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#9B5DE5', textTransform: 'uppercase' }}>The House of Moirai</p>
          </div>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366', flexShrink: 0 }} />
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '88%', padding: '0.65rem 0.9rem',
                background: m.role === 'user' ? 'linear-gradient(135deg, #2D1B69, #6B3FA0)' : 'rgba(255,255,255,0.05)',
                border: m.role === 'ai' ? '1px solid rgba(155,93,229,0.18)' : 'none',
                borderRadius: m.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                fontSize: '12px', lineHeight: 1.75,
                color: m.role === 'user' ? '#F0EBF8' : '#B8A9C9',
              }}>
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', gap: 4, padding: '0.65rem 0.9rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(155,93,229,0.18)', borderRadius: '10px 10px 10px 2px', width: 'fit-content' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#9B5DE5', display: 'block', animation: `aitype 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          )}

          {/* WhatsApp redirect card */}
          {showRedirect && (
            <div style={{ padding: '0.9rem', background: 'linear-gradient(135deg, rgba(45,27,105,0.35), rgba(107,63,160,0.18))', border: '1px solid rgba(155,93,229,0.28)', borderRadius: 4, marginTop: '0.25rem' }}>
              <p style={{ fontSize: '12px', color: '#C77DFF', marginBottom: '0.65rem', lineHeight: 1.7 }}>
                Want to speak with our team directly? 💜
              </p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white', fontSize: '10px', letterSpacing: '0.1em', fontWeight: 500,
                borderRadius: 2, cursor: 'pointer',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Continue on WhatsApp
              </a>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestion chips */}
        {messages.length > 0 && messages.length < 5 && !showRedirect && (
          <div style={{ padding: '0 1rem 0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {SUGGESTIONS.slice(0, 3).map(s => (
              <button key={s} onClick={() => sendMessage(s)} style={{
                padding: '0.3rem 0.65rem', fontSize: '10px', letterSpacing: '0.08em',
                border: '1px solid rgba(155,93,229,0.3)', color: '#9B5DE5',
                background: 'transparent', cursor: 'pointer', borderRadius: 2,
                transition: 'all 0.2s', fontFamily: 'inherit',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155,93,229,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >{s}</button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div style={{ padding: '0.75rem 1rem 1rem', borderTop: '1px solid rgba(155,93,229,0.1)', display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask anything..."
            style={{
              flex: 1, padding: '0.65rem 0.9rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(155,93,229,0.2)',
              color: '#F0EBF8', fontSize: '12px',
              outline: 'none', fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #2D1B69, #9B5DE5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </>
  )
}
