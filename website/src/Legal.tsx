import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'

const CONTACT_EMAIL = 'hello@journal42.cloud'

type LegalLayoutProps = {
  title: string
  documentTitle: string
  children: ReactNode
  onCookiePreferences?: () => void
}

function LegalLayout({
  title,
  documentTitle,
  children,
  onCookiePreferences,
}: LegalLayoutProps) {
  useEffect(() => {
    document.title = documentTitle
    return () => {
      document.title = 'Journal42: Get it out of your head.'
    }
  }, [documentTitle])

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) return
    const el = document.getElementById(hash)
    el?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <div className="page">
      <header className="nav">
        <Link className="nav-brand" to="/" aria-label="Journal42 home">
          Journal<span>42</span>
        </Link>
        <div className="nav-actions">
          <Link className="nav-link" to="/features">
            Features
          </Link>
          <Link className="nav-link" to="/pricing">
            Pricing
          </Link>
          <Link className="nav-cta" to="/login">
            Start writing
          </Link>
        </div>
      </header>

      <main id="top" className="legal-main">
        <div className="legal-atmosphere" aria-hidden="true">
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-grain" />
        </div>
        <article className="legal-article">
          <p className="section-label">Legal</p>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-updated">Last updated: July 26, 2026</p>
          <div className="legal-body">{children}</div>
        </article>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}

type LegalPageProps = {
  onCookiePreferences?: () => void
}

export function PrivacyPage({ onCookiePreferences }: LegalPageProps) {
  return (
    <LegalLayout
      title="Privacy Policy"
      documentTitle="Journal42: Privacy Policy"
      onCookiePreferences={onCookiePreferences}
    >
      <p>
        This Privacy Policy explains how Journal42 (&quot;we&quot;,
        &quot;us&quot;) collects, uses, and shares information when you visit{' '}
        <a href="https://journal42.cloud">journal42.cloud</a>, join the
        waitlist, or use our journaling service.
      </p>

      <h2>Who we are</h2>
      <p>
        Journal42 is a private journaling product operated at journal42.cloud.
        For privacy questions, email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Waitlist and account contact.</strong> Email address, and
          optional referral or invite codes, when you join the waitlist or create
          an account.
        </li>
        <li>
          <strong>Journal content.</strong> Entries, mood signals, tags, and
          related data you choose to write or store in the product when it is
          available to you.
        </li>
        <li>
          <strong>Usage and device data.</strong> Pages viewed, button clicks,
          approximate location derived from IP, browser type, and similar
          technical data, when you consent to analytics cookies.
        </li>
        <li>
          <strong>Communications.</strong> Messages you send us (for example
          support or feedback).
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>Provide and improve the waitlist, site, and journaling product.</li>
        <li>Send invite and product emails you requested.</li>
        <li>
          Process journal content with AI features you use (for example help
          finding words, naming themes, or reflecting with your past entries).
        </li>
        <li>
          Measure site performance and usage with analytics, only if you accept
          cookies.
        </li>
        <li>Protect the service, prevent abuse, and meet legal obligations.</li>
      </ul>

      <h2>AI processing</h2>
      <p>
        When you use AI features, relevant parts of your journal content may be
        sent to our subprocessors to generate suggestions or reflections. We do
        not sell your journal entries. We design features so your writing stays
        tied to your account and is not used as public training material by us.
      </p>

      <h2 id="cookies">Cookies and analytics</h2>
      <p>
        Essential cookies (or local storage) may be used for preferences such as
        your analytics choice. Optional analytics tools load only after you
        accept:
      </p>
      <ul>
        <li>Google Analytics</li>
        <li>Google Tag Manager</li>
        <li>Microsoft Clarity (including session insights)</li>
      </ul>
      <p>
        You can Accept or Decline on the cookie banner, or reopen it anytime via
        Cookies in the footer. Declining does not block core site use.
      </p>

      <h2>Sharing</h2>
      <p>We share information with:</p>
      <ul>
        <li>
          Service providers that host forms, email, analytics (when consented),
          infrastructure, or AI processing, under contracts that limit their use
          of your data.
        </li>
        <li>
          Authorities when required by law, or to protect rights, safety, and
          the service.
        </li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Retention</h2>
      <p>
        Waitlist emails are kept until invites are sent or you ask us to delete
        them. Account and journal data are kept while your account is active,
        and for a reasonable period afterward for backups, disputes, or legal
        requirements. Analytics data follows each provider&apos;s retention
        settings.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or export your personal data, to object to or restrict certain
        processing, and to withdraw consent for analytics. Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to make a
        request. You may also lodge a complaint with your local data protection
        authority.
      </p>

      <h2>Children</h2>
      <p>
        Journal42 is not directed to children under 13 (or the higher age
        required in your country, such as 16 in parts of the EU). We do not
        knowingly collect personal information from children under that age.
      </p>

      <h2>International transfers</h2>
      <p>
        We and our providers may process data in the United States and other
        countries. Where required, we use appropriate safeguards for cross-border
        transfers.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The &quot;Last updated&quot; date above will
        change when we do. Continued use after an update means you accept the
        revised policy, where permitted by law.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. More ways to
        reach us are on the <Link to="/contact">Contact</Link> page.
      </p>
    </LegalLayout>
  )
}

