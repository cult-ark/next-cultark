'use client';

import Script from 'next/script';

export default function LinkedInInsightTag() {
  if (process.env.NODE_ENV !== 'production') return null;

  const partnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? '9312409';

  if (!partnerId) return null;

  return (
    <>
      <Script id="linkedin-insight-tag" strategy="afterInteractive">
        {`
          try {
            var partnerId = '${partnerId}';
            window._linkedin_partner_id = partnerId;
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            if (window._linkedin_data_partner_ids.indexOf(partnerId) === -1) {
              window._linkedin_data_partner_ids.push(partnerId);
            }

            if (!window.lintrk) {
              window.lintrk = function(a, b) { window.lintrk.q.push([a, b]); };
              window.lintrk.q = [];
            }

            var existing = document.querySelector('script[src="https://snap.licdn.com/li.lms-analytics/insight.min.js"]');
            if (!existing) {
              var s = document.getElementsByTagName('script')[0];
              if (s && s.parentNode) {
                var b = document.createElement('script');
                b.type = 'text/javascript';
                b.async = true;
                b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
                s.parentNode.insertBefore(b, s);
              }
            }
          } catch (e) {
            if (typeof console !== 'undefined' && console.warn) {
              console.warn('LinkedIn Insight Tag failed to initialize');
            }
          }
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`}
        />
      </noscript>
    </>
  );
}

