import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <div className="logo-word">
            jaggle<span className="ai">.ai</span>
          </div>
          <p>AI + GNH project management. Thimphu, Bhutan.</p>
        </div>
        <div className="foot-nav">
          <Link href="/features#features">
            Features <i className="ti ti-arrow-up-right" />
          </Link>
          <Link href="/our-story">
            About <i className="ti ti-arrow-up-right" />
          </Link>
          <a href="mailto:support@jaggle.ai">support@jaggle.ai</a>
          <Link href="/pricing">
            Pricing <i className="ti ti-arrow-up-right" />
          </Link>
          <Link href="/contact">
            Contact <i className="ti ti-arrow-up-right" />
          </Link>
          <a href="tel:+9779876543210">+91 9876543210</a>
        </div>
      </div>
      <div className="foot-wordmark" aria-hidden="true">
        JaggleAI
      </div>
      <div className="foot-bottom">
        <span>©2025 All Rights Reserved by Jaggle Ai</span>
        <span className="legal">
          <a href="#">
            Terms of Service <i className="ti ti-arrow-up-right" />
          </a>
          <a href="#">
            Privacy Policy <i className="ti ti-arrow-up-right" />
          </a>
          <a href="#">
            AI Transparency <i className="ti ti-arrow-up-right" />
          </a>
        </span>
      </div>
    </footer>
  );
}
