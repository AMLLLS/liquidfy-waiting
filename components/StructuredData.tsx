export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Liquidfy",
    "description": "The #1 Ecom Library with 150+ Add-Ons to boost your CVR. Revolutionary e-commerce platform with premium modules for Shopify, WooCommerce, and WordPress.",
    "url": "https://liquidfy.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "category": "SaaS",
      "availability": "https://schema.org/ComingSoon"
    },
    "creator": {
      "@type": "Organization",
      "name": "Liquidfy Team",
      "url": "https://liquidfy.app"
    },
    "featureList": [
      "150+ Premium Modules",
      "1-Click Installation",
      "100% Customizable",
      "Proven Results (+27% CVR)",
      "Lifetime Updates",
      "Multi-platform Support (Shopify, WooCommerce, WordPress)"
    ],
    "targetAudience": {
      "@type": "Audience",
      "audienceType": "E-commerce Business Owners"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Liquidfy",
    "url": "https://liquidfy.app",
    "logo": "https://liquidfy.app/og-image.png",
    "description": "Revolutionary e-commerce platform providing 150+ premium modules to boost conversion rates for online stores.",
    "sameAs": [
      "https://twitter.com/liquidfy",
      "https://linkedin.com/company/liquidfy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@liquidfy.app"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Liquidfy",
    "url": "https://liquidfy.app",
    "description": "The #1 Ecom Library with 150+ Add-Ons to boost your CVR",
    "publisher": {
      "@type": "Organization",
      "name": "Liquidfy"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://liquidfy.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
    </>
  );
} 