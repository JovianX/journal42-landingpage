import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LANDING_PAGE_FAQS } from './landingCopy'

export function LandingSeoContent() {
  const item = LANDING_PAGE_FAQS[0]
  const [open, setOpen] = useState(false)

  if (!item) return null

  return (
    <div className="night-faq" id="faq">
      <details
        className="night-faq-item"
        open={open}
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary>{item.q}</summary>
        <p>
          {item.a} <Link to="/privacy">Privacy</Link>.
        </p>
      </details>
    </div>
  )
}
