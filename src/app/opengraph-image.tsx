import { ImageResponse } from 'next/og'

export const alt = 'Velora Automations — practical AI automation for growing businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0b1220 0%, #172033 68%, #0f766e 140%)',
        color: '#ffffff',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: '72px 84px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 34, width: '100%' }}>
        <div style={{ alignItems: 'center', display: 'flex', gap: 22 }}>
          <div
            style={{
              alignItems: 'center',
              background: '#10b981',
              borderRadius: 22,
              color: '#07140f',
              display: 'flex',
              fontSize: 44,
              fontWeight: 800,
              height: 82,
              justifyContent: 'center',
              width: 82,
            }}
          >
            V
          </div>
          <div style={{ display: 'flex', fontSize: 42, fontWeight: 700, letterSpacing: '-1px' }}>
            Velora Automations
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 70, fontWeight: 700, letterSpacing: '-3px', lineHeight: 1.05, maxWidth: 980 }}>
          Practical AI automation for growing businesses
        </div>
        <div style={{ color: '#d1fae5', display: 'flex', fontSize: 29, lineHeight: 1.35, maxWidth: 960 }}>
          Customer response · lead qualification · scheduling · follow-up · CRM · connected workflows
        </div>
      </div>
    </div>,
    size,
  )
}