export function TermsPage({ onCookiePreferences }: LegalPageProps) {
  return (
    <LegalLayout
      title="Terms of Service"
      documentTitle="Journal42: Terms of Service"
      onCookiePreferences={onCookiePreferences}
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of
        Journal42&apos;s website, waitlist, and journaling product
        (collectively, the &quot;Service&quot;). By using the Service, you agree
        to these Terms.
      </p>

      <h2>The Service</h2>
      <p>
        Journal42 provides private journaling tools, including optional AI
        assistance. Features, pricing, and availability may change, especially
        during invite-only beta.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 13 years old (or the higher age of digital consent
        in your country) and able to form a binding contract. If you use the
        Service on behalf of an organization, you represent that you have
        authority to bind it.
      </p>

      <h2>Accounts and waitlist</h2>
      <p>
        You are responsible for accurate information and for keeping access to
        your account secure. Waitlist signup does not guarantee an invite or
        continued access.
      </p>

      <h2>Your content</h2>
      <p>
        You retain ownership of journal entries and other content you submit
        (&quot;Your Content&quot;). You grant us a limited license to host,
        process, and display Your Content solely to operate and improve the
        Service for you, including AI features you use. You are responsible for
        Your Content and must not submit material that is illegal or that you do
        not have rights to.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Probe, disrupt, or overload the Service.</li>
        <li>Attempt unauthorized access to other users&apos; data.</li>
        <li>Misuse AI features to harm others or violate the law.</li>
        <li>Scrape or resell the Service without our written permission.</li>
      </ul>

      <h2>Subscriptions and pricing</h2>
      <p>
        Paid plans, if offered, are billed as described on the{' '}
        <Link to="/pricing">Pricing</Link> page at the time of purchase. Prices
        may change for future billing periods with notice where required. Unless
        stated otherwise, subscriptions renew until you cancel. Taxes may apply.
        Beta or promotional pricing may be temporary.
      </p>

      <h2>Refunds</h2>
      <p>
        Except where required by law (including applicable EU consumer
        withdrawal rights), fees are non-refundable. Contact{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> if you believe a
        charge was made in error.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link to="/privacy">Privacy Policy</Link> explains how we handle
        personal data. By using the Service, you also acknowledge that policy.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available.&quot;
        Journal42 is not medical, mental-health, or crisis care. AI suggestions
        can be wrong or incomplete. Do not rely on the Service for emergencies.
        To the fullest extent permitted by law, we disclaim warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Journal42 and its operators will
        not be liable for indirect, incidental, special, consequential, or
        punitive damages, or for lost profits, data, or goodwill. Our total
        liability for any claim relating to the Service is limited to the greater
        of amounts you paid us in the 12 months before the claim or USD $50.
        Some jurisdictions do not allow certain limits; in those places, our
        liability is limited to the maximum allowed.
      </p>

      <h2>Termination</h2>
      <p>
        You may stop using the Service at any time. We may suspend or end access
        if you violate these Terms, if required by law, or if we discontinue the
        Service. Provisions that should survive (including ownership,
        disclaimers, and liability limits) will survive termination.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms. We will update the date above and, when
        changes are material, provide additional notice where required. Continued
        use after changes take effect constitutes acceptance where permitted.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or see{' '}
        <Link to="/contact">Contact</Link>.
      </p>
    </LegalLayout>
  )
}

export function ContactPage({ onCookiePreferences }: LegalPageProps) {
  return (
    <LegalLayout
      title="Contact"
      documentTitle="Journal42: Contact"
      onCookiePreferences={onCookiePreferences}
    >
      <p>
        Journal42 is the private journaling product at{' '}
        <a href="https://journal42.cloud">journal42.cloud</a>.
      </p>

      <h2>Email</h2>
      <p>
        General, privacy, and support:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>What to include</h2>
      <ul>
        <li>Privacy or data requests: the email on your waitlist or account.</li>
        <li>Billing questions: the email used for purchase, if any.</li>
        <li>Product feedback: enough detail for us to reproduce the issue.</li>
      </ul>

      <h2>Response time</h2>
      <p>
        We aim to reply within a few business days. Invite-only beta means we
        may be slower during launch periods.
      </p>

      <h2>Legal documents</h2>
      <p>
        <Link to="/privacy">Privacy Policy</Link>
        {' · '}
        <Link to="/terms">Terms of Service</Link>
      </p>
    </LegalLayout>
  )
}

export { CONTACT_EMAIL }
